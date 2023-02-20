/**
 * Copyright (C) 2012 James Coliz, Jr. <maniacbug@ymail.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * version 2 as published by the Free Software Foundation.
 *
 * Update 2014 - TMRh20
 */

/**
 * Simplest possible example of using RF24Network
 *
 * TRANSMITTER NODE
 * Every 2 seconds, send a payload to the receiver node.
 */

#include <SPI.h>
#include <RF24.h>
#include <RF24Network.h>
#include "DHT.h"
#define DHTPIN 4  
#define CO A2
#define buzzer 7
#define DHTTYPE DHT11
#define button 8

DHT dht(DHTPIN, DHTTYPE);

RF24 radio(5, 10);  // nRF24L01(+) radio attached using Getting Started board

RF24Network network(radio);  // Network uses that radio

const uint16_t this_node = 01;   // Address of our node in Octal format
const uint16_t other_node = 00;  // Address of the other node in Octal format

const unsigned long interval = 2000;  // How often (in ms) to send 'hello world' to the other unit

unsigned long last_sent;     // When did we last send?
unsigned long packets_sent;  // How many have we sent already

int panic=0;

struct payload_t {  // Structure of our payload
  int pulse;
  int temperature;
  int humidity;
  int gas;
  int panic;
  unsigned long counter;
};

void setup(void) {
  Serial.begin(115200);
  dht.begin();
  pinMode(CO,INPUT);
  pinMode(buzzer,OUTPUT);
  pinMode(2, INPUT); // Setup for leads off detection LO +
  pinMode(3, INPUT); // Setup for leads off detection LO -  
  pinMode(button,INPUT_PULLUP);
  
  while (!Serial) {
    // some boards need this because of native USB capability
  }
  Serial.println(F("RF24Network/examples/helloworld_tx/"));

  if (!radio.begin()) {
    Serial.println(F("Radio hardware not responding!"));
    while (1) {
      // hold in infinite loop
    }
  }
  //radio.setPALevel(RF24_PA_MIN);
  radio.setChannel(90);
  network.begin(/*node address*/ this_node);
}
                                                            
void loop() {
  
  int pulse;  
  int h = dht.readHumidity();
    
  // Read temperature as Celsius (the default)
  int t = dht.readTemperature();

  int   Gas=analogRead(CO); 
// Serial.print("Gas=");
// Serial.println(Gas);
delay(2000);
  //put your main code here, to run repeatedly:


//---------------------------------panic button

int PanicSwitch=digitalRead(button);
if(PanicSwitch==LOW)
{
Serial.println("Miner'alert"); 
panic=1;
RF24NetworkHeader header(/*to node*/ other_node);
bool ok = network.write(header, &panic, sizeof(panic));
Serial.println(ok ? F("miner alert") : F("failed panic tx."));
delay(200);
}
  
if((digitalRead(2) == 1)||(digitalRead(3) == 1)){
//Serial.println();
}
else{
// send the value of analog input 0:
 pulse=analogRead(A5);
//  Serial.print("pulse=");
//  Serial.println(pulse);


 }
 if(h>65||t>65)
{
digitalWrite(buzzer,HIGH);
delay(1000);
digitalWrite(buzzer,LOW);  
} 
if(CO>35)
{
  digitalWrite(buzzer,HIGH);
delay(3000);
digitalWrite(buzzer,LOW); 
}
if(pulse>700)
{
digitalWrite(buzzer,HIGH);
delay(5000);
digitalWrite(buzzer,LOW);   
}

Serial.print(h);
Serial.print("&ecg=");
Serial.print(pulse); 
Serial.print("&co_level=");
Serial.print(Gas);
Serial.print("&temperature=");
Serial.println(t);





//----------------------------------------

  network.update();  // Check the network regularly

  unsigned long now = millis();

  // If it's time to send a message, send it!
  if (now - last_sent >= interval) {
    last_sent = now;

     //myPayload= "humidity= " + String (h) + "gas = "+ String (Gas) + "temp= " + String(t);
    
    Serial.print(F("Sending... "));
    payload_t payload = { pulse,t,h,Gas,panic,packets_sent++ };
    //payload_t payload = { 22,packets_sent++ };
    RF24NetworkHeader header(/*to node*/ other_node);
    bool ok = network.write(header, &payload, sizeof(payload));
    Serial.println(ok ? F("ok.") : F("failed."));
   
  }
}
