const axios = require("axios");

let autoReplyEnabled = true; 

module.exports.config = {
    name: "sim",
    version: "1.0.0",
    hasPermission: 0,
    credits: "Arjhil",
    description: "( Talk with Simsimi )",
    commandCategory: "fun",
    usages: "( Chat with AI Bot )",
    cooldowns: 2
};

module.exports.handleEvent = async function ({ api, event }) {
    if (!autoReplyEnabled) return; // Check if auto-reply is enabled

    if (!(event.body.indexOf("sim") === 0 || event.body.indexOf("Sim") === 0)) return;

    const args = event.body.split(/\s+/);
    args.shift();
    const userMessage = args.join(" ");

    const apiUrl = "https://arjhil-sim.arjhilbard.repl.co/ask";

    try {
        const response = await axios.get(apiUrl, { params: { message: userMessage } });

        if (response.status === 200) {
            const simsimiResponse = response.data.response;
            api.sendMessage(simsimiResponse, event.threadID);
        } else {
            api.sendMessage("Error communicating with SimSimi API.", event.threadID);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while fetching data from SimSimi.", event.threadID);
    }
};

module.exports.run = async function ({ api, event, args }) {
    if (args[0] === "on") {
        autoReplyEnabled = true;
        api.sendMessage("Auto-reply is now enabled.", event.threadID);
    } else if (args[0] === "off") {
        autoReplyEnabled = false;
        api.sendMessage("Auto-reply is now disabled.", event.threadID);
    } else {
        api.sendMessage("Invalid usage. Use '!sim on' to enable and '!sim off' to disable auto-reply.", event.threadID);
    }
};