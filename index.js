require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const usersRoutes = require('./routes/usersRoutes');
const tickettypeRoutes = require('./routes/tickettypeRoutes');
const matchRoutes = require('./routes/matchRoutes');
const siteconfigRoutes = require('./routes/siteconfigRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS options
const corsOptions = {
  origin: '*', // If you want any URL then use '*'
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

// Use CORS middleware with options
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/api/users', usersRoutes);
app.use('/api/tickettype', tickettypeRoutes);
app.use('/api/siteconfig', siteconfigRoutes);
app.use('/api/match', matchRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});