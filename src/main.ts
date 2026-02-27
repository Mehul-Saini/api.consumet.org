import fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';

import animeRouter from './routes/anime';
import mangaRouter from './routes/manga';
import booksRouter from './routes/books';
import comicsRouter from './routes/comics';
import metaRouter from './routes/meta';
import lightNovelsRouter from './routes/light-novels';
import newsRouter from './routes/news';

const PORT = parseInt(process.env.PORT || '3000', 10);

const start = async (): Promise<void> => {
  const app = fastify({
    maxParamLength: 1000,
    logger: true,
  });

  // ✅ CORS — allow all origins so Cloudflare Pages can call this API
  await app.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: false,
  });

  await app.register(helmet, {
    contentSecurityPolicy: false,
  });

  app.get('/', async (_, reply) => {
    reply.status(200).send({ message: 'Welcome to consumet api! 🎉' });
  });

  await app.register(animeRouter, { prefix: '/anime' });
  await app.register(mangaRouter, { prefix: '/manga' });
  await app.register(booksRouter, { prefix: '/books' });
  await app.register(comicsRouter, { prefix: '/comics' });
  await app.register(metaRouter, { prefix: '/meta' });
  await app.register(lightNovelsRouter, { prefix: '/light-novels' });
  await app.register(newsRouter, { prefix: '/news' });

  try {
    const address = await app.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Starting server on port ${PORT}... 🚀`);
    console.log(`server listening on ${address}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
