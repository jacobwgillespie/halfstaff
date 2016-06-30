import { PhoneNumberUtil } from 'google-libphonenumber/dist/libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

export const validNumber = number => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parse(number, 'US'));
  } catch (e) {
    return false;
  }
};
