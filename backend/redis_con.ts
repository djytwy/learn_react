import * as redis from 'redis'

const REDIS_HOST = '127.0.0.1';    // host
const REDIS_PORT = 6379;           // port 
const REDIS_OPT = {};

const client = redis.createClient(REDIS_PORT,REDIS_HOST,REDIS_OPT);

client.on('ready', res =>{
    console.log(`redis is ready :${client}`);
})

export default client