const http = require('http');
const app = require('./app');
 const port = process.env.PORT || 8000;

// create a server
const server = http.createServer(app);

// listen on port 3000
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
