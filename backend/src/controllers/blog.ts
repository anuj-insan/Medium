import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Context } from 'hono';
import { createPostInput, updatePostInput } from '@anuj_insan/common';

const handleCreateBlog = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const userId = await c.get('userId');
        const body = await c.req.json<{ title: string, content: string }>();

        const { success } = createPostInput.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({ error: "invalid input" });
        }

        
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId,
            }
        })

        return c.json({id: post.id}, 200)
    } catch(e) {
        return c.json({msg: "error while creating blog"}, 403);
    } finally {
        await prisma.$disconnect();
    }
}

const handleUpdateBlog = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const userId = await c.get('userId');
        const body = await c.req.json<{ id: string, title: string, content: string }>();

        const { success } = updatePostInput.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({ error: "invalid input" });
        }

        prisma.post.update({
            where: {
                id: body.id,
                authorId: userId
            },
            data: {
                title: body.title,
                content: body.content
            }
        });

        return c.text('updated post');
    } catch(e) {
        return c.text('error while updating post');
    } finally {
        await prisma.$disconnect();
    }
}

const handleShowSpecificBlog = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const id = c.req.param('id');

        const post = await prisma.post.findUnique({
            where: {
                id
            },
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true,
                    }
                }
            }
        });
        
        return c.json({blog: post});
    } catch(e) {
        return c.json({msg: "error while showing blog"}, 403);
    } finally {
        await prisma.$disconnect();
    }
}

const handleShowAllBlogs = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const posts = await prisma.post.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true,
                    }
                }
            }
        });

        return c.json({blogs: posts});
    } catch(e) {
        return c.json({msg: "error while showing blogs"}, 403);
    } finally {
        await prisma.$disconnect();
    }
}

export {
    handleCreateBlog,
    handleUpdateBlog,
    handleShowSpecificBlog,
    handleShowAllBlogs,
}