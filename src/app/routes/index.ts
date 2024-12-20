import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth_route";
import { BlogRoutes } from "../modules/blogs/blog_route";


const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/blogs',
        route: BlogRoutes,
    }
];


moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;