import crypto from 'crypto';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.DINGTALK_SECRET;
const baseUrl = process.env.DINGTALK_WEBHOOK_URL;

console.log('secretKey', secretKey);
console.log('baseUrl', baseUrl);

export async function sendDingtalkMessage(message) {
  const time = Date.now();
  const stringToSign = `${time}\n${secretKey}`;
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(stringToSign)
    .digest()
    .toString('base64');
  const url = `${baseUrl}&timestamp=${time}&sign=${signature}`;

  const body = message;

  const res = await axios({
    url,
    method: 'POST',
    data: {
      msgtype: 'text',
      text: { content: body },
    },
  });
}
