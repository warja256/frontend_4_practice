const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8081 });

const messages = [];

wss.on('connection', (ws) => {
  console.log('Новое соединение');

  ws.send(JSON.stringify({ type: 'history', data: messages }));

  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    messages.push(parsedMessage);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'message', data: parsedMessage }));
      }
    });
  });
});