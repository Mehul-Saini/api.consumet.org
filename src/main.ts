import fastify from 'fastify';
import FastifyCors from '@fastify/cors';

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

  // ✅ Allow all origins so Cloudflare Pages can access this API
  await app.register(FastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });

  app.get('/', async (request, reply) => {
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
    await app.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Starting server on port ${PORT}... 🚀`);
    console.log(`server listening on http://0.0.0.0:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
