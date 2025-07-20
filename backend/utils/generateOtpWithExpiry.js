const generateOtpWithExpiry = () => {
  const otp = Math.floor(10000 + Math.random() * 900000); // Generated a random number between 100000 and 999999
  const expiresAt = new Date(Date.now() + 5 * 60000); // Expires in 5 mins

  return {
    otp,
    expiresAt, // Js Date Object
  };
};

export default generateOtpWithExpiry;
