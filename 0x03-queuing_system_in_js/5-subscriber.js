import redis from 'redis';

const redis_subscriber = redis.createClient();
redis_subscriber.on('connect', () => console.log('Redis client connected to the server'))
	.on('error', err => console.log(`Redis client not connected to the server: ${err.message}`));

redis_subscriber.subscribe('holberton school channel');
redis_subscriber.on('message', (channelName, message) => {
	if (message === 'KILL_SERVER') {
		redis_subscriber.unsubscribe();
		redis_subscriber.quit();
	} else console.log(message);
});
