const dgram = require('dgram');

// Create a UDP server to listen for client datagrams
const clientServer = dgram.createSocket('udp4');

// Create a UDP server to listen for server datagrams
const serverServer = dgram.createSocket('udp4');

// Define the client and server addresses and ports
const clientAddress = '0.0.0.0'; // Listen on an address starting with "10.215"
const clientPort = 37329; // Replace with your desired client port

// const serverAddress = '148.153.0.0'; // Use an address starting with "148.153"
// const serverPort = 10016; // Replace with your server's port

// Bind the client server to the specified address and port
clientServer.bind(clientPort, clientAddress, () => {
  console.log(`Client server listening on ${clientAddress}:${clientPort}`);
});

// Bind the server server to the specified address and port
// serverServer.bind(serverPort, serverAddress, () => {
//   console.log(`Server server listening on ${serverAddress}:${serverPort}`);
// });

// Handle incoming datagrams from the client
clientServer.on('message', (clientMessage, clientInfo) => {
  // Forward the client's datagram to the server
  serverServer.send(clientMessage, serverPort, serverAddress);

  console.log(`Forwarded data from client to server: ${clientMessage.toString()}`);
});

// Handle incoming datagrams from the server
// serverServer.on('message', (serverMessage, serverInfo) => {
//   // Forward the server's response to the client
//   clientServer.send(serverMessage, clientPort, clientAddress);

//   console.log(`Forwarded data from server to client: ${serverMessage.toString()}`);
// });
