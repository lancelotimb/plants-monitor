#!/usr/bin/env python
# -*- coding: utf-8 -*-
# lsusb to check device name
#dmesg | grep "tty" to find port name

import serial, time
import sqlite3

# Arduino Response Messages
RESPONSE_UNKNOWN_COMMAND = "UNKNOWN_COMMAND";
RESPONSE_HUMIDITY_MEASUREMENT = "HUMIDITY $value";

# Arduino Command Messages
COMMAND_GET_HUMIDITY = "GET_HUMIDITY";


def create_connection():
    database = './database/database.db'
    conn = None
    try:
        conn = sqlite3.connect(database)
    except Error as e:
        print(e)
        
    return conn


def record_measurement(connection, data):
    measurement = (int(time.time()), data)
    cursor = connection.cursor()
    cursor.execute("INSERT INTO humidity_measurements (date, value) VALUES (?, ?)", measurement)
    connection.commit()
    return cursor.lastrowid


def interpret_answer(connection, message):
    print(message)
    split_message = message.split()
    
    if split_message[0] == RESPONSE_HUMIDITY_MEASUREMENT.split()[0] :
        measurement_data = split_message[1]
        record_measurement(connection, measurement_data)


def debug():
    # Initialize database
    connection = create_connection()
    
    # Launch connection with Arduino
    with serial.Serial("/dev/ttyACM0", 9600, timeout=1) as arduino:
        
        # Wait for serial to open
        time.sleep(0.1)
        
        
        if arduino.isOpen():
            print("Connected! (Port {})".format(arduino.port))
            try:
                while True:
                    cmd = input("Enter command : ")
                    print(cmd.encode())
                    arduino.write(cmd.encode())
                    
                    # time.sleep(0.1) #wait for arduino to answer
                    while arduino.inWaiting() == 0:
                        pass
                    
                    if arduino.inWaiting() > 0:
                        answer = arduino.readline().decode("utf-8")   
                        interpret_answer(connection, answer)
                        
                        # Remove data after reading
                        arduino.flushInput() 
            except KeyboardInterrupt:
                print("KeyboardInterrupt has been caught.")


def main():
    # Initialize database
    connection = create_connection()
    
    # Launch connection with Arduino
    with serial.Serial("/dev/ttyACM0", 9600, timeout=1) as arduino:
        arduino.reset_input_buffer()
        
        # Wait for serial to open
        time.sleep(0.1)
        
        
        if arduino.isOpen():
            try:
                time.sleep(3) # Needed for connection to initialize?
                while True:
                    arduino.write(COMMAND_GET_HUMIDITY.encode())
                    
                    while arduino.inWaiting() == 0:
                        pass
                    
                    if arduino.inWaiting() > 0:
                        answer = arduino.readline().decode("utf-8").rstrip()  
                        interpret_answer(connection, answer)
                        
                        # Remove data after reading
                        arduino.flushInput()
                    
                    time.sleep(10) # 10s between each data point
            except KeyboardInterrupt:
                print("KeyboardInterrupt has been caught.")


if __name__ == '__main__':
    main()
