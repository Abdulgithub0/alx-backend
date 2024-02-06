import redis from 'redis';

const redis_client = redis.createClient()
	.on('error', err => { console.log(`Redis client not connected to the server: ${err.message}`) })
	.on('connect', () => { console.log('Redis client connected to the server') });


function getObjectFromString(strObj) {
	const obj = {};
	const arr = strObj.split('\n');
	arr.forEach(kv => {
		const [key, value] = kv.split('=');
		obj[key.trim()] = value;
		});
	return obj
};

function createHash(KEY, strObj) {
	const obj = getObjectFromString(strObj);
	for (let key in obj) {
		redis_client.hset(KEY, key, obj[key], redis.print);
	}
};


function displayHash(key) {
	redis_client.hgetall(key, (err, val) => { console.log(val); });
};


createHash('HolbertonSchools', `
Portland=50
Seattle=80
New York=20
Bogota=20
Cali=40
Paris=2
`
);
displayHash('HolbertonSchools');
