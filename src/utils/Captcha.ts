import fetch from 'node-fetch';

export interface HCaptchaResponse {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  credit: boolean;
  'error-codes': string[];
  score: number; // enterprise only
  score_reason: string[]; // enterprise only
}

export interface ReCaptchaResponse {
  success: boolean;
  score: number; // between 0 - 1
  action: string;
  challenge_ts: string;
  hostname: string;
  'error-codes'?: string[];
}

const verifyEndpoints: Record<string, string> = {
  hcaptcha: 'https://hcaptcha.com/siteverify',
  recaptcha: 'https://www.google.com/recaptcha/api/siteverify',
};

export async function verifyCaptcha(response: string, ip?: string) {
  // TODO: config
  const { service, secret, sitekey } = {
    service: 'hcaptcha',
    sitekey: '10000000-ffff-ffff-ffff-000000000001',
    secret: '0x0000000000000000000000000000000000000000',
  };

  if (!service || !secret || !sitekey)
    throw new Error(
      'Captcha security is misconfigured! https://docs.spacebar.chat/setup/server/security/captcha/',
    );

  const res = await fetch(verifyEndpoints[service], {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body:
      `response=${encodeURIComponent(response)}` +
      `&secret=${encodeURIComponent(secret)}` +
      `&sitekey=${encodeURIComponent(sitekey)}` +
      (ip ? `&remoteip=${encodeURIComponent(ip)}` : ''),
  });

  return (await res.json()) as HCaptchaResponse | ReCaptchaResponse;
}
