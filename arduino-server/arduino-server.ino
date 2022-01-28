#define NB_SENSORS 5

String msg;

int SENSOR_PINS[NB_SENSORS] = {A0, A1, A2, A3, A4};
String SENSOR_IDS[NB_SENSORS] = {"hum1", "hum2", "hum3", "hum4", "hum5"};
String PUMP_IDS[] = {"pump1", "pump2", "pump3", "pump4"};

String COMMAND_GET_HUMIDITY = "GET_HUMIDITY";
String COMMAND_ACTIVATE_PUMP_1 = "ACTIVATE_PUMP_1";
String COMMAND_ACTIVATE_PUMP_2 = "ACTIVATE_PUMP_2";
String COMMAND_ACTIVATE_PUMP_3 = "ACTIVATE_PUMP_3";
String COMMAND_ACTIVATE_PUMP_4 = "ACTIVATE_PUMP_4";

String RESPONSE_UNKNOWN_COMMAND = "UNKNOWN_COMMAND";
String RESPONSE_HUMIDITY_MEASUREMENT = "HUMIDITY $value";


void setup() {
  Serial.begin(9600);

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

String executeCommand(String command) {
  if (command == COMMAND_GET_HUMIDITY) {
    String response = RESPONSE_HUMIDITY_MEASUREMENT;
    response.replace("$value", read_humidity());
    return response;
  }
  else {
    return RESPONSE_UNKNOWN_COMMAND;
  }
}
