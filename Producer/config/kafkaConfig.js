import { Kafka, logLevel } from 'kafkajs';

class KafkaConfig {
    constructor() {
        // Initialize Kafka instance first
        this.brokers = '192.168.1.8:9092'; // Update to the correct Kafka broker port
        this.kafka = new Kafka({
            clientId: 'producer',
            brokers: [this.brokers],
            logLevel: logLevel.ERROR,
        });

        // Initialize Admin and Producer instances
        this.admin = this.kafka.admin();
        this.producer = this.kafka.producer();
    }

    // Connect to Kafka
    async connect() {
        try {
            await this.producer.connect();
            await this.admin.connect();
            console.log('Kafka Connected');
        } catch (error) {
            console.error('Error connecting to Kafka:', error);
        }
    }

    // Create a topic
    async createTopic(topic) {
        try {
            await this.admin.createTopics({
                topics: [{ topic, numPartitions: 1 }],
            });
            console.log('Topic Created:', topic);
        } catch (error) {
            console.error('Error creating topic:', error);
        }
    }

    // Send a message to a topic
    async sendToTopic(topic, message) {
        try {
            await this.producer.send({
                topic,
                messages: [{ value: message }],
            });
            // console.log('Message sent to Topic:', topic);
        } catch (error) {
            console.error('Error sending message to topic:', error);
        }
    }

    // Disconnect from Kafka
    async disconnect() {
        try {
            await this.producer.disconnect();
            await this.admin.disconnect();
            console.log('Kafka Disconnected');
        } catch (error) {
            console.error('Error disconnecting from Kafka:', error);
        }
    }
}

export default new KafkaConfig();
