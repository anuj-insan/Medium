import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { hashPassword, verifyPassword } from '../services/hashPassword';
import { Context } from 'hono';
import { sign } from 'hono/jwt';
import { signinInput, signupInput } from '@anuj_insan/common';

const handleSignup = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json<{ email: string; name: string; password: string }>();

    const { success } = signupInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}

    try {
        const hashedPassword = await hashPassword(body.password, c.env.SALT)

        const user = await prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
                password: hashedPassword,
            }
        });

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({jwt: token}, 200);
    } catch(e) {
        console.error('Signup Error:', e);
        return c.json({error: "error while signing up"}, 403);
    } finally {
        await prisma.$disconnect();
    }
}

const handleSignin = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json<{ email: string; password: string }>();

    const { success } = signinInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}

    try{
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            }
        });

        if(!user) {
            return c.json({ error: "user not found" }, 403);
        }

        const valid = await verifyPassword(body.password, user.password, c.env.SALT);
        if(!valid) {
            return c.json({ error: "invalid credentials" }, 403);
        }

        const token = await sign({id: user.id}, c.env.JWT_SECRET);
        return c.json({jwt: token}, 200);
    } catch(e) {
        c.json({msg: "Internal Server Error"}, 500);
    } finally {
        await prisma.$disconnect();
    }
}

export { handleSignup, handleSignin };