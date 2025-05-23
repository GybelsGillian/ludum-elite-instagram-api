const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

const INSTAGRAM_USER_ID = '17841471644257761';
const ACCESS_TOKEN = `EAAQ7E2Nx5YQBO7Dk7SCPVK7frW4v6cVH6IYDwj4k1X6e3IoFwoukgcA0IaDZBxf94aaqPgpbmZCO0ZBnKOqNJvQUIQ4jGnPiVOPH7eHrvoicqkzHUSpTg8u0BT8XstMbREKOZA3IpMhiwXREbB61nygSMTXbj8ZA6XBeeKBzifMEkb6Bs5L9NlDZA3
`;
const CACHE_FILE = 'instagram-cache.json';

app.get('/instagram', async (req, res) => {
  try {
    const url = `https://graph.facebook.com/v19.0/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_url,timestamp,permalink&access_token=${ACCESS_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data && Array.isArray(data.data) && data.data.length > 0) {
      // 🔄 Voor elke post: extra likes/comments ophalen
      const detailedPosts = await Promise.all(
        data.data.map(async (post) => {
          const detailsUrl = `https://graph.facebook.com/v19.0/${post.id}?fields=id,caption,media_url,permalink,timestamp,like_count,comments_count&access_token=${ACCESS_TOKEN}`;
          const detailRes = await fetch(detailsUrl);
          return await detailRes.json();
        })
      );

      // ✅ Opslaan in cache
      fs.writeFileSync(CACHE_FILE, JSON.stringify({ data: detailedPosts }, null, 2));
      console.log('✅ Postdata met likes/comments opgeslagen in cache.');
      return res.json({ data: detailedPosts });
    } else {
      throw new Error('Lege of ongeldige data');
    }
  } catch (err) {
    console.warn('⚠️ Fout in live fetch:', err);
    if (fs.existsSync(CACHE_FILE)) {
      const cached = fs.readFileSync(CACHE_FILE, 'utf8');
      return res.json(JSON.parse(cached));
    } else {
      return res.status(500).json({ error: 'Geen data beschikbaar.' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server draait op http://localhost:${PORT}/instagram`);
});
