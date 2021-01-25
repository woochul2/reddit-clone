import nodemailer from 'nodemailer';

export async function sendEmail(to: string, html: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: 'leewoo0686@gmail.com',
        clientId:
          '1004177644200-d9mmhtd8cf54gn2c2ldo1i8r9e4gqc4i.apps.googleusercontent.com',
        clientSecret: 'FRulD_wiiYBCTalEOgfiBV0D',
        refreshToken:
          '1//04GxktCGdYtcQCgYIARAAGAQSNwF-L9IrjIUWNI9s8mK4NLkNA5yCpM1YnMC-ySs7rvNuYG-_p41DoJTe2poIoivFA0ePl226QEo',
        accessToken:
          'ya29.a0AfH6SMD_6iwiq-Hw5xhFkji3wyXB3TfnqL1zFa_8o4WF5O1CqYSR1eLBlOsCp0U65Wsub7LkDjZe_s9gSsUZ2jbyesvKz_d920YVd5gF_z3TgbC-AADMd5QEZk2mGMg6fwn7JuogGvhEAPQ1xlayi5M-n3DW17l0vxWUnOCfpnw',
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
