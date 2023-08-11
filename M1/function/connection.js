const amqp = require("amqplib");
let channel;

let connectQueue = async () => {
    try {
        let connection = await amqp.connect(process.env.RABBITMQ_CONNETION_STRING);
        return connection.createChannel();
    } catch (error) {
        console.log("Error connecting, please check if I'm running RabbitMQ (Mac: 'brew info rabbitmq') About: " + error.message)
    }
}

let sendToQueue = async (queueName, data) => {
    if (channel == null) channel = await connectQueue();
    return channel.sendToQueue(queueName, Buffer.from(data))
}

let waitToQueue = async () => {
    if (channel == null) channel = await connectQueue();
    await channel.assertQueue("wait-to-queue");
    channel.consume('wait-to-queue', data => {
        let { input, emitId } = JSON.parse(Buffer.from(data.content));
        eventEmitter.emit(emitId, input)
    }, { noAck: true });
}

//Try to connect RabbitMQ!
let start = async () => {
    channel = await connectQueue();
    waitToQueue();
}

module.exports = { sendToQueue, waitToQueue, start };