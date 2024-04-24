module.exports.config = {
  name: "userinfo",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Arjhil",
  description: "Get User Information.",
  commandCategory: "other",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  let { threadID, senderID, messageID } = event;

  const getUserInfo = async (targetID) => {
    try {
      const threadInfo = await api.getThreadInfo(threadID);
      const userInfo = await api.getUserInfo(targetID);

      const userName = userInfo[targetID].name || "Name not available";
      const uid = targetID;
      const gender = userInfo[targetID].gender || "Gender not available";
      const birthday = userInfo[targetID].birthday || "Birthday not available";

      // Construct Facebook profile link
      const fbLink = `https://www.facebook.com/profile.php?id=${uid}`;

      // Get profile picture URL
      const profilePicURL = userInfo[targetID].profileUrl || "";

      // Get user status (online, offline, idle)
      const userStatus = userInfo[targetID].isOnline ? "Online" : "Offline";

      // Check friendship status (friends or not)
      const areFriends = userInfo[targetID].isFriend ? "Yes" : "No";

      // Additional social media links (if available)
      const socialMediaLinks = userInfo[targetID].socialMediaLinks || "No additional social media links available";

      const userInfoMessage = `
🌟 𝕦𝕤𝕖𝕣 𝕚𝕟𝕗𝕠𝕣𝕞𝕒𝕥𝕚𝕠𝕟 🌟

📝 ℕ𝕒𝕞𝕖: ${userName}
🆔 𝕌𝕀𝔻: ${uid}
👤 𝔾𝕖𝕟𝕕𝕖𝕣: ${gender}
🎂 𝔹𝕚𝕣𝕥𝕙𝕕𝕒𝕪: ${birthday}
📊 𝕊𝕥𝕒𝕥𝕦𝕤: ${userStatus}
🤝 𝔽𝕣𝕚𝕖𝕟𝕕𝕤: ${areFriends}
🌐 𝔽𝕒𝕔𝕖𝕓𝕠𝕠𝕜 𝕃𝕚𝕟𝕜: ${fbLink}

🖼️ ℙ𝕣𝕠𝕗𝕚𝕝𝕖 𝕊𝕚𝕔𝕥𝕦𝕣𝕖: ${profilePicURL}

🔗 𝓐𝓭𝓭𝓲𝓽𝓲𝓸𝓷𝓪𝓵 𝓢𝓸𝓬𝓲𝓪𝓵 𝓜𝓮𝓭𝓲𝓪 𝓛𝓲𝓷𝓴𝓼:
${socialMediaLinks}
      `;

      api.sendMessage(userInfoMessage, threadID, (error, info) => {
        if (!error) {
          api.sendTypingIndicator(threadID);
        }
      });
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while fetching user information.", threadID, messageID);
    }
  };

  if (!args[0]) {
    // If no UID is provided, use the sender's UID
    getUserInfo(senderID);
  } else if (args[0].indexOf("@") !== -1) {
    // If the message mentions a user, extract UID from mentions
    const mentionedUID = Object.keys(event.mentions)[0];
    if (mentionedUID) {
      getUserInfo(mentionedUID);
    }
  } else {
    api.sendMessage("Invalid command usage. Use `userinfo` or `userinfo @mention`.", threadID, messageID);
  }
};
