import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendWelcomeEmail = async (to, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Course Master" <${process.env.EMAIL_USER}>`,
      to, // recipient email
      subject: "Welcome to Course Master 🎉",
      html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5;">
      <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px;">

        <h2 style="color: #4F46E5; text-align: center;">Welcome, ${name}! 🎉</h2>

        <p style="font-size: 15px; color: #444;">
          Thanks for joining <b>Course Master</b>! Your account is ready.
        </p>

        <p style="font-size: 15px; color: #444;">
          Start learning new skills and explore our courses anytime.
        </p>

        <div style="text-align: center; margin-top: 20px;">
          <a href="https://course-master-nur-nayeem.netlify.app"
             style="background: #4F46E5; padding: 10px 20px; color: #fff; text-decoration: none; border-radius: 6px;">
            Go to Dashboard
          </a>
        </div>

        <p style="font-size: 13px; color: #888; text-align: center; margin-top: 20px;">
          If you didn’t create this account, please ignore this email.
        </p>

      </div>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent!");
  } catch (err) {
    console.log("Email send error:", err.message);
  }
};
