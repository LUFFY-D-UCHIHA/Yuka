const axios = require("axios");

module.exports.config = {
    name: "teach",
    version: "1.0.0",
    hasPermission: 0,
    credits: "Hazeyy",
    description: "( Teach Sim )",
    commandCategory: "tutor",
    usages: "( Teach Simsimi any kinds of words )",
    cooldowns: 2
};

module.exports.handleEvent = async function ({ api, event }) {
    const messageContent = event.body.toLowerCase();

    if (messageContent.startsWith("teach")) {
        const args = messageContent.split(/\s+/);
        args.shift(); 

        if (args.length === 0) {
            api.sendMessage("Please provide a message to teach SimSimi.", event.threadID);
            return;
        }

        const text = args.join(" ");
        const data = text.split(">");
        
        if (data.length !== 2) {
            api.sendMessage(
                `Invalid format. Please use: teach question > answer`,
                event.threadID
            );
            return;
        }

        const ask = data[0]?.trim();
        const answer = data[1]?.trim();

        if (!ask || !answer) {
            api.sendMessage(
                `Invalid format. Please use: teach question > answer`,
                event.threadID
            );
            return;
        }

        const apiUrl = "https://arjhil-sim.arjhilbard.repl.co/teach";

        try {
            const response = await axios.post(apiUrl, {
                question: ask,
                answer: answer,
            });

            if (response.status === 200) {
                api.sendMessage("SimSimi has been taught successfully!", event.threadID);
            } else {
                api.sendMessage("Error teaching SimSimi. Please try again later.", event.threadID);
            }
        } catch (error) {
            console.error(error);
            api.sendMessage("An error occurred while teaching SimSimi.", event.threadID);
        }
    }
};

module.exports.run = async function ({ api, event }) {
    // Add kung ano gusto mong idagdag pre -Hazeyy
};