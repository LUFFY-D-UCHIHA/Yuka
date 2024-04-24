module.exports.config = {
	name: "menu",
	version: "1.0.0",
	hasPermission: 0,
	credits: "Arjhi",
	description: "See all commands",
  usePrefix: true,
	usages: "[all/-a] [Menu all]",
	commandCategory: "Commands",
	cooldowns: 5
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
	let num = parseInt(event.body.split(" ")[0].trim());
	(handleReply.bonus) ? num -= handleReply.bonus : num;
	let msg = "";
	let data = handleReply.content;
	let check = false;
	if (isNaN(num)) msg = "🐉𝙋𝙡𝙚𝙖𝙨𝙚 𝙚𝙣𝙩𝙚𝙧 𝙖 𝙫𝙖𝙡𝙞𝙙 𝙥𝙖𝙜𝙚 𝙣𝙪𝙢𝙗𝙚𝙧🐉";
	else if (num > data.length || num <= 0) msg = "🐉𝙏𝙝𝙚 𝙨𝙚𝙡𝙚𝙘𝙩𝙚𝙙 𝙥𝙖𝙜𝙚 𝙣𝙪𝙢𝙗𝙚𝙧 𝙞𝙨 𝙞𝙣𝙫𝙖𝙡𝙞𝙙, 𝙥𝙡𝙚𝙖𝙨𝙚 𝙩𝙧𝙮 𝙖𝙜𝙖𝙞𝙣🐉";
	else {
		const { commands } = global.client;
		let dataAfter = data[num -= 1];
		if (handleReply.type == "cmd_info") {
			let command_config = commands.get(dataAfter).config;
			msg += ` 『 𝙂𝙍𝙊𝙐𝙋: ${command_config.commandCategory.toUpperCase()}   』   \n`;
			msg += `\n🧸 𝙉𝙖𝙢𝙚: ${dataAfter}`;
			msg += `\n💬 𝘿𝙚𝙨𝙘𝙧𝙞𝙥𝙩𝙞𝙤𝙣: ${command_config.description}`;
			msg += `\n☄️ 𝙃𝙤𝙬 𝙩𝙤 𝙪𝙨𝙚: ${(command_config.usages) ? command_config.usages : ""}`;
			msg += `\n⏰ 𝘾𝙤𝙤𝙡𝙙𝙤𝙬𝙣: ${command_config.cooldowns || 5} giây`;
			msg += `\n🔗 𝙋𝙚𝙧𝙢𝙞𝙨𝙨𝙞𝙤𝙣: ${(command_config.hasPermission == 0) ? "Người dùng" : (command_config.hasPermission == 1) ? "Quản trị viên nhóm" : "Quản trị viên bot"}`;
			msg += `\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏`
			msg += `\n\n→ [💓] 𝘽𝙤𝙩 𝙨𝙚𝙣𝙙𝙨 𝙩𝙝𝙞𝙨 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙝𝙚𝙧𝙚\\𝙣 𝙏𝙤 𝙡𝙤𝙖𝙙 𝙢𝙤𝙧𝙚 [🐉]`;
		} else {
			check = true;
			let count = 0;
			msg += `→ ${dataAfter.group.toUpperCase()} \n`;

			dataAfter.cmds.forEach(item => {
				msg += `\n ${count += 1}. → ${item}: ${commands.get(item).config.description}`;
			})
			msg += "\n\n ╭──────╮\n 𝙍𝙀𝙋𝙇𝙔 \n╰──────╯ \n [💓] 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙩𝙝𝙞𝙨 𝙩𝙤 𝙨𝙚𝙚 𝙙𝙚𝙩𝙖𝙞𝙡𝙨 𝙤𝙧 𝙖𝙨𝙠 𝙢𝙚 𝙖𝙣𝙮𝙩𝙝𝙞𝙣𝙜 𝙩𝙤 𝙠𝙣𝙤𝙬 𝙢𝙤𝙧𝙚";
		}
	}
	const axios = require('axios');
	const fs = require('fs-extra');
	const img = ["https://i.imgur.com/3eieNQt.gif", "https://i.imgur.com/vekcCyz.gif", "https://i.imgur.com/qwfQeDB.gif", "https://i.imgur.com/Mn4AFfo.gif", "https://i.imgur.com/s6ZgMkc.gif",];
	var path = __dirname + "/cache/menu.gif"
	var rdimg = img[Math.floor(Math.random() * img.length)];
	const imgP = []
	let dowloadIMG = (await axios.get(rdimg, { responseType: "arraybuffer" })).data;
	fs.writeFileSync(path, Buffer.from(dowloadIMG, "utf-8"));
	imgP.push(fs.createReadStream(path))
	var msgg = { body: msg, attachment: imgP }
	api.unsendMessage(handleReply.messageID);
	return api.sendMessage(msgg, event.threadID, (error, info) => {
		if (error) console.log(error);
				if (check) {
			global.client.handleReply.push({
				type: "cmd_info",
				name: this.config.name,
				messageID: info.messageID,
				content: data[num].cmds
			})
		}
	}, event.messageID);
}

module.exports.run = async function({ api, event, args }) {
	const { commands } = global.client;
	const { threadID, messageID } = event;
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
	const axios = require('axios');
	const fs = require('fs-extra');
	const imgP = []
	const img = ["https://i.imgur.com/3eieNQt.gif", "https://i.imgur.com/vekcCyz.gif", "https://i.imgur.com/qwfQeDB.gif", "https://i.imgur.com/Mn4AFfo.gif", "https://i.imgur.com/s6ZgMkc.gif",];
	var path = __dirname + "/cache/menu.gif"
	var rdimg = img[Math.floor(Math.random() * img.length)];

	let dowloadIMG = (await axios.get(rdimg, { responseType: "arraybuffer" })).data;
	fs.writeFileSync(path, Buffer.from(dowloadIMG, "utf-8"));
	imgP.push(fs.createReadStream(path))
	const command = commands.values();
	var group = [], msg = " 💮===「 𝗠𝗘𝗡𝗨 𝗕𝗢𝗧 」===💮\n";
	let check = true, page_num_input = "";
	let bonus = 0;

	for (const commandConfig of command) {
		if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
		else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
	}

	if (args[0] && ["all", "-a"].includes(args[0].trim())) {
		let all_commands = [];
		group.forEach(commandGroup => {
			commandGroup.cmds.forEach(item => all_commands.push(item));
		});
		let page_num_total = Math.ceil(all_commands.length / 2222222222);
		if (args[1]) {
			check = false;
			page_num_input = parseInt(args[1]);
			if (isNaN(page_num_input)) msg = "𝙋𝙡𝙚𝙖𝙨𝙚 𝙚𝙣𝙩𝙚𝙧 𝙖 𝙫𝙖𝙡𝙞𝙙 𝙥𝙖𝙜𝙚 𝙣𝙪𝙢𝙗𝙚𝙧";
			else if (page_num_input > page_num_total || page_num_input <= 0) msg = "🐉𝙏𝙝𝙚 𝙨𝙚𝙡𝙚𝙘𝙩𝙚𝙙 𝙥𝙖𝙜𝙚 𝙣𝙪𝙢𝙗𝙚𝙧 𝙞𝙨 𝙞𝙣𝙫𝙖𝙡𝙞𝙙, 𝙥𝙡𝙚𝙖𝙨𝙚 𝙩𝙧𝙮 𝙖𝙜𝙖𝙞𝙣🐉";
			else check = true;
		}
		if (check) {
			index_start = (page_num_input) ? (page_num_input * 2222222222) - 2222222222 : 0;
			bonus = index_start;
			index_end = (index_start + 2222222222 > all_commands.length) ? all_commands.length : index_start + 2222222222;
			all_commands = all_commands.slice(index_start, index_end);
			all_commands.forEach(e => {
				msg += `\n${index_start += 1}. → ${e}: ${commands.get(e).config.description}`;
			})
			msg += `\n\n→ [🌸] 𝘾𝙝𝙖𝙣𝙜𝙚 ${page_num_input || 1}/${page_num_total}`;
						msg += `\n→ [💗] 𝙏𝙤 𝙨𝙚𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙 𝙙𝙚𝙩𝙖𝙞𝙡𝙨, 𝙪𝙨𝙚 ${prefix}𝙢𝙚𝙣𝙪 [-𝙖, 𝙖𝙡𝙡] [𝙥𝙖𝙜𝙚 𝙣𝙪𝙢𝙗𝙚𝙧]`;
			msg += `\n→ [🌺] 𝙏𝙤 𝙘𝙝𝙚𝙘𝙠 𝙖𝙡𝙡 𝙘𝙤𝙢𝙢𝙖𝙣𝙙𝙨, 𝙪𝙨𝙚 ${prefix} 𝙝𝙚𝙡𝙥 𝙖𝙡𝙡\n\n╭───999───╮\n𝘾𝙤𝙢𝙢𝙖𝙣𝙙 \n╰───𝙇𝙞𝙨𝙩───╯\n[💓] 𝙍𝙚𝙥𝙡𝙮 𝙩𝙤 𝙨𝙚𝙚 𝙙𝙚𝙩𝙖𝙞𝙡𝙨 𝙤𝙧 𝙖𝙨𝙠 𝙢𝙚 𝙖𝙣𝙮𝙩𝙝𝙞𝙣𝙜 𝙩𝙤 𝙠𝙣𝙤𝙬 𝙢𝙤𝙧𝙚.`
		}
		var msgg = { body: msg, attachment: imgP }
		return api.sendMessage(msgg, threadID, (error, info) => {
			if (check) {
				global.client.handleReply.push({
					name: this.config.name,
					bonus: bonus,
					messageID: info.messageID,
					content: all_commands
				})
			}
		}, messageID)
	}

	let page_num_total = Math.ceil(group.length / 2222222222);
	if (args[0]) {
		check = false;
		page_num_input = parseInt(args[0]);
		if (isNaN(page_num_input)) msg = "𝙋𝙡𝙚𝙖𝙨𝙚 𝙚𝙣𝙩𝙚𝙧 𝙖 𝙫𝙖𝙡𝙞𝙙 𝙥𝙖𝙜𝙚 𝙣𝙪𝙢𝙗𝙚𝙧";
		else if (page_num_input > page_num_total || page_num_input <= 0) msg = "🐉𝙏𝙝𝙚 𝙨𝙚𝙡𝙚𝙘𝙩𝙚𝙙 𝙥𝙖𝙜𝙚 𝙣𝙪𝙢𝙗𝙚𝙧 𝙞𝙨 𝙞𝙣𝙫𝙖𝙡𝙞𝙙, 𝙥𝙡𝙚𝙖𝙨𝙚 𝙩𝙧𝙮 𝙖𝙜𝙖𝙞𝙣🐉";
		else check = true;
	}
	if (check) {
		index_start = (page_num_input) ? (page_num_input * 2222222222) - 2222222222 : 0;
		bonus = index_start;
		index_end = (index_start + 2222222222 > group.length) ? group.length : index_start + 2222222222;
		group = group.slice(index_start, index_end);
		group.forEach(commandGroup => msg += `\n${index_start += 1}. → ${commandGroup.group.toUpperCase()} ☄️ `);
		msg += `\n\n『 𝘼𝙧𝙟𝙝𝙞𝙡 』\n → [📖] 𝘾𝙝𝙖𝙣𝙜𝙚 1/1 \n→ [☄️] 𝙏𝙤 𝙫𝙞𝙚𝙬 𝙘𝙤𝙢𝙢𝙖𝙣𝙙 𝙘𝙖𝙩𝙚𝙜𝙤𝙧𝙞𝙚𝙨, 𝙪𝙨𝙚 .𝙢𝙚𝙣𝙪 \n→ [🌼] 𝙏𝙤 𝙘𝙝𝙚𝙘𝙠 𝙖𝙡𝙡 𝙘𝙤𝙢𝙢𝙖𝙣𝙙𝙨, 𝙪𝙨𝙚 .𝙢𝙚𝙣𝙪 𝙖𝙡𝙡 \n→ [🌎] 𝘼𝙙𝙢𝙞𝙣: 𝘼𝙧𝙟𝙝𝙞𝙡 [💓] 𝙍𝙚𝙥𝙡𝙮 𝙩𝙤 𝙨𝙚𝙚 𝙙𝙚𝙩𝙖𝙞𝙡𝙨 𝙤𝙧 𝙖𝙨𝙠 𝙢𝙚 𝙖𝙣𝙮𝙩𝙝𝙞𝙣𝙜 𝙩𝙤 𝙠𝙣𝙤𝙬 𝙢𝙤𝙧𝙚.`;

		var msgg = { body: msg, attachment: imgP }
		return api.sendMessage(msgg, threadID, async (error, info) => {
			global.client.handleReply.push({
				name: this.config.name,
				bonus: bonus,
				messageID: info.messageID,
				content: group
			});
		});
	}
};
