import validator from "validator"
const 
validate = (data) => {
  const mandatoryFields = ["first_name", "email_id", "password"];
  const valid = mandatoryFields.every((k) => Object.keys(data).includes(k));
  if(!valid)
    throw new Error("Missing Fields");
  const isValidEmail = validator.isEmail(data.email_id)
  if(!isValidEmail)
    throw new Error("Invalid Email");
  const isStrongPass = validator.isStrongPassword(data.password)
  if(!isStrongPass)
    throw new Error("Weak Password");
};

export default validate;
