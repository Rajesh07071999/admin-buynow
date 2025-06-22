
import CryptoJS from 'crypto-js';
const key = CryptoJS.enc.Hex.parse(process.env.REACT_APP_API_ENC_KEY);
const iv = CryptoJS.enc.Hex.parse(process.env.REACT_APP_API_ENC_IV);
export function loginRedirectCall() {
  let path = window.location.protocol + "//" + window.location.host + "/admin/"
  window.location.href = path;
}

export function logOutRedirectCall() {
  const keysToRemove = [
    "AcountryCode",
    "Aemail",
    "Afname",
    "Alname",
    "Amobile_number",
    "AprofileImage",
    "Atoken",
    "Aid",
    "Arole"
  ];

  keysToRemove.forEach(removeData);
  loginRedirectCall();
}
export function removeData(key) {
  const encryptedKey = bodyEncryption(key);
  localStorage.removeItem(encryptedKey);
}
export function setData(key, value) {
  const encryptedKey = bodyEncryption(key);
  const encryptedValue = bodyEncryption(value);
  localStorage.setItem(encryptedKey, encryptedValue);
}
export function bodyEncryption(request, isStringify) {
  const req = (isStringify) ? JSON.stringify(request) : request;
  const encrypted = CryptoJS.AES.encrypt(req, key, { iv: iv });
  return encrypted.toString();
}
export function bodyDecryption(request) {
  const decrypted = CryptoJS.AES.decrypt(request.toString(), key, { iv: iv });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
