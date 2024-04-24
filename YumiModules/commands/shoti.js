module.exports.config = {
  name: "shotiph",
  version: "30.0.0",
  credits: "Arjhil",
  description: "Generate random tiktok girl videos",
  hasPermssion: 0,
  commandCategory: "Search",
  usePrefix: true,
  usage: "[shoti]",
  cooldowns: 5,
  dependencies: [],
};
module.exports.run = async function({ api, event }) {
  const axios = require("axios");
  const request = require('request');
  const fs = require("fs")

api.sendMessage(`⏱️ | video sa mga shoti ni arjhil sending please wait...`, event.threadID, event.messageID);
  //Get apikey at 'https://shoti-api.libyzxy0.repl.co'
  let data = await axios.get('https://shoti-api.libyzxy0.repl.co/api/get-shoti?apikey=shoti-1h7ndoeegif7bp263co');
  var file = fs.createWriteStream(__dirname + "/cache/shoti.mp4");
  var rqs = request(encodeURI(data.data.data.url));
  console.log('Shoti Downloaded >>> ' + data.data.data.id)
  rqs.pipe(file);
  file.on('finish', () => {
    return api.sendMessage({
      attachment: fs.createReadStream(__dirname + '/cache/shoti.mp4')
    }, event.threadID, event.messageID)
  })
};