const fs = require('fs');
const axios = require('axios');
const moment = require('moment-timezone');
const { createReadStream, unlinkSync } = global.nodemodule['fs-extra'];
const { resolve } = global.nodemodule['path'];

module.exports.config = {
  name: 'announce',
  version: '1.0.0',
  hasPermission: 0,
  credits: 'Arjhil',
  description: 'Announce a message with optional audio',
  commandCategory: 'Admin',
  usage: '[Language Code] [Text]',
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args, getText, Users }) => {

const adminIDs = ['100040253298048', 'ADMIN_ID_2'];

    if (!adminIDs.includes(event.senderID)) {
        api.sendMessage("‼️ 𝖠𝗋𝖾 𝗒𝗈𝗎 Arjhil? 𝖮𝖿𝖼𝗈𝗎𝗋𝗌𝖾 𝗇𝗈𝗍 𝖿𝗎𝖼𝗄𝗒𝗈𝗎 𝖻𝗂𝗍𝖼𝗁 𝗀𝖾𝗍 𝗅𝗈𝗌𝗍", event.threadID);
        return;
    }

  const name = await Users.getNameUser(event.senderID);
  const currentTime = moment.tz('Asia/Manila').format('DD/MM/YYYY || HH:mm:ss');

  if (args.length < 2) {
    return api.sendMessage('Usage: [Language Code] [Text]', event.threadID, event.messageID);
  }

  const languageCode = args[0].toLowerCase();
  const content = args.slice(1).join(' ');

  const languageToSay = getLanguageFromCode(languageCode);

  if (!languageToSay) {
    return api.sendMessage('Invalid language code. Supported codes: ru/en/ko/ja/tl', event.threadID, event.messageID);
  }

  const header = '❰❰ 𝗔𝗡𝗡𝗢𝗨𝗡𝗖𝗘𝗠𝗘𝗡𝗧 ❱❱\n\n'; // Bold header text

  try {
    const allThread = global.data.allThreadID || [];
    const cantSend = [];

    for (const idThread of allThread) {
      if (isNaN(parseInt(idThread)) || idThread == event.threadID) continue;

      const audioPath = await generateAudio(content, languageToSay);

      const messageOptions = {
        body: `${header}${content}\n\n❰❰ 𝐅𝐑𝐎𝐌 𝐀𝐃𝐌𝐈𝐍 ❱❱: ${name.toUpperCase()}`, // Uppercase name
        attachment: createReadStream(audioPath),
      };

      api.sendMessage(messageOptions, idThread, (error) => {
        if (error) cantSend.push(idThread);
      });

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    return api.sendMessage(
      getText('sendSuccess', allThread.length - 1), // Exclude the current thread
      event.threadID,
      () => (cantSend.length > 0)
        ? api.sendMessage(getText('sendFail', cantSend.length), event.threadID, event.messageID)
        : '',
      event.messageID
    );
  } catch (error) {
    console.error('Error sending announcement:', error);
    return api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};

// Function to generate audio and return the path
async function generateAudio(text, language) {
  const msg = text.trim();
  const path = resolve(__dirname, 'cache', `${language}.mp3`);
  await global.utils.downloadFile(
    `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
      msg
    )}&tl=${language}&client=tw-ob`,
    path
  );
  return path;
}

// Function to map language codes to language names
function getLanguageFromCode(code) {
  const languageMap = {
    ru: 'ru',
    en: 'en',
    ko: 'ko',
    ja: 'ja',
    tl: 'tl',
  };
  return languageMap[code];
        }