const amqp = require('amqplib/callback_api');

function handleDataFromQueue(){
    const QUEUE_URL=process.env.QUEUE_SYSTEM_URL;
    const QUEUE_NAME=process.env.QUEUE_NAME;
    let messageItem;
    
    amqp.connect(QUEUE_URL, function(error0,connection){
        if(error0){
            console.error('RabbitMQ Connection failed',error0);
            return;
        }
        connection.createChannel(function(error1,channel){
            if(error1){
                console.error('RabbitMQ channel creation failed',error1);
                return;
            }
            channel.assertQueue(QUEUE_NAME,{
                durable:true
            });
            channel.consume(QUEUE_NAME,function(messages){
                messageItem = messages;
                console.log('got message form queue');
            },{
               noAck:true 
            });
        });
    });
    return messageItem;
}

module.exports = { handleDataFromQueue };