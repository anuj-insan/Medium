import { Hono } from 'hono'
import { authMiddleware } from './middlewares/auth';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  },
  variables: {
    userId: string
  }
}>()

// Middlewares
app.use('/*', cors());
app.use('/api/v1/blog/*', authMiddleware);

// Routes
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

export default app
