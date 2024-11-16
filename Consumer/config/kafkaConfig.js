import { Kafka, logLevel } from 'kafkajs';

class KafkaConfig {
    constructor() {
        // Kafka configuration
        this.brokers = '192.168.1.8:9092'; // Update to the correct Kafka broker port
        this.kafka = new Kafka({
            clientId: 'consumer',
            brokers: [this.brokers],
            logLevel: logLevel.ERROR,
        });

        // Initialize Consumer
        this.consumer = this.kafka.consumer({ groupId: 'consumer' }); // Group ID for the consumer
    }

    // Connect to Kafka
    async connect() {
        try {
            await this.consumer.connect();
            console.log('Kafka Consumer Connected');
        } catch (error) {
            console.error('Error connecting Kafka Consumer:', error);
        }
    }

    async subscribeTopTopic(topic){
        try {
            await this.consumer.subscribe({ topic, fromBeginning: true });
            console.log(`Subscribed to Topic: ${topic}`);

        } catch (error) {
            console.log(error)
        }
    }
    // Subscribe and consume messages from a topic
    async consume(callback) {
        try {
            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    const value = message.value.toString();
                    // console.log(`Received message Value: ${value}`);
                    callback(JSON.parse(value));
                },
            });
            
        } catch (error) {
            console.error('Error consuming messages:', error);
        }
    }

    // Disconnect from Kafka
    async disconnect() {
        try {
            await this.consumer.disconnect();
            console.log('Kafka Consumer Disconnected');
        } catch (error) {
            console.error('Error disconnecting Kafka Consumer:', error);
        }
    }
}

export default new KafkaConfig();
