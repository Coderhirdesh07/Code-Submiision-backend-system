const amqp = require('amqplib/callback_api');
const { error } = require('console');

function sendToQueue(queue, message) {
  amqp.connect(process.env.RABBITMQ_URL, function (error0, connection) {
    if (error0) {
      console.error('Rabbit MQ Connection failed');
      return;
    }

    connection.createChannel(function (error1, channel) {
      if (error1) {
        console.error('RabbitMQ channel creation failed');
      }
      channel.assertQueue(queue, {
        durable: true,
      });
      channel.sendToQueue(queue, Buffer.from(msg), {
        persistent: true,
      });
      console.log('Sent msg to queue');

      setTimeout(() => {
        connection.close();
      }, 500);
    });
  });
}

module.exports = sendToQueue;
