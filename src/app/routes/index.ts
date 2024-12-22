import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth_route";
import { BlogRoutes } from "../modules/blogs/blog_route";
import { AdminRoutes } from "../modules/admin/admin_routes";
import { UserRoutes } from "../modules/User/user_route";


const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/blogs',
        route: BlogRoutes,
    },
    {
        path: '/admin',
        route: AdminRoutes,
    },
    {
        path: '/users',
        route: UserRoutes,
    }
];


moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;