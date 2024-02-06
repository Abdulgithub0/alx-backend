import redis from 'redis';
import { promisify } from 'util';

const redis_client = redis.createClient()
	.on('error', err => { console.log(`Redis client not connected to the server: ${err.message}`) })
	.on('connect', () => { console.log('Redis client connected to the server') });


function setNewSchool(schoolName, value) {
	redis_client.set(schoolName, value, redis.print);
};

const get = promisify(redis_client.get).bind(redis_client);

async function displaySchoolValue(schoolName) {
	const val = await get(schoolName);
	console.log(val);
};


displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
