#!/usr/bin/env python
# -*- coding: utf-8 -*-
# lsusb to check device name
#dmesg | grep "tty" to find port name

import serial, time
import sqlite3
import json

# Arduino Response Messages
RESPONSE_UNKNOWN_COMMAND = "UNKNOWN_COMMAND"
RESPONSE_HUMIDITY_MEASUREMENT = "HUMIDITY $value"
RESPONSE_DHT_MEASUREMENT = "DHT $value"

# Arduino Command Messages
COMMAND_GET_HUMIDITY = "GET_HUMIDITY"
COMMAND_GET_DHT = "GET_DHT"


def create_connection():
    database = '../database/database.db'
    conn = None
    try:
        conn = sqlite3.connect(database)
    except Error as e:
        print(e)

    return conn

def read_commands_queue(connection):
    cursor = connection.cursor()
    cursor.execute("SELECT * from commands_queue WHERE read = 0 LIMIT 1")
    records = cursor.fetchall()
    command = records[0] if len(records) > 0 else None
    cursor.close()
    
    if (command):
        cursor = connection.cursor()
        cursor.execute('UPDATE commands_queue SET read = 1 WHERE id = ?', (command[0],))
        connection.commit()
        cursor.close()
        return (command[1], command[0])
    
    return (None, None)

def set_command_executed(connection, id):
    print("executed")
    cursor = connection.cursor()
    cursor.execute('UPDATE commands_queue SET executed = 1 WHERE id = ?', (id,))
    connection.commit()
    cursor.close()


def record_humidity_measurement(connection, data):
    measurement = (int(time.time()), data)
    cursor = connection.cursor()
    cursor.execute("INSERT INTO humidity_measurements (date, value) VALUES (?, ?)", measurement)
    connection.commit()
    return cursor.lastrowid


def record_dht_measurement(connection, data):
    parsed = json.loads(data)
    measurement = (int(time.time()), parsed['temperature'], parsed['humidity'])
    cursor = connection.cursor()
    cursor.execute("INSERT INTO dht_measurements (date, temperature, humidity) VALUES (?, ?, ?)", measurement)
    connection.commit()
    return cursor.lastrowid


def interpret_answer(connection, message):
    split_message = message.split()

    if split_message[0] == RESPONSE_HUMIDITY_MEASUREMENT.split()[0] :
        measurement_data = split_message[1]
        record_humidity_measurement(connection, measurement_data)

    if split_message[0] == RESPONSE_DHT_MEASUREMENT.split()[0] :
        measurement_data = split_message[1]
        record_dht_measurement(connection, measurement_data)


def debug():
    # Initialize database
    connection = create_connection()

    # Launch connection with Arduino
    # Macbook: /dev/cu.usbmodem143101
    # Arduino: /dev/ttyACM0
    with serial.Serial("/dev/ttyACM0", 9600, timeout=1) as arduino:
        arduino.reset_input_buffer()

        # Wait for serial to open
        time.sleep(0.1)


        if arduino.isOpen():
            print("Connected! (Port {})".format(arduino.port))
            try:
                while True:
                    cmd = input("Enter command : ")
                    arduino.write(cmd.encode())

                    # time.sleep(0.1) #wait for arduino to answer
                    while arduino.inWaiting() == 0:
                        pass

                    if arduino.inWaiting() > 0:
                        answer = arduino.readline().decode("utf-8").rstrip()
                        print(answer)
                        interpret_answer(connection, answer)

                        # Remove data after reading
                        arduino.flushInput()
            except KeyboardInterrupt:
                print("KeyboardInterrupt has been caught.")


def main():
    # Initialize database
    connection = create_connection()

    # These commands will be sent one after the other
    repeated_commands = [COMMAND_GET_HUMIDITY, COMMAND_GET_DHT]
    nb_repeated_commands = len(repeated_commands)
    iteration = 0

    # Launch connection with Arduino
    with serial.Serial("/dev/ttyACM0", 9600, timeout=1) as arduino:
        arduino.reset_input_buffer()

        # Wait for serial to open
        time.sleep(0.1)


        if arduino.isOpen():
            try:
                time.sleep(3) # Needed for connection to initialize?
                while True:
                    # Fetch the last command from the database
                    (queue_command, queue_command_id) = read_commands_queue(connection)

                    # The next command is read from the commands queue in priority, then from the reapeated commands list
                    current_command = None
                    if (not queue_command):
                        current_command = repeated_commands[iteration % nb_repeated_commands]
                        iteration += 1
                    else:
                        current_command = queue_command
                    
                    print(current_command)

                    arduino.write(current_command.encode())

                    while arduino.inWaiting() == 0:
                        pass

                    if arduino.inWaiting() > 0:
                        answer = arduino.readline().decode("utf-8").rstrip()
                        interpret_answer(connection, answer)
                        
                        # Set command as "executed"
                        if (queue_command_id):
                            set_command_executed(connection, queue_command_id)

                        # Remove data after reading
                        arduino.flushInput()

                    time.sleep(5) # 10s between each data point
            except KeyboardInterrupt:
                print("KeyboardInterrupt has been caught.")


if __name__ == '__main__':
    main()
