const kue = require('kue');
const expect = require('chai').expect;
const createPushNotificationsJobs = require('./8-job');

const queue = kue.createQueue();
const list = [
    {
        phoneNumber: '4153518780',
    	message: 'This is the code 1234 to verify your account'
    },
    {
    	phoneNumber: '4153518777',
    	message: 'This is the code 1122 to verify your account'
    }
];

describe('Test suite for createPushNotificationsJobs function', () => {
	beforeEach(() => queue.testMode.enter());
	afterEach(() => {
		queue.testMode.clear();
		queue.testMode.exit();
	});

	it('display a error message if jobs is not an array', () => {
		expect(() => createPushNotificationsJobs({PhoneNumber: '1234'}, queue)).to.throw('Jobs is not an array');
		expect(() => createPushNotificationsJobs('', queue)).to.throw(Error, 'Jobs is not an array');
	});
	it('create two new jobs to the queue', () => {
		createPushNotificationsJobs(list, queue);
		expect(queue.testMode.jobs.length).to.equal(2);
		expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
		expect(queue.testMode.jobs[1].type).to.equal('push_notification_code_3');
	});
	it('check for correct job data field', () => {
		createPushNotificationsJobs(list, queue);
		expect(queue.testMode.jobs[0].data).to.deep.equal({phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account'})
		expect(queue.testMode.jobs[1].data).to.deep.equal({phoneNumber: '4153518777', message: 'This is the code 1122 to verify your account'});
	});
})

