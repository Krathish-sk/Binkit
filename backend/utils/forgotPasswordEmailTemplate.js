const forgotPasswordEmailTemplate = ({ name, otp }) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333;">
        <p>Dear ${name},</p>
        <p>You have requested to reset your password. Please use the OTP below to proceed:</p>
        <h2 style="color: #2c3e50;">${otp}</h2>
        <p><strong>Note:</strong> This OTP is valid for only 5 minutes.</p>
        <p>If you did not make this request, please ignore this email.</p>
        <br/>
        <p>Regards,<br/>Support Team</p>
    </div> `;
};

export default forgotPasswordEmailTemplate;
