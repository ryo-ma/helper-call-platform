import sys
import time
import RPi.GPIO as GPIO

SPI_CLK = 11
SPI_MOSI = 10
SPI_MISO = 9
SPI_SS = 8
CHANNEL = 0

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

GPIO.setup(SPI_MOSI, GPIO.OUT)
GPIO.setup(SPI_MISO, GPIO.IN)
GPIO.setup(SPI_CLK,  GPIO.OUT)
GPIO.setup(SPI_SS,   GPIO.OUT)


class MuscleHelper:
    # Send the channel to AD converter.
    def send_channel(self, channel):
        GPIO.output(SPI_SS,   False)
        GPIO.output(SPI_CLK,  False)
        GPIO.output(SPI_MOSI, False)
        GPIO.output(SPI_CLK,  True)
        GPIO.output(SPI_CLK,  False)
        cmd = (channel | 0x18) << 3
        for _ in range(5):
            if (cmd & 0x80):
                GPIO.output(SPI_MOSI, True)
            else:
                GPIO.output(SPI_MOSI, False)
            cmd <<= 1
            GPIO.output(SPI_CLK, True)
            GPIO.output(SPI_CLK, False)
        GPIO.output(SPI_CLK, True)
        GPIO.output(SPI_CLK, False)
        GPIO.output(SPI_CLK, True)
        GPIO.output(SPI_CLK, False)

    def receive_result(self):
        value = 0
        # Receive a result of 12bit from AD converter.
        for _ in range(12):
            value <<= 1
            GPIO.output(SPI_CLK, True)
            if (GPIO.input(SPI_MISO)):
                value |= 0x1
            GPIO.output(SPI_CLK, False)

        GPIO.output(SPI_SS, True)
        return value

    def run(self):
        self.send_channel(CHANNEL)
        result = self.receive_result()
        sys.stdout.write(str(result))
        sys.stdout.write("\n")


if __name__ == '__main__':
    while(True):
        time.sleep(0.1)
        MuscleHelper().run()
