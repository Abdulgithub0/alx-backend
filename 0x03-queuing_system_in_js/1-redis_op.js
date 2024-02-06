import { createClient } from 'redis';

const redis = createClient()
	.on('error', err => { console.log(`Redis client not connected to the server: ${err.message}`) })
	.on('connect', () => { console.log('Redis client connected to the server') });


function setNewSchool(schoolName, value) {
	redis.set(schoolName, value, redis.print);
};

function displaySchoolValue(schoolName) {
	redis.get(schoolName, (err, value) => {
		if (err) throw err;
		else console.log(value);
	});
};


displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
