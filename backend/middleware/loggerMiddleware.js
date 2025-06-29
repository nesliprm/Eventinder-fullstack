import logger from "../utils/log.js";

export const loggerMiddleware = (req, res, next) => {
  const start = new Date();
  next();

  const timestamp = new Date().toISOString();
  const ms = new Date() - start;
  logger.info(
    `[${timestamp}] ${req.method} ${req.originalUrl}. Status: ${res.statusCode}. Duration: ${ms} ms`
  );
};
