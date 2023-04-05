import crypto from 'crypto';
import axios from 'axios';

const secretKey = process.env.DINGTALK_SECRET;
// const secretKey = 'SEC7f84246f184cbbfc31b440af387f5a3fae5ea740b4ac012ac3e80ff4b15de718';

const baseUrl = process.env.DINGTALK_WEBHOOK_URL;
// const baseUrl = 'https://oapi.dingtalk.com/robot/send?access_token=590840665ac558a2c61644ac6c595f1d54e4e484017619f6a8e28bcf0f20605c';

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
