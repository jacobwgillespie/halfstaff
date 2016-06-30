import twilio from 'twilio';

const accountSID = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const number = process.env.TWILIO_NUMBER;

const client = twilio(accountSID, authToken);

export const text = (to, body) => new Promise((resolve, reject) => {
  client.sendMessage({
    to,
    from: number,
    body,
  }, (err, res) => {
    if (err) reject(err);
    else resolve(res);
  });
});

export default client;
