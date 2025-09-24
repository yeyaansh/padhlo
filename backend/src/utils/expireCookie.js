import redisClient from  "../config/redisConnect.js"
const expireCookie = async (data, exp) => {
  try {
    await redisClient.set(`user:token:blocked:${data}`, "Blocked");
    await redisClient.expireAt(`user:token:blocked:${data}`, exp);
  } catch (err) {
    console.log("error during blocking the token in Redis " + err);
  }
};

export default expireCookie;
