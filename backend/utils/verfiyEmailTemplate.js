const verificationEmailTemplate = ({ name, url }) => {
  return `
  <p>Dear ${name},</p>

<p>Thank you for registering with <strong>BlinkIt</strong>! Please verify your email address to activate your account.</p>

<a href="${url}" 
   style="
     display: inline-block;
     padding: 12px 24px;
     margin-top: 16px;
     background-color: #071263;
     color: #ffffff;
     text-decoration: none;
     border-radius: 6px;
     font-weight: bold;
     font-size: 16px;
   ">
   Verify Email
</a>

<p style="margin-top: 20px;">If you did not request this registration, you can safely ignore this email.</p>

<p>Best regards,<br>The BlinkIt Team</p>`;
};

export default verificationEmailTemplate;
