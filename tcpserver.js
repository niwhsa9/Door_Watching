const net = require('net');


var server = net.createServer(function(socket) {
	socket.write("Connected"); 
	socket.on('data', function(data) {
		
		console.log(parseInt(data.toString()));
		//socket.write("hi");
	});
});

server.listen(4501, '10.0.0.8');

