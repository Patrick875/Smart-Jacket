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
 * Simplest possible example of using RF24Network,
 *
 * RECEIVER NODE
 * Listens for messages from the transmitter and prints them out.
 */

#include <SPI.h>
#include <RF24.h>
#include <RF24Network.h>


RF24 radio(5, 10);  // nRF24L01(+) radio attached using Getting Started board

RF24Network network(radio);      // Network uses that radio
const uint16_t this_node = 00;   // Address of our node in Octal format (04, 031, etc)
const uint16_t other_node = 01;  // Address of the other node in Octal format

int panic;
struct payload_t {  // Structure of our payload
  int pulse;
  int temperature;
  int humidity;
  int gas;
  int panic;
  unsigned long counter;
};

void setup(void) {
  Serial.begin(9600);
  while (!Serial) {
    // some boards need this because of native USB capability
  }
  Serial.println(F("RF24Network/examples/helloworld_rx/"));

  if (!radio.begin()) {
    Serial.println(F("Radio hardware not responding!"));
    while (1) {
      // hold in infinite loop
    }
  }
  radio.setChannel(90);
  network.begin(/*node address*/ this_node);
}

void loop(void) {

  network.update();  // Check the network regularly

  while (network.available()) {  // Is there anything ready for us?

    RF24NetworkHeader header;  // If so, grab it and print it out
    payload_t payload;
    network.read(header, &payload, sizeof(payload));
     
    Serial.println("---------------------------Received data--------------------");
    Serial.println("");
    
    Serial.println(F(", origin timestamp="));

    Serial.print("ECG= ");
    Serial.println(payload.pulse);
    
    Serial.print("Temperature= ");
    Serial.println(payload.temperature);

    Serial.print("Humidity= ");
    Serial.println(payload.humidity);

    Serial.print("CO level= ");
    Serial.println(payload.gas);

    Serial.print("Panic = ");
    Serial.println(payload.panic);

    //sending data to the cloud

    Serial.print("https://iotserver.vercel.app/api/sensor?humidity="); 
    Serial.print(payload.humidity);
    Serial.print("&ecg=");
    Serial.print(payload.pulse); 
    Serial.print("&co_level=");
    Serial.print(payload.gas);
    Serial.print("&temperature=");
    Serial.println(payload.temperature);




    
  }
}
