const redis = require('redis');

const client = redis.createClient();

client.on('connect', () => console.log('Connected to Redis!'));
client.on('error', (err) => console.error('Redis Client Error:', err));

client.ping((err, pong) => {
  if (err) {
    console.error('Ping failed:', err);
  } else {
    console.log('Ping response:', pong);
  }
});
