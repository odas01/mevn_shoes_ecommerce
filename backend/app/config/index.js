import * as dotenv from 'dotenv';
// Config env
dotenv.config();

const config = {
    app: {
        port: process.env.PORT,
    },
    db: {
        uri: process.env.DB,
    },
    JWT_SECRET: process.env.JWT_SECRET,
};

export default config;
