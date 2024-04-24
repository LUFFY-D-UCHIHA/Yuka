const axios = require("axios");
const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
const moment = require("moment-timezone");
const { PasteClient } = require("pastebin-api");
const { join, resolve } = require("path");

const axiosClient = axios.create();
axiosClient.defaults.timeout = 10000;

module.exports.config = {
  name: "share",
  version: "2.6",
  hasPermission: 0,
  credits: "Arjhil",
  description: "( 𝙎𝙝𝙖𝙧𝙚 𝙁𝙞𝙡𝙚𝙨 )",
  commandCategory: "private",
  usages: "( Share Files On Private )",
  cooldowns: 0,
  dependencies: {
    "pastebin-api": "",
    cheerio: "",
    request: ""
  }
};

module.exports.run = async function ({ api, event, args }) {
  const permission = ["100040253298048", ""];
  if (!permission.includes(event.senderID)) {
    return api.sendMessage(
      "‼️ 𝖲𝗈𝗋𝗋𝗒 𝗒𝗈𝗎 𝖺𝗋𝖾 𝗇𝗈𝗍 ARJHIL 𝗌𝗍𝖿𝗎..",
      event.threadID,
      event.messageID
    );
  }

  const picture = (
    await axios.get(
      "https://drive.google.com/uc?export=download&id=1rKtZI_KT-vT_DvDRDhhdtZ-nCEGWbx2U",
      { responseType: "stream" }
    )
  ).data;

  const hmm = moment.tz("Asia/Manila").format("DD/MM/YYYY || HH:mm:ss");
  const { senderID, threadID, messageID, messageReply, type } = event;
  var name = args[0];

  var uid, text;

  if (type == "message_reply") {
    text = messageReply.body;
    uid = event.messageReply.senderID;
  } else {
    uid = event.senderID;
  }

  if (!text && !name) {
    return api.sendMessage(
      { body: `𝖳𝖨𝖬𝖤: ${hmm} `, attachment: picture },
      threadID,
      messageID
    );
  }

  var data = fs.readFile(
    `./modules/commands/${args[0]}.js`,
    "utf-8",
    async (err, data) => {
      if (err) {
        return api.sendMessage(
          { body: `𝖳𝖨𝖬𝖤: ${hmm}\n\n😿 𝖲𝗈𝗋𝗋𝗒, 𝖥𝗂𝗅𝖾 '${args[0]}' 𝖽𝗈𝖾𝗌 𝗇𝗈𝗍 𝖾𝗑𝗂𝗌𝗍! 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.`, attachment: picture },
          threadID,
          messageID
        );
      }

      const client = new PasteClient("R02n6-lNPJqKQCd5VtL4bKPjuK6ARhHb");

      async function createPaste(name) {
        const url = await client.createPaste({
          code: data,
          expireDate: "N",
          format: "javascript",
          name: name,
          publicity: 1
        });

        var id = url.split("/")[3];
        return "https://pastebin.com/raw/" + id;
      }

      var link = await createPaste(args[1] || "noname");

      const threadInfo = await api.getThreadInfo(event.threadID);
      const groupName = threadInfo.name;
      const senderName = global.data.userName.get(event.senderID);

      api.sendMessage(
        `➤ 𝖲𝖧𝖠𝖱𝖤 𝖥𝖨𝖫𝖤𝖲\n\n𝖦𝖯 𝖭𝖠𝖬𝖤: ${groupName}\n𝖳𝖨𝖬𝖤: ${hmm}\n𝖭𝖠𝖬𝖤 𝖮𝖥 𝖥𝖨𝖫𝖤: ${args.join(
          " "
        )}\n𝖲𝖤𝖭𝖳 𝖡𝖸: ${senderName} `,
        threadID,
        messageID
      );

      api.sendMessage(
        {
          body: `➤ 𝖲𝖧𝖠𝖱𝖤 𝖥𝖨𝖫𝖤𝖲\n\n𝖳𝖨𝖬𝖤: ${hmm}\n𝖥𝖨𝖫𝖤 𝖫𝖨𝖭𝖪: ${link}\n𝖭𝖠𝖬𝖤 𝖮𝖥 𝖥𝖨𝖫𝖤: ${args[0]}\n𝖦𝖯 𝖭𝖠𝖬𝖤: ${groupName}\n𝖲𝖧𝖠𝖱𝖤𝖣 𝖡𝖸: ${senderName}`,
          attachment: picture
        },
        uid
      );
    }
  );
};