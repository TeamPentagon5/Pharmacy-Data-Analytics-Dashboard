export const MONGODB_CONNECTION =
  process.env.MONGODB_CONNECTION || "mongodb://localhost:27017/Pharmachy_Dashboard";

export const JWT_SECRET = process.env.JWT_SECRET || "5EC7CEFA1BE7C9354A639369A2AA8";
export const JWT_EXPIRATION_TIME = Number(process.env.JWT_EXPIRATION_TIME) || 60 * 60 * 24 * 30;

export const EMAIL_HOST = process.env.EMAIL_HOST || "mail.teamrabbil.com";
export const EMAIL_PORT = process.env.EMAIL_PORT || "25";
export const EMAIL_USER = process.env.EMAIL_USER || "info@teamrabbil.com";
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "~sR4[bhaC[Qs'}";
export const MAIL_ENCRYPTION = process.env.MAIL_ENCRYPTION || "";

export const MAX_JSON_SIZE = process.env.MAX_JSON_SIZE || "50mb";
export const URL_ENCODED = process.env.URL_ENCODED === "true" ? true : true;  // default true

export const REQUEST_LIMIT_TIME = Number(process.env.REQUEST_LIMIT_TIME) || 15 * 60 * 1000; // 15 Min
export const REQUEST_LIMIT_NUMBER = Number(process.env.REQUEST_LIMIT_NUMBER) || 3000; // Per 15 Min 3000 Requests Allowed

export const WEB_CACHE = process.env.WEB_CACHE === "true" ? true : false;
export const PORT = Number(process.env.PORT) || 5000;
