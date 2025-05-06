const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

const INSTAGRAM_USER_ID = '17841471644257761';
const ACCESS_TOKEN = 'EAAQ7E2Nx5YQBO8fU7OC5RT8O0rdqu3dQ2xR05K7btT9XeRmRFhXUM3ibht3xYE4pfmBTZBu83jPqwYigUilYr1lTkocesancE39q6IJRQJhvGBVYjZAOe3gZCr6wi4JDwAhgoaZBJ1KZAH1DfAwB9XJzi4UFAzRsC1YYLseNbRg7vdySmC8DvX16ZB';


app.get('/instagram', async (req, res) => {
  try {
    const url = `https://graph.facebook.com/v19.0/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_url,timestamp,permalink&access_token=${ACCESS_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();

    console.log('📦 API response:', data);
    res.json(data);
  } catch (error) {
    console.error('❌ Fout in fetch:', error);
    res.status(500).json({ error: 'Fout bij ophalen van Instagram-data.' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server draait op http://localhost:${PORT}/instagram`);
});
