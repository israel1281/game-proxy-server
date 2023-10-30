const dgram = require('dgram');

// Create a UDP server to listen for client datagrams
const clientServer = dgram.createSocket('udp4');

// Create a UDP server to listen for server datagrams
const serverServer = dgram.createSocket('udp4');

// Define the client and server addresses
const clientAddress = '10.215.0.0'; // Listen on an address starting with "10.215"
const serverAddress = '148.153.0.0'; // Use an address starting with "148.153"

// Define port ranges
const clientPortRange = [10000, 80000];
const serverPortRange = [10010, 10015];

// Function to find an available port within the given range
function findAvailablePort(server, address, portRange, callback) {
  for (let port = portRange[0]; port <= portRange[1]; port++) {
    server.bind(port, address, (err) => {
      if (!err) {
        callback(port);
      }
    });
  }
}

// Find an available client port
findAvailablePort(clientServer, clientAddress, clientPortRange, (clientPort) => {
  console.log(`Client server listening on ${clientAddress}:${clientPort}`);
});

// Find an available server port
findAvailablePort(serverServer, serverAddress, serverPortRange, (serverPort) => {
  console.log(`Server server listening on ${serverAddress}:${serverPort}`);
});

// Handle incoming datagrams from the client
clientServer.on('message', (clientMessage, clientInfo) => {
  // Forward the client's datagram to the server
  serverServer.send(clientMessage, serverPort, serverAddress);

  console.log(`Forwarded data from client to server: ${clientMessage.toString()}`);
});

// Handle incoming datagrams from the server
serverServer.on('message', (serverMessage, serverInfo) => {
  // Forward the server's response to the client
  clientServer.send(serverMessage, clientPort, clientAddress);

  console.log(`Forwarded data from server to client: ${serverMessage.toString()}`);
});
