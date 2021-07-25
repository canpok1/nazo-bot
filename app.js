const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_TOKEN;
const prefix = '!';

client.on('ready', () => {
  console.log(`${client.user.tag} でログインしています。`);
})

client.on('message', async msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    msg.channel.send('Pong!');
    return;
  }

  if (command === 'args-info') {
    if (!args.length) {
      return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
    } else if (args[0] === 'foo') {
      return msg.channel.send('bar');
    }

    msg.channel.send(`First argument: ${args[0]}`);
    return;
  }

  if (command === 'team') {
    if (args.length != 2) {
      return msg.channel.send('ボイスチャンネル名とチーム数を指定してください (例) `!team ボイスチャンネル名 チーム数`');
    }
    if (isNaN(args[1])) {
      return msg.channel.send(`チーム数は数値で指定してください (入力値=${args[1]})`);
    }

    const channelName = args[0];
    const teamCount = parseInt(args[1]);

    const channels = msg.guild.channels.cache.filter(c => c.type === 'voice' && c.name === channelName);
    if (!channels.size) {
      return msg.channel.send(`ボイスチャンネル ${channelName} が見つかりませんでした。正しい名称で実行してください。`);
    }
    if (channels.size > 1) {
      return msg.channel.send(`ボイスチャンネル ${channelName} が複数見つかりました。名称が一意のチャンネルを利用してください。`);
    }
    const channel = channels.first();
    const members = channel.members.map(m => { return { weight: Math.random, member: m }; }).sort((a, b) => a.weight - b.weight).map(v => v.member);
    if (members.length == 0) {
      return msg.channel.send(`ボイスチャンネル ${channelName} にメンバーがいないためチーム分けができません。`);
    }

    let teams = [];
    for (let i = 0; i < teamCount; i++) {
      teams.push([]);
    }
    let index = 0;
    for (let m of members) {
      teams[index].push(m);
      index++;
    }

    let infos = [];
    for (let i = 0; i < teamCount; i++) {
      infos.push(`チーム${i + 1}:` + teams[i].map(m => m.nickname || m.displayName).join(','));
    }

    return msg.channel.send(infos.join('\n'));
  }
})

client.login(token);