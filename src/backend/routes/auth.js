import { validNumber } from '../util';
import firebase from '../firebase';
import twilio from '../twilio';

const codeLength = 6;
const buildCode = () => (
  Math.floor(
    Math.random() * (
      Math.pow(10, (codeLength - 1)) * 9)
    ) + Math.pow(10, (codeLength - 1)
  )
);

const db = firebase.database();
const pendingLoginsRef = db.ref('pendingLogins');

export const start = (req, res) => {
  const { number } = req.body;

  if (!number || !validNumber(number)) {
    res.status(406).json({ error: 'missing or invalid number', code: 'invalid_number' });
  }

  const cleanedNumber = number.replace(/\D/g, '');

  const ref = pendingLoginsRef.child(cleanedNumber);

  console.log(cleanedNumber, ref.toString());

  ref.once('value', snapshot => {
    console.log('snapshot', snapshot);
    res.json({
      success: true,
      code: buildCode(),
      count: snapshot.numChildren(),
    });
  });
};
