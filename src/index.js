import mongoose from 'mongoose';
import app from './app.js';
import config from './config/config.js';
(async()=>{
    try{
        await mongoose.connect(config.MONGOURL);
        app.on('error', ()=>{
            console.log("Express isn't able to connect to mongodb");
        });

        const onConnection = () => {
            console.log(`Connected on port ${config.PORT}`);
        }
        app.listen(config.PORT, onConnection);
    } catch(error) {
        console.log(`Error`, error);
        throw error;
    }
})()