import nodemailer from "nodemailer";

export async function sendAuthEmail(email: string, key: string) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // 465 포트일 때만 true
    auth: {
      user: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
      pass: process.env.NEXT_PUBLIC_ADMIN_EMAIL_PW,
    },
  });

  // 설정한 transporter 인스턴스를 통해 메일을 보낸다.
  let info = await transporter.sendMail({
    from: '"요건 다 내꺼" <webfrontyogeun@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "요건 다 내꺼 이메일 회원 인증", // Subject line

    html: `<a href='${process.env.NEXT_PUBLIC_STATIC_SERVER_URL}/api/user/auth?email=${email}&key=${key}'>이메일 회원 인증</a>`,
  });
}
