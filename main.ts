let tijd5 = 0
let tijd4 = 0
let tijd3 = 0
let tijd2 = 0
let tijd1 = 0
let tijd0 = 0
serial.redirect(
SerialPin.USB_TX,
SerialPin.USB_RX,
BaudRate.BaudRate115200
)
let fase = 0
let laag = 256
let hoog = 512
serial.writeLine("READY")
while (true) {
    if (fase == 0 && pins.analogReadPin(AnalogPin.P0) > hoog) {
        led.plot(0, 0)
        tijd0 = input.runningTimeMicros()
        fase = 1
    }
    if (fase == 1 && pins.analogReadPin(AnalogPin.P0) < laag) {
        led.plot(1, 0)
        tijd1 = input.runningTimeMicros()
        fase = 2
    }
    if (fase == 2 && pins.analogReadPin(AnalogPin.P1) > hoog) {
        led.plot(2, 0)
        tijd2 = input.runningTimeMicros()
        fase = 3
    }
    if (fase == 3 && pins.analogReadPin(AnalogPin.P1) < laag) {
        led.plot(3, 0)
        tijd3 = input.runningTimeMicros()
        fase = 4
    }
    if (fase == 4 && pins.analogReadPin(AnalogPin.P2) > hoog) {
        led.plot(4, 0)
        tijd4 = input.runningTimeMicros()
        fase = 5
    }
    if (fase == 5 && pins.analogReadPin(AnalogPin.P2) < laag) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        tijd5 = input.runningTimeMicros()
        fase = 0
        serial.writeNumber(tijd0)
        serial.writeLine("")
        serial.writeNumber(tijd1)
        serial.writeLine("")
        serial.writeNumber(tijd2)
        serial.writeLine("")
        serial.writeNumber(tijd3)
        serial.writeLine("")
        serial.writeNumber(tijd4)
        serial.writeLine("")
        serial.writeNumber(tijd5)
        serial.writeLine("")
        serial.writeLine("AGAIN")
    }
}
