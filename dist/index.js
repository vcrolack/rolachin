"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const variables_environment_1 = require("./config/environment/variables.environment");
const discord_js_1 = require("discord.js");
const config_json_1 = require("./config.json");
const options = { intents: [discord_js_1.IntentsBitField.Flags.Guilds, discord_js_1.IntentsBitField.Flags.GuildMessages] };
const client = new discord_js_1.Client(options);
console.log(variables_environment_1.envs.discordToken);
client.login(variables_environment_1.envs.discordToken);
client.once("ready", () => console.log('Bot ready to use'));
client.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(message.content);
    if (message.content.startsWith(`${config_json_1.prefix}ping`)) {
        message.channel.send("🚀 pong");
        // message.reply('pong!');
    }
}));
