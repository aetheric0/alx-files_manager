import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.error('Redis Client Error:', err));
  }

  isAlive() {
    if (this.client.connected) {
      return true;
    }
    return false;
  }

  async get(key) {
    const getValue = promisify(this.client.get).bind(this.client);
    const value = await getValue(key);
    return value;
  }

  async set(key, value, duration) {
    const setValue = promisify(this.client.set).bind(this.client);
    await setValue(key, value);
    await this.client.expire(key, duration);
  }

  async del(key) {
    const delValue = promisify(this.client.del).bind(this.client);
    await delValue(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
