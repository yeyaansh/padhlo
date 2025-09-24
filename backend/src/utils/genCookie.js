import jwt from "jsonwebtoken";

const genCookie = (data) => {
  try {
    const token = jwt.sign(
      { _id: data._id, first_name:data.first_name,last_name:data.last_name, email_id: data.email_id, role: data.role },
      process.env.JWT_KEY,
      { expiresIn: process.env.JWT_TOKEN_EXPIRY }
    );
    return token;
  } catch (err) {
    console.log("genCookie mein dikkat hai..", err);
  }
};

export default genCookie;
