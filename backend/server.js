const express = require('express');
const cors = require('cors');
const parseRoute = require('./routes/parse');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Text2CAD NLP Parser API is running!' });
});

// Parse route
app.use('/api/parse', parseRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});