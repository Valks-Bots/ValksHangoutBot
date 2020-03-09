const Discord = require('discord.js')
const client = new Discord.Client()
require('dotenv').config()

let newUsers = []
let guild = null

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`)
	
	guild = client.guilds.cache.get('453710350454620160')
	
	let channelWelcome = guild.channels.cache.get('514650346849566730')
	let channelHangout = guild.channels.cache.get('642925845928869908')
	let newUser = null
	channelWelcome.messages.fetch('514650589511024682').then(message => {
		const filter = (reaction, user) => {
			newUser = user
			return reaction.emoji.name === '✅'
		}
		
		const collector = message.createReactionCollector(filter)
		
		collector.on('collect', (reaction, reactionCollector) => {
			if (!newUsers.includes(newUser.id)) 
			{
				newUsers.push(newUser.id)
				
				channelHangout.send(`<@&684154587254620160> Lets welcome <@!${newUser.id}>!`, {embed: {
					  title: `**Welcome to :hibiscus: Valk's Hangout!**`,
					  description: `Please read all the rules <#514650346849566730>\n\nIntroduce yourself! <#646004587618238474>\n\nAnd get some roles! <#661041843689095169>`,
					  footer: {
						  text: `Thank you for joining us! You're the ${guild.members.cache.size}th member!`
					  },
					  thumbnail: {
						  url: newUser.displayAvatarURL()
					  },
					  image: {
						  url: 'https://media3.giphy.com/media/4QxQgWZHbeYwM/giphy.gif'
					  },
					  timestamp: new Date()
				}})
			}
		})
	})
})

client.on('message', msg => {
	if (msg.author.bot) return // We don't want the bot reacting to itself..
	if (msg.channel.type !== 'text') return // Lets focus on the use of text channels.
  
	const channels = ['681297740546048000', '661055556890394654', '684094684980969575', '683537150352031800']
	let filter = false
	for (let i = 0; i < channels.length; i++) {
		if (msg.channel.id === channels[i]) 
		{
			filter = true
			break
		}
	}
	
	if (filter) 
	{
		msg.channel.send({embed: {
			title: `**Thank you for your partnership!**`,
			description: `*Opt out of partner pings in <#686094583263658091>*`,
			image: {
				url: `https://i.imgur.com/8fmFCBh.gif`
			},
			footer: {
				text: `${msg.author.username}#${msg.author.discriminator} (${msg.author.id})`
			},
			timestamp: new Date()
		}})
	}
})

client.login(process.env.APIKEY)