import { createRouter, createWebHistory } from "vue-router";

import { useLogin } from "@/composables/user/useLogin";
import { useUser } from "@/composables/user/useUser";
import { userStore } from "@/store/userStore";
import Dashboard from "@/views/Dashboard.vue";
import Forms from "@/views/Forms.vue";
import Tables from "@/views/Tables.vue";
import UIElements from "@/views/UIElements.vue";
import Login from "@/views/Login.vue";
import Modal from "@/views/Modal.vue";
import Card from "@/views/Card.vue";
import Blank from "@/views/Blank.vue";
import Profile from "@/views/profile/Profile.vue";
import NotFound from "@/views/not_found/NotFound.vue";

const routes = [
    {
        path: "/",
        name: "Login",
        component: Login,
        meta: { layout: "empty" },
        beforeEnter: (to, from, next) => {
            const { getCookie } = useLogin();
            const token = getCookie("access_token");
            if (token) {
                next({ name: "Dashboard" });
            } else {
                next();
            }
        },
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { isAuth: true, role: "Admin" },
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile,
    },
    {
        path: "/forms",
        name: "Forms",
        component: Forms,
    },
    {
        path: "/cards",
        name: "Cards",
        component: Card,
    },
    {
        path: "/tables",
        name: "Tables",
        component: Tables,
    },
    {
        path: "/ui-elements",
        name: "UIElements",
        component: UIElements,
    },
    {
        path: "/modal",
        name: "Modal",
        component: Modal,
    },
    {
        path: "/blank",
        name: "Blank",
        component: Blank,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound,
        meta: { layout: "empty" },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.meta.isAuth;
    const requiredRoles = to.meta.role;

    const { getCookie } = useLogin();
    const { getUserRole } = useUser();
    const user = userStore();
    const token = getCookie("access_token");
    // Check if the route requires authentication
    if (requiresAuth) {
        if (token && !user.userRole) {
            getUserRole(token)
                .then((res) => {
                    user.userRole = res.data;
                    if (requiredRoles != res.data) {
                        next({ name: "NotFound" }); // Redirect to a not found page or appropriate route
                        return;
                    } else {
                        next();
                    }
                })
                .catch((err) => {
                    next({ name: "Login" });
                    return;
                });
        } else if (token && user.userRole) {
            if (requiredRoles != user.userRole) {
                next({ name: "NotFound" }); // Redirect to a not found page or appropriate route
                return;
            } else {
                next();
            }
        } else {
            next({ name: "Login" });
            return;
        }
    } else {
        next();
    }
});

export default router;
