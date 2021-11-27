import os
import requests


class CallClient:
    def __init__(self):
        self.serial_code = os.environ.get('SERIAL_CODE')
        self.username = os.environ.get('EMAIL')
        self.password = os.environ.get('PASSWORD')
        self.endpoint = os.environ.get('ENDPOINT')

    def get_token(self):
        query = """
        mutation Login($username:String!, $password:String!) {
            login(username: $username, password: $password) {
                accessToken
            }
        }
        """
        headers = {
            "Content-Type": "application/json"
        }
        variables = {"username": self.username, "password": self.password}
        result = requests.post(self.endpoint, json={"query": query, "variables": variables}, headers=headers)
        if result.status_code == 200:
            return result.json()["data"]["login"]["accessToken"]

    def call(self, token, is_canceled=False):
        query = """
        mutation CreateCall($serialCode:String!, $isCanceled:Boolean!) {
            createCall(call:{serialCode: $serialCode, isCanceled: $isCanceled}) {
                id
            }
        }
        """
        headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer {}".format(token)

        }
        variables = {"serialCode": self.serial_code, "isCanceled": is_canceled}
        result = requests.post(self.endpoint, json={"query": query, "variables": variables}, headers=headers)
        if result.status_code == 200:
            return result.json()["data"]["createCall"]["id"]


call_client = CallClient()
token = call_client.get_token()
call_client.call(token)

