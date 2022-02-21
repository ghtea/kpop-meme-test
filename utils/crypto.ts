import CryptoJS from "crypto-js"

export const encrypt = (value: string) => {
  const keyString = process.env.NEXT_PUBLIC_AES_SECRET_KEY || ""
  const ivString = process.env.NEXT_PUBLIC_AES_IV || ""

  const key=CryptoJS.enc.Base64.parse(keyString);
  const iv=CryptoJS.enc.Base64.parse(ivString);

  const encryptedValue = CryptoJS.AES.encrypt(value, key || "", {
    iv,
    mode: CryptoJS.mode.CFB,
    padding: CryptoJS.pad.Pkcs7,
    enc: CryptoJS.enc.Base64
  });

  return encryptedValue.toString()
}

export const decrypt = (value: string) => {
  const keyString = process.env.NEXT_PUBLIC_AES_SECRET_KEY || ""
  const ivString = process.env.NEXT_PUBLIC_AES_IV || ""

  const key=CryptoJS.enc.Base64.parse(keyString);
  const iv=CryptoJS.enc.Base64.parse(ivString);

  const decryptedValue = CryptoJS.AES.decrypt(value, key || "", {
    iv,
    mode: CryptoJS.mode.CFB,
    padding: CryptoJS.pad.Pkcs7,
    enc: CryptoJS.enc.Base64
  });

  return decryptedValue.toString(CryptoJS.enc.Utf8)
}