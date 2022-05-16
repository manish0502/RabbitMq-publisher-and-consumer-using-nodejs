const amqp = require('amqplib');

const msg = {
    number: process.argv[2]
}

async function create(){

    try{

    // create connection
    const connection = await amqp.connect('amqp://localhost:5672')

    // create channel
    const channel = await connection.createChannel();

    // create queue named jobs
    const result = await channel.assertQueue('jobs');

    // send something 
    channel.sendToQueue('jobs' , Buffer.from(JSON.stringify(msg)))

    console.log('Job sends successfully' ,msg.number);

    }
    catch(err){
        console.error(err);
    }
}
create();

// To run this : npm run publish 8