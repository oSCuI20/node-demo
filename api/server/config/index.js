const path = require('path');

function config() {
  return {
    app: {
      host: process.env.APP_HOST,
      port: process.env.APP_PORT || '3000',
      admin: process.env.APP_ADMIN_URL,
      rootfs: process.env.APP_HOME || path.normalize(`${__dirname}`)
    },
    mongodb: {
      host: process.env.MONGO_HOST,
      port: process.env.MONGO_PORT,
      name: process.env.MONGO_NAME,
      options: {
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        poolSize: process.env.MONGO_POOL_SIZE || 10,
        //bufferMaxEntries: process.env.MONGO_BUFFER_MAX_ENTRIES || 0
      },
    },
    mail: {
      admin: process.env.MAIL_ADMIN,
      from: process.env.MAIL_FROM,
      credentials: {
        host: process.env.MAIL_CREDENTIALS_HOST,
        port: process.env.MAIL_CREDENTIALS_PORT || 587,
        auth: {
          user: process.env.MAIL_CREDENTIALS_AUTH_USER,
          pass: process.env.MAIL_CREDENTIALS_AUTH_PASS,
        },
        tls: process.env.MAIL_CREDENTIALS_TLS_OPTIONS || {rejectUnauthorized: false}
      }
    }
  };
};

export default config();