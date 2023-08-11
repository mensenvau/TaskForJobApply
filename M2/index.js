const amqp = require("amqplib");
const { GetUser, GetUsersAll } = require("./users.data");
let channel, connection;

require("dotenv").config()
connectQueue();

async function connectQueue() {
    try {
        connection = await amqp.connect(process.env.RABBITMQ_CONNETION_STRING);
        channel = await connection.createChannel()

        await channel.assertQueue("user-info");
        await channel.assertQueue("users-all");

        // wait "user-info
        channel.consume("user-info", data => {
            let { uid, emitId } = JSON.parse(Buffer.from(data.content));
            channel.sendToQueue("wait-to-queue", Buffer.from(JSON.stringify({ input: GetUser(uid), emitId })));
        }, { noAck: true });

        // wait users-all
        channel.consume("users-all", (data) => {
            let { emitId } = JSON.parse(Buffer.from(data.content));
            channel.sendToQueue("wait-to-queue", Buffer.from(JSON.stringify({ input: GetUsersAll(), emitId })));
        }, { noAck: true });

    } catch (error) {
        console.log("Error connecting, please check if I'm running RabbitMQ (Mac: 'brew info rabbitmq')\n", error)
    }
}
