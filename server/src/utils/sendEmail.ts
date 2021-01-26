import { google } from 'googleapis';
import nodemailer from 'nodemailer';

export async function sendEmail(to: string, html: string) {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });
    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: 'leewoo0686@gmail.com',
        accessToken: accessToken.token as string,
      },
    });

    const info = await transporter.sendMail({
      from: '"이우철" <leewoo0686@gmail.com>',
      to,
      subject: 'reddit-clone 비밀번호 변경',
      html,
    });

    console.log('이메일 전송 완료. to:', info.envelope.to);
  } catch (err) {
    console.error(err);
  }
}
