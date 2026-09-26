// AI Driver car: the web page's AI sends ONE letter over USB serial, the Arduino drives.
// F = forward, L = left, R = right, S = stop. Pins and drive() are the same as lesson 16.
const int L1 = 5, L2 = 6, R1 = 9, R2 = 10;   // L298N IN1, IN2, IN3, IN4 (ENA/ENB jumpers stay on)
const unsigned long WATCHDOG_MS = 1000;      // no good letter for 1 second = stop
unsigned long lastCommand = 0;               // time (ms) of the last good letter

void drive(int left, int right) {            // speeds from -255 to 255
  analogWrite(L1, left  > 0 ? left  : 0);
  analogWrite(L2, left  < 0 ? -left : 0);
  analogWrite(R1, right > 0 ? right : 0);
  analogWrite(R2, right < 0 ? -right : 0);
}

void setup() {
  pinMode(L1, OUTPUT); pinMode(L2, OUTPUT);
  pinMode(R1, OUTPUT); pinMode(R2, OUTPUT);
  drive(0, 0);                               // always start with the wheels stopped
  Serial.begin(9600);                        // must match baudRate: 9600 in the web page
}

void loop() {
  while (Serial.available() > 0) {           // read every letter that has arrived
    char c = Serial.read();
    if      (c == 'F') drive(150, 150);      // forward
    else if (c == 'L') drive(0, 160);        // right wheel only = turn left
    else if (c == 'R') drive(160, 0);        // left wheel only = turn right
    else if (c == 'S') drive(0, 0);          // stop
    else continue;                           // ignore any other byte (it does not feed the watchdog)
    lastCommand = millis();                  // a good letter feeds the watchdog
  }
  if (millis() - lastCommand > WATCHDOG_MS) drive(0, 0);  // lost contact with the AI: stop
}
