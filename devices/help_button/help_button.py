# -*- coding: utf-8 -*-

import RPi.GPIO as GPIO
from time import sleep
from call_client import CallClient

RED_LED_GPIO = 4
RED_TACT_GPIO = 17

GPIO.setmode(GPIO.BCM)
GPIO.setup(RED_LED_GPIO, GPIO.OUT)
GPIO.setup(RED_TACT_GPIO, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)


is_called = False
call_client = CallClient()


try:
    print('--- start program ---')
    while True:
        if GPIO.input(RED_TACT_GPIO) == GPIO.HIGH:
            if not is_called:
                is_called = True
                print("red switch on")
                GPIO.output(RED_LED_GPIO, GPIO.HIGH)
                token = call_client.get_token()
                call_client.call(token)
            else:
                is_called = False
                print("red switch off")
                GPIO.output(RED_LED_GPIO, GPIO.LOW)
                token = call_client.get_token()
                call_client.call(token, True)
            sleep(2)
        sleep(0.01)
except KeyboardInterrupt:
    pass
finally:
    GPIO.output(RED_LED_GPIO, GPIO.LOW)
    GPIO.cleanup()
    print('--- stop program ---')
