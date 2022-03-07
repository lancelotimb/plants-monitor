#include "DHT.h"

#define NB_SENSORS 4
#define NB_PUMPS 4
#define DHTTYPE DHT11

String msg;

int SENSOR_PINS[NB_SENSORS] = {A0, A1, A2, A3};
int PUMP_PINS[NB_PUMPS] = {3, 4, 5, 6};

String COMMAND_GET_HUMIDITY = "GET_HUMIDITY";
String COMMAND_GET_DHT = "GET_DHT";
String COMMAND_ACTIVATE_PUMP_A = "ACTIVATE_PUMP_A";
String COMMAND_ACTIVATE_PUMP_B = "ACTIVATE_PUMP_B";
String COMMAND_ACTIVATE_PUMP_C = "ACTIVATE_PUMP_C";
String COMMAND_ACTIVATE_PUMP_D = "ACTIVATE_PUMP_D";

String RESPONSE_UNKNOWN_COMMAND = "UNKNOWN_COMMAND";
String RESPONSE_HUMIDITY_MEASUREMENT = "HUMIDITY $value";
String RESPONSE_DHT_MEASUREMENT = "DHT $value";

// Declare DHT sensor
int DHT_SENSOR_PIN = 2;
DHT dht(DHT_SENSOR_PIN, DHTTYPE);

void setup() {
  Serial.begin(9600);

  // Initialize DHT sensor
  dht.begin();

  // Initialize Humidity Sensors
  for (int i = 0; i < NB_SENSORS; i++) {
    pinMode(SENSOR_PINS[i], INPUT);
  }

  // Initialize Pumps
  for (int i = 0; i < NB_PUMPS; i++) {
    pinMode(PUMP_PINS[i], OUTPUT);
    digitalWrite(PUMP_PINS[i], HIGH);
  }
}

void loop() {
  readSerialPort();
  if (msg != "") {
    String response = executeCommand(msg);
    sendData(response);
  }
  delay(500);
}

void readSerialPort() {
  msg = "";
  if (Serial.available()) {
    delay(10);
    while (Serial.available() > 0) {
      msg += (char)Serial.read();
    }
    Serial.flush();
  }
}

void sendData(String message) {
  Serial.print(message);
}

String read_humidity() {
  String data = "[";
  for (int i = 0; i < NB_SENSORS; i++) {
    String value = String(analogRead(SENSOR_PINS[i]));
    data += value;

    if (i < NB_SENSORS - 1) {
      data += ",";
    }
  }
  data += "]";

  return data;
}

String read_dht() {
  String data = "{\"temperature\":" + String(dht.readTemperature()) + ",\"humidity\":" + String(dht.readHumidity()) + "}";
  return data;
}

void activate_pump(int nb, int time) {
  digitalWrite(PUMP_PINS[nb], LOW);
  delay(time);
  digitalWrite(PUMP_PINS[nb], HIGH);
}

String executeCommand(String command) {
  if (command == COMMAND_GET_HUMIDITY) {
    String response = RESPONSE_HUMIDITY_MEASUREMENT;
    response.replace("$value", read_humidity());
    return response;
  }

  if (command == COMMAND_GET_DHT) {
    String response = RESPONSE_DHT_MEASUREMENT;
    response.replace("$value", read_dht());
    return response;
  }

  if (command.indexOf(COMMAND_ACTIVATE_PUMP_A) == 0) {
    String time = command.substring(COMMAND_ACTIVATE_PUMP_A.length() + 1);
    activate_pump(0, time.toInt());
    return "PUMP_A_OK";
  }

  if (command.indexOf(COMMAND_ACTIVATE_PUMP_B) == 0) {
     String time = command.substring(COMMAND_ACTIVATE_PUMP_B.length() + 1);
     activate_pump(1, time.toInt());
     return "PUMP_B_OK";
  }

  if (command.indexOf(COMMAND_ACTIVATE_PUMP_C) == 0) {
    String time = command.substring(COMMAND_ACTIVATE_PUMP_C.length() + 1);
    activate_pump(2, time.toInt());
    return "PUMP_C_OK";
  }

  if (command.indexOf(COMMAND_ACTIVATE_PUMP_D) == 0) {
    String time = command.substring(COMMAND_ACTIVATE_PUMP_D.length() + 1);
    activate_pump(3, time.toInt());
    return "PUMP_D_OK";
  }

   return RESPONSE_UNKNOWN_COMMAND;
}
