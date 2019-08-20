var Discord = require('discord.js');
var auth = require('./auth.json');

var bot = new Discord.Client();

bot.once('ready', function(evt){

	console.log("Connected as " + bot.user.username + " (" + bot.user.id + ")");

	bot.user.setActivity("for * rights.", {type: "Watching" });

});

bot.on('message', function(message){

	if(message.author.id != bot.user.id){

		var mess = message.content.toLowerCase();

		var hasquotes = mess.match(/\"[^\"]+rights[^\"]*\"/gi) != null? mess.match(/\"[^\"]+rights[^\"]*\"/gi) : false;

		if(hasquotes){

			for(var i = 0; i < hasquotes.length; i++){

				var end = hasquotes[i].lastIndexOf("rights") + 6;

				hasquotes[i] = hasquotes[i].substring(1, end);
				hasquotes[i] = hasquotes[i].replace(/[^a-zA-Z0-9\s:\-\'\<\>\#\@]/gi, "");

				message.channel.send(hasquotes[i] + "!");

			}

		}else{

			var fullmessage = false;

			var outmessage = [];

			if(message.content.charAt(0) == '\\'){

				fullmessage = true;

			}

			var words = mess.split(/\s/g);
			if(words){

				for(var i = 0; i < words.length; i++){

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

						message.channel.send(outmessage[i] + "!");

					}

				}

			}

		}

	}

});

bot.login(auth.token);
