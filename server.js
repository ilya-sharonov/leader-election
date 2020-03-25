const express = require('express');

const app = express();

app.use(express.static('public'));

app.listen(3344, () => console.log('Listening on 3344'));
