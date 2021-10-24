// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js')
const { token, channelId, adminId} = require('./config.json')

// Create a new client instance
const client = new Client(
    { 
        intents: [
            Intents.FLAGS.GUILDS, 
            Intents.FLAGS.GUILD_MESSAGES, 
            Intents.FLAGS.DIRECT_MESSAGES
        ]
    }
)

// When client is ready, run this code
client.once('ready', () => {
})

client.on('interactionCreate', async interaction => {

    const channel = client.channels.cache.get(channelId)

	if (!interaction.isCommand()) return;

	const { commandName } = interaction;
	if (commandName === 'clear') {
        if (interaction.user.id == adminId) {
            deleteAllChannelMessages(channel);
            await interaction.reply(`Messages deleted.`);
        } else {
            await interaction.reply(`You are not allowed to use this command`);
        }
	}
});

// Login to Discord with client's token
client.login(token)

function deleteAllChannelMessages(channel) {
    channel.messages
    .fetch({limit: 100})
    .then(async (messagesCollection) => {
        messagesArray = Array.from(messagesCollection.values())
        for await (const message of messagesArray) {message.delete()}
    })
}