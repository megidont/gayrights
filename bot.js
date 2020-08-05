var Discord = require('discord.js');
var auth = require('./auth.json');

var bot = new Discord.Client();

var forbidden = require('./forbidden.json');

bot.once('ready', function(evt){

	console.log("Connected as " + bot.user.username + " (" + bot.user.id + ")");

});

bot.on('message', function(message){

	if(message.author.bot == false){

		var mess = message.content.toLowerCase();

		var hasquotes = mess.match(/\"[^\"]+rights[^\"]*\"/gi) != null? mess.match(/\"[^\"]+rights[^\"]*\"/gi) : false;

		if(hasquotes){

			for(var i = 0; i < hasquotes.length; i++){

				var end = hasquotes[i].lastIndexOf("rights") + 6;

				hasquotes[i] = hasquotes[i].substring(1, end);
				hasquotes[i] = hasquotes[i].replace(/[^a-zA-Z0-9\s:\-\'\<\>\#\@]/gi, "");

				if(!forbidden.includes(hasquotes[i] + "!")){

					message.channel.send(hasquotes[i] + "!");

				}

			}

		}else{

			var fullmessage = false;

			var outmessage = [];

			if(message.content.charAt(0) == '\\'){

				fullmessage = true;

			}

			var words = mess.split(/\W+/g);
			if(words){

				var messageCount = words.length > 3? 3 : words.length;

				for(var i = 0; i < messageCount; i++){

					if(words[i].replace(/\W/gi, "") == "rights"){

						if(i == 0){

							outmessage.push("rights");

						}else if(fullmessage){

							var tempmsg = "";

							for(var j = 0; j < i; j++){

								tempmsg += words[j] + " ";

							}

							outmessage.push(tempmsg.substring(1,tempmsg.length) + "rights");

						}else{

							outmessage.push(words[i-1] + " rights");

						}

					}

				}


				if(outmessage){

					for(var i = 0; i < outmessage.length; i++){

						outmessage[i] = outmessage[i].replace(/[^a-zA-Z0-9\s:\-\'\<\>\#\@]/gi, "");

						var containsNaughty = false;

						for(x in forbidden.words){

							if(outmessage[i].includes(forbidden.words[x])){ containsNaughty = true;}

						}

						if(!containsNaughty){

							message.channel.send(outmessage[i] + "!");

						}

					}

				}

			}

		}

		if(message.isMentioned(bot.user)){

			message.channel.send("©2020 Megidon't (<@286788803975315466>). To add, please click: https://discordapp.com/oauth2/authorize?client_id=597262472994357268&scope=bot&permissions=3072");

		}

	}

	bot.user.setActivity(bot.guilds.size + " servers!", {type: "Watching" });

});

bot.login(auth.token);
