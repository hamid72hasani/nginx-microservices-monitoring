const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', true);

// Public API router
const publicRouter = express.Router();

publicRouter.get('/', (req, res) => {
  res.send('Hello from public root');
});

publicRouter.get('/test', (req, res) => {
  res.send('Public test OK');
});

// Register router
app.use('/api/public', publicRouter);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running at http://0.0.0.0:${PORT}`);
});

