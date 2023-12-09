
export default async (req, res) => {
    const wd = req.query.wd
    try {
      const url = `https://kaifa.baidu.com/rest/v1/search?wd=${wd}`;
      const proxyRes = await fetch(url);
      const data = await proxyRes.json();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to proxy request' }); 
    }
  }