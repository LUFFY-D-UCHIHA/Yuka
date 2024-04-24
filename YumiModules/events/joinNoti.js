module.exports.config = {
    name: "joinNoti",
    eventType: ["log:subscribe"],
    version: "1.0.1",
    credits: "Anup Kumar",
    description: "Notification of bots or people entering groups with random gif/photo/video",
    dependencies: {
        "fs-extra": "",
        "path": "",
        "pidusage": ""
    }
};
 
module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];
 
    const path = join(__dirname, "cache", "joinGif");
    if (existsSync(path)) mkdirSync(path, { recursive: true }); 
 
    const path2 = join(__dirname, "cache", "joinGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });
 
    return;
}
 
 
module.exports.run = async function({ api, event }) {
    const { join } = global.nodemodule["path"];
    const { threadID } = event;
    if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
        api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? " " : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
        const fs = require("fs");
        return api.sendMessage("", event.threadID, () => api.sendMessage({body: `───── ❝✰BOT✰❞ ─────\n\n${global.config.BOTNAME} Connected 🌐✅
        
Hello My Name is ${global.config.BOTNAME}
My Prefix is : [ ${global.config.PREFIX} ]
Type ${global.config.PREFIX}help to see command list.
My Master Name is Arjhil 📌Kindly use ${global.config.PREFIX}callad for any issue or concern💫
Thank you for using Arjhil Bot ☀️ `, attachment: fs.createReadStream(__dirname + "/cache/joinMp4/hello.gif")} ,threadID));
    }
    else {
        try {
            const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
            let { threadName, participantIDs } = await api.getThreadInfo(threadID);
 
            const threadData = global.data.threadData.get(parseInt(threadID)) || {};
            const path = join(__dirname, "cache", "joinGif");
            const pathGif = join(path, `${threadID}.gif`);
 
            var mentions = [], nameArray = [], memLength = [], i = 0;
            
            for (id in event.logMessageData.addedParticipants) {
                const userName = event.logMessageData.addedParticipants[id].fullName;
                nameArray.push(userName);
                mentions.push({ tag: userName, id });
                memLength.push(participantIDs.length - i++);
            }
            memLength.sort((a, b) => a - b);
            
            (typeof threadData.customJoin == "undefined") ? msg = " 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 {name},\n✿⊱┈──╌✾╌──┈⊰✿\n\n You're The {soThanhVien} Member of {threadName} \n\n✿⊱┈──╌✾╌──┈⊰✿\n𝖧𝖾𝗅𝗅𝗈! 𝖶𝖾 𝖺𝗋𝖾 𝖽𝖾𝗅𝗂𝗀𝗁𝗍𝖾𝖽 𝗍𝗁𝖺𝗍 𝗒𝗈𝗎 𝗁𝖺𝗏𝖾 𝖼𝗁𝗈𝗌𝖾𝗇 𝗍𝗈 𝖻𝖾 𝗉𝖺𝗋𝗍 𝗈𝖿 𝗈𝗎𝗋 𝖼𝗈𝗆𝗆𝗎𝗇𝗂𝗍𝗒 𝖺𝗇𝖽 𝖼𝖺𝗇'𝗍 𝗐𝖺𝗂𝗍 𝗍𝗈 𝗀𝖾𝗍 𝗌𝗍𝖺𝗋𝗍𝖾𝖽..\n━━━━━━━━━━━━━━━━━━" : msg = threadData.customJoin;
            msg = msg
            .replace(/\{name}/g, nameArray.join(', '))
            .replace(/\{type}/g, (memLength.length > 1) ?  'Friends' : 'Friend')
            .replace(/\{soThanhVien}/g, memLength.join(', '))
            .replace(/\{threadName}/g, threadName);
 
            if (existsSync(path)) mkdirSync(path, { recursive: true });
 
            const randomPath = readdirSync(join(__dirname, "cache", "joinGif", "randomgif"));
 
            if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
            else if (randomPath.length != 0) {
                const pathRandom = join(__dirname, "cache", "joinGif", "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
                formPush = { body: msg, attachment: createReadStream(pathRandom), mentions }
            }
            else formPush = { body: msg, mentions }
 
            return api.sendMessage(formPush, threadID);
        } catch (e) { return console.log(e) };
    }
}