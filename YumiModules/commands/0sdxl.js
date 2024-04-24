module.exports.config = {
  name: "sdxl",
  version: "30.0.0",
  hasPermssion: 0,
  credits: "arjhil",
  description: "Generate image AI",
  usePrefix: true,
  usages: "sdxl [text]",
  commandCategory: "...",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const axios = global.nodemodule["axios"];
  try {
    let text = args.join(" ");
    const prompt = text.substr(0, text.indexOf(' | '));
    const model = text.split(" | ").pop();

    if (!prompt || !model) {
      return api.sendMessage('Please provide a prompt and a model.', event.threadID);
    }

    const encodedPrompt = encodeURIComponent(prompt);
    const providedURL = `https://arjhil-prodia-api.arjhilbard.repl.co/sdxl/generate?prompt=${encodedPrompt}&model=${model}`;
    
    const response = await axios.get(providedURL, { responseType: 'stream' });
    
    api.sendMessage({
      attachment: response.data,
    }, event.threadID);
  } catch (error) {
    console.error(error);
    api.sendMessage('An error occurred while processing the sdxl command.', event.threadID);
  }
};