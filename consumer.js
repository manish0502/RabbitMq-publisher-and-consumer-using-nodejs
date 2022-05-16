const amqp = require('amqplib');


async function create(){

    try{

    // create connection
    const connection = await amqp.connect('amqp://localhost:5672')

    // create channel , this channel is completey different from the channel from publisher.
    const channel = await connection.createChannel();

    // create queue named jobs
    const result = await channel.assertQueue('jobs');

    // consume the messages from publisher

    channel.consume('jobs' , (message)=>{

        const input = JSON.parse(message.content.toString())
        console.log(input.number); 
        if(input.number == 7){
            channel.ack(message);
        }
    })

    console.log('Waiting for messages..')
    }
    catch(err){
        console.error(err);
    }
}
create();