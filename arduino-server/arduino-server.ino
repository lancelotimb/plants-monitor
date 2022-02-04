#include "DHT.h"

#define NB_SENSORS 5
#define DHTTYPE DHT11

String msg;

int SENSOR_PINS[NB_SENSORS] = {A0, A1, A2, A3, A4};

String COMMAND_GET_HUMIDITY = "GET_HUMIDITY";
String COMMAND_GET_DHT = "GET_DHT";
String COMMAND_ACTIVATE_PUMP_1 = "ACTIVATE_PUMP_1";
String COMMAND_ACTIVATE_PUMP_2 = "ACTIVATE_PUMP_2";
String COMMAND_ACTIVATE_PUMP_3 = "ACTIVATE_PUMP_3";
String COMMAND_ACTIVATE_PUMP_4 = "ACTIVATE_PUMP_4";

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

  return RESPONSE_UNKNOWN_COMMAND;
}
