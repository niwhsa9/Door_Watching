const Discord = require("discord.js");
const net = require('net');

const bot = new Discord.Client();
const channel = "525501008210690063";
const port = 4500;
const serverIP = '10.0.0.8';
const socketTimeout = 3000;
const checkInterval = 200;

var buttonState = 1;
var clientIP = "No client connected";
var lastContact = 0;

//TODO, bot needs to mention

function sendToMain(str) {
	bot.channels.forEach(function(item) {
		if(item.id == channel) {
			//item.send(str)
			item.send({ embed: {
				color: 3447003,
				description: str
			}});
		}
	});
}

var server = net.createServer(function(socket) {
	socket.write("Connected"); 
	if(clientIP == "No client connected") {
		clientIP = socket.remoteAddress;
		sendToMain("Connected to ESP8266 with ip: " + clientIP + " on " + port);
	}
	
	
	socket.on('data', function(data) {
		lastContact = Date.now();
		buttonState = parseInt(data.toString());
		console.log(parseInt(buttonState));
		if(buttonState == 0) sendToMain("Button engaged, door opened");
	});
	
	socket.on('close', function(data) {
		
		
	}); 
});

bot.on("ready", ()=>{console.log("Alive");});
bot.on("message", (message)=>{
	if(message.content == ">>ping") message.channel.send("Ping " + bot.ping + " | Uptime " + bot.uptime);	
	if(message.content == ">>status-client") message.channel.send(clientIP);
	if(message.content == ">>status-button") message.channel.send("Button state: " + buttonState);
	
});

bot.login("NTI1NTAxNTM1NDY4MTI2MjQ5.Dv3j0A.PH9aZJHKbZupkaAbTqe3CP1yCCs");
server.listen(port, serverIP);

setInterval(function() {
	if(Date.now() - lastContact >= socketTimeout && clientIP != "No client connected") {
		sendToMain("Warning: Lost contact with ESP8266");
		clientIP = "No client connected";
	}
}, checkInterval);