const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5500;

const app = express();
const airoutes = require('./routes/openaiRoutes')

app.use('/openai', airoutes)

app.listen(port, () => console.log(`Server started on port ${port}`));
 