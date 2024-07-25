import { Context } from "hono";
import { verify } from "hono/jwt";


const authMiddleware = async (c: Context, next: any) => {
    const header = c.req.header("Authorization") || "";
    // Extract the token from the Authorization header
    const token = header.replace(/^Bearer\s+/, "");

    const user = await verify(token, c.env.JWT_SECRET);
    
    if(user.id) {
        c.set("userId", user.id);
        await next();
    } else {
        return c.json({error: "unauthorised"}, 403);
    }
}

export { authMiddleware }