const net = require('net');
const fs = require('fs');

const config = {
  host: 'localhost',
  port: 3000
};
const filePath = "./downloads/";
let filename = ""
const conn = net.createConnection(config);

conn.setEncoding('utf-8');

conn.on('connect', () => {
  console.log('Connected to the fileServer');
});

conn.on('data', (data) => {
  if (!data.startsWith('Sending file: ')) {
    console.log(data);
  } else {
    filename = String(data).split(' ')[2];
    
    fs.writeFile(filePath + filename, String(data).split(' ').slice(3).join(' '), err => {
      if (err) {
        console.error(err);
      }
    console.log(`${filename} is saved to ${filePath}`)
    // file written successfully
    //process.exit();
    });
  }
});

process.stdin.on('data', (message) => {
  conn.write(String(message).trim());
})