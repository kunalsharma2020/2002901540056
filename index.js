const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 8008;

// Middleware to parse query parameters
app.use(express.urlencoded({ extended: true }));

app.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls) {
    return res.status(400).json({ error: 'No URLs provided in the query parameters.' });
  }

  try {
    const promises = urls.map(async (url) => {
      try {
        const response = await axios.get(url);
        return response.data.numbers;
      } catch (error) {
        return null; // Ignore the URL if there was an error fetching data
      }
    });

    const responses = await Promise.allSettled(promises);
    const validResponses = responses
      .filter((response) => response.status === 'fulfilled' && response.value)
      .map((response) => response.value);

    const mergedNumbers = validResponses.flat().filter((number, index, arr) => arr.indexOf(number) === index);
    mergedNumbers.sort((a, b) => a - b);

    return res.json({ numbers: mergedNumbers });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
