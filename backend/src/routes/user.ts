import { Hono } from "hono";
import { handleSignup, handleSignin } from "../controllers/user";
const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
        SALT_ROUNDS: number,
    }
}>();

userRouter.post('/signup', handleSignup);

userRouter.post('/signin', handleSignin);

export { userRouter };