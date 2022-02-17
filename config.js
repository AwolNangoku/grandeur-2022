const config = (env) => ({
  app: {
    port: env === "production" ? process.env.PORT : process.env.PORT_DEV,
    host:
      env === "production" ? process.env.ROOT_URL : process.env.ROOT_URL_DEV,
  },
  db: {
    port:
      env === "production" ? process.env.PROD_DB_PORT : process.env.DEV_DB_PORT,
    url:
      env === "production"
        ? process.env.DATABASE_URL
        : process.env.DEV_DATABASE_URL,
  },
  emailService: {
    service:
      env === "production"
        ? process.env.PROD_EMAIL_SERVICE
        : process.env.DEV_EMAIL_SERVICE,
    auth: {
      user:
        env === "production"
          ? process.env.AUTH_EMAIL_ADDRESS
          : process.env.DEV_AUTH_EMAIL_ADDRESS,
      pass:
        env === "production"
          ? process.env.AUTH_EMAIL_PASSWORD
          : process.env.DEV_AUTH_EMAIL_PASSWORD,
    },
    campaignEmail: {
      email:
        env === "production"
          ? process.env.PROD_CAMPAIGN_EMAIL
          : process.env.DEV_CAMPAIGN_EMAIL,
    },
  },
});

module.exports = config;
