import kue from 'kue';

const queue_obj = kue.createQueue();
const job = queue_obj.create('push_notification_code',
		      	     {phoneNumber: '09056452131', message: 'Job about to be added'}
		            ).save();

job.on('enqueue', () => console.log(`Notification job created: ${job.id}`))
   .on('complete', () => console.log('Notification job completed'))
   .on('failed', () => console.log('Notification job failed'));
