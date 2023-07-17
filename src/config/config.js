import dotenv from 'dotenv';

dotenv.config();

const config = {
    PORT: process.env.PORT || null,
    MONGOURL: process.env.MONGO_URL || null,
    JWT_SECRET: process.env.JWT_SECRET || null,
    JWT_EXPIRY: process.env.JWT_EXPIRY || null
};

export default config;