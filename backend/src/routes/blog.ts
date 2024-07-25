import { Hono } from "hono";
import { handleCreateBlog, handleUpdateBlog, handleShowSpecificBlog, handleShowAllBlogs } from "../controllers/blog";
const blogRouter = new Hono();

blogRouter.post('/', handleCreateBlog);
blogRouter.put('/', handleUpdateBlog);
blogRouter.get('/bulk', handleShowAllBlogs);
blogRouter.get('/:id', handleShowSpecificBlog);

export { blogRouter };