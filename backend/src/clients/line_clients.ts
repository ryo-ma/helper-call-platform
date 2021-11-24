import got from 'got';

export class LineClient {
  LINE_BORADCAST_URL = "https://api.line.me/v2/bot/message/broadcast";
  constructor(private token: string) {
  }

  async push(messages: { messages: [{ type: string; text: string }] }) {
    return await got.post(this.LINE_BORADCAST_URL, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`,
      },
      json: messages,
    });
  }
}
