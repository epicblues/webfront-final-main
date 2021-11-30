import nodemailer from "nodemailer";

export async function sendAuthEmail(email: string, key: string) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.NEXT_PUBLIC_ADMIN_EMAIL, // generated ethereal user
      pass: process.env.NEXT_PUBLIC_ADMIN_EMAIL_PW, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"요건 다 내꺼" <webfrontyogeun@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "요건 다 내꺼 이메일 회원 인증", // Subject line

    html: `<a href='${process.env.NEXT_PUBLIC_STATIC_SERVER_URL}/api/user/auth?email=${email}&key=${key}'>이메일 회원 인증</a>`,
  });

  console.log("메시지 전송 완료: %s", info.messageId);
}
