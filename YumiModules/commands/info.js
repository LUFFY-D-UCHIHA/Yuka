module.exports.config = {
	name: "info",
	version: "1.0.1", 
	hasPermssion: 0,
	credits: "Joshua Sy (modified by Siegfried Sama)", //don't change the credits please
	description: "Admin and Bot info.",
	commandCategory: "...",
	cooldowns: 1,
	dependencies: 
	{
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};
module.exports.run = async function({ api,event,args,client,Users,Threads,__GLOBAL,Currencies }) {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);
const moment = require("moment-timezone");
var juswa = moment.tz("Asia/Manila").format("『D/MM/YYYY』 【HH:mm:ss】");
var link = ["https://i.postimg.cc/CKjZ5T9Q/download-1.gif", "https://i.postimg.cc/rsH37by8/54551d2655c29765eb466a4a1321f82e.gif"];
var callback = () => api.sendMessage({body:`➢ Admin and Bot Information

⁂ Bot Name: ${global.config.BOTNAME}

✧ Bot Admin: ${global.config.OWNER}

♛ Bot Admin Link: ${global.config.FACEBOOK}

❂ Bot Prefix: ${global.config.PREFIX}

✫ Bot Owner: ${global.config.OWNER}

➟ UPTIME

✬ Today is: ${juswa} 

➳ Bot is running ${hours}:${minutes}:${seconds}.

✫ Thanks for using ${global.config.BOTNAME} Bot!`,attachment: fs.createReadStream(__dirname + "/cache/juswa.gif")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/juswa.gif")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/juswa.gif")).on("close",() => callback());
   };