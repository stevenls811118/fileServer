const net = require('net');
const fs = require('fs');

const server = net.createServer();
let filename = "";
let filePath = "./testFileFolder/";
let files = fs.readdirSync(filePath);
let content = "";
let sendFile = "";
console.log(files);

server.listen(3000, () => {
  console.log('File server is up and listening to port 3000');
});

server.on('connection', (connection) => {
  console.log('Someone connected');
  connection.write('Welcome to the fileServer, please enter the file name in the form "filename: filename"');
  connection.setEncoding('utf8');
  
  connection.on('data', (data) => {
    if (!data.includes('filename:')) {
      console.log(data);
    };
    
    if (data.startsWith('filename:')) {
      filename = data.split(" ")[1];
      console.log(`Client looks for ${filename}, searching file`);
      if (files.includes(filename)) {
        
        fs.readFile(`${filePath + filename}`, 'utf8', (err, filedata) => {
          if (err) {
            console.log(err);
          }
          connection.write(`Sending file: `+ filename + " " + filedata);
          console.log(`${filename} transferred`);
        });
      } else {
        connection.write(`No such file`);
      }
    }
  });
});