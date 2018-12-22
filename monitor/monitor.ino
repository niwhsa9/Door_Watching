
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>


const char* ssid = "NETGEAR47";
const char* password = "pinkvalley673";
  
const char* host = "10.0.0.8";
const uint16_t port = 4500;
ESP8266WiFiMulti WiFiMulti;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);     // Initialize the LED_BUILTIN pin as an output
  pinMode(D2, INPUT_PULLUP);
  
  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP(ssid, password);
  Serial.println("Connecting to network... ");
  while (WiFiMulti.run() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  delay(500);
}

void loop() {
  WiFiClient client;
  if (!client.connect(host, port)) {
    Serial.println("connection failed");
    return;
  }

  client.println(digitalRead(D2));

  if(digitalRead(D2) == 1) digitalWrite(LED_BUILTIN, HIGH);
  else digitalWrite(LED_BUILTIN, LOW);
   
  Serial.print(digitalRead(D2));
  delay(400);
}
