import express from 'express';
import bodyParser from 'body-parser';
const msgpack: any = require('msgpack-lite');
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 3000;


app.use(cors());

app.use((req, res, next) => {
  const contentType = req.headers['content-type'];
  if (contentType === 'application/x-msgpack') {
    const chunks: Buffer[] = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      try {
        const buffer = Buffer.concat(chunks);
        (req as any).body = msgpack.decode(buffer);
        next();
      } catch (err) {
        res.status(400).send('Invalid msgpack');
      }
    });
  } else {
    bodyParser.json()(req, res, next);
  }
});

app.post('/predict', (req, res) => {
  const { requestId } = req.body;

  const response = {
    requestId: requestId || uuidv4(),
    time: {
      preprocess: Number((Math.random() * 0.1).toFixed(3)),
      inference: Number((Math.random() * 0.2).toFixed(3)),
      postprocess: Number((Math.random() * 0.05).toFixed(3)),
    },
    objectCount: 1,
    objects: [
      {
        id: [1],
        text: 'A123BC77',
        rect: [512, 384, 120, 40],
        confidence: 0.95,
      },
    ],
  };

  const accept = req.headers['accept'];
  if (accept === 'application/x-msgpack') {
    const buffer = msgpack.encode(response);
    res.setHeader('Content-Type', 'application/x-msgpack');
    res.send(buffer);
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.json(response);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
