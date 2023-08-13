import config from "./config";

const userRouter = require(`${config.app.rootfs}/server/controllers/user/router`);


export default function router(app) {
   app.use(['/user', '/users'], userRouter());
}