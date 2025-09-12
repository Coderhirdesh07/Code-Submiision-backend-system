const amqp = require('amqplib/callback_api');

function sendToQueue(queue, message) {
  const QUEUE_URL=process.env.RABBITMQ_URL;
  amqp.connect(QUEUE_URL,(error,connection)=>{
    if(error){
      console.error('RabbitMq could be connected',error.message);
      return ;
    }
    connection.createChannel(function(error0,channel){
      if(error0){
        console.error('RabbitMq channel creation failed',error0.message);
        connection.close();
        return;
      }
      channel.assertQueue(queue,{
        durable:true,
      });
      //  const payload = typeof message === 'string' ? message : JSON.stringify(message);

      channel.sendToQueue(queue,Buffer.from(message),{
        persistent:true,
      });

      console.log(`Sent message to Queue Successful ${queue} : ${message}`);
      
      setTimeout(()=>{
        connection.close();
      },500);
    });
  });
}

module.exports = { sendToQueue };
