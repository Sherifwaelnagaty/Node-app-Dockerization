const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const Client = require('pg');
const PORT = 4000;    
const app = express();

//mongodb connection
const DB_USERNAME = 'root';
const DB_PASSWORD = 'example';
const DB_PORT= 27017;
const DB_HOST = 'mongo';
const DB_URI = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

//redis connection
const REDIS_PORT = 6379;
const REDIS_HOST = 'redis';

//postgres connection
const POSTGRES_USERNAME = 'postgres';
const POSTGRES_PASSWORD = 'example';
const POSTGRES_PORT = 5432;
const POSTGRES_HOST = 'postgres';
const POSTGRES_URI = `postgresql://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}`;

const Client = new Client({
    connectionString:POSTGRES_URI,
});

//connect to postgres
Client.connect().then(() => console.log('Postgres connected')).catch(err => console.log(err));
const redisconst = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});

//connect to redis
redisconst.on('error', (err) => console.log(err));
redisconst.on('connect', () => console.log('Redis connected'));
redisconst.connect();

//connect to mongodb
mongoose.connect(DB_URI).then(() => console.log('MongoDB connected')).catch(err => console.log(err));
app.get('/', (req, res) => res.send('Hello World'));    
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
