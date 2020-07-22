const Discord = require('discord.js');
const fs = require('fs');
const database_path = './database/welcome_message.json'

let database = JSON.parse(fs.readFileSync(database_path, 'utf8'));

exports.run = (bot,message,args) => {
    const guild = message.guild;
    let arguments = args.join(separator = ' ');

    arguments = arguments.split(';');
    
    database[`${guild.id}`] = {};
    database[`${guild.id}`]['title'] = arguments[0];
    database[`${guild.id}`]['text'] = arguments[1];
    database[`${guild.id}`]['gif_link'] = arguments[2];
    database[`${guild.id}`]['channel_name'] = arguments[3];
    fs.writeFileSync(database_path,JSON.stringify(database));

    const channel = message.guild.channels.cache.find(channel => channel.name === arguments[3].trim());

    const welcome_message = new Discord.MessageEmbed()
        .setTitle(`${arguments[0]}`)
        .setAuthor(`${message.member.displayName}`,message.member.user.avatarURL())
        .setThumbnail(message.member.user.avatarURL())
        .setImage(arguments[2])
        .setDescription(arguments[1])
        .setTimestamp();

    const response = new Discord.MessageEmbed()
        .setTitle('Rapid Bot')
        .setAuthor('Rapid Bot', 'https://cdn.discordapp.com/app-icons/734154625845952694/8261474e8963b9e62bf19159ca52dcea.png', 'https://discord.com/oauth2/authorize?client_id=734154625845952694&permissions=8&scope=bot')
        .setDescription(
            "A mensagem de boas-vindas foi definida com sucesso!\n"+
            `Ela será exibida sempre que um membro entrar no canal <#${channel.id}>`
        )
        .setTimestamp();

        message.channel.send(response);
        message.channel.send(welcome_message);
}