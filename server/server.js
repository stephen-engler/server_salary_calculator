let express = require('express');

let app = express();

const PORT = 8080;

app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('server is listening on port 8080');
});