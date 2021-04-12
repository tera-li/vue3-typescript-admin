import { AES, mode, pad, enc } from 'crypto-ts'
import Keys from '@/constant/key'

export default class VAES {
  static encrypt(text: string | null): string | null {
    return AES.encrypt(text ?? '', Keys.aseKey, {
      mode: mode.ECB,
      padding: pad.PKCS7
    }).toString()
  }

  static decrypt(text: string | null): string | null {
    return AES.decrypt(text ?? '', Keys.aseKey, {
      mode: mode.ECB,
      padding: pad.PKCS7
    }).toString(enc.Utf8)
  }
}
