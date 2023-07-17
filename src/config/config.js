import dotenv from 'dotenv';

dotenv.config();

const config = {
    PORT: process.env.PORT || null,
    MONGOURL: process.env.MONGO_URL || null
};

export default config;