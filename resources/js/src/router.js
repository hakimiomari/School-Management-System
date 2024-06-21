import { createRouter, createWebHistory } from "vue-router";

import { useLogin } from "@/composables/user/useLogin";
import { useUser } from "@/composables/user/useUser";
import { userStore } from "@/store/userStore";
import Dashboard from "@/views/Dashboard.vue";
import Tables from "@/views/Tables.vue";
import UIElements from "@/views/UIElements.vue";
import Login from "@/views/Login.vue";
import Modal from "@/views/Modal.vue";
import Room from "@/views/Room.vue";
import Blank from "@/views/Blank.vue";
import Profile from "@/views/profile/Profile.vue";
import ChangePassword from "@/views/profile/ChangePassword.vue";
import NotFound from "@/views/not_found/NotFound.vue";
import ClassesIndex from "@/views/classes/index.vue";
import StudentList from "@/views/students/index.vue";
import StudentFees from "@/views/students/StudentFees.vue";
import StudentAttendence from "@/views/students/StudentAttendence.vue";
import AddStudent from "@/views/students/AddStudent.vue";
import EditStudent from "@/views/students/EditStudent.vue";
import TeacherList from "@/views/teachers/index.vue";
import AddTeacher from "@/views/teachers/AddTeacher.vue";
import EditTeacher from "@/views/teachers/EditTeacher.vue";
import Attendance from "@/views/attendance/index.vue";
import Fees from "@/views/fees/index.vue";

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
        meta: { isAuth: true, role: "Admin" },
    },
    {
        path: "/profile/change-password",
        name: "ChangePassword",
        component: ChangePassword,
        meta: { isAuth: true, role: "Admin" },
    },
    {
        path: "/school/classes",
        name: "classes-list",
        component: ClassesIndex,
        meta: { isAuth: true, role: "Admin" },
    },
    {
        path: "/school/student/fees/:id",
        name: "StudentFees",
        component: StudentFees,
        meta: { isAuth: true, role: "Admin" },
    },
    {
        path: "/school/student/attendence/:id",
        name: "StudentAttendence",
        component: StudentAttendence,
        meta: { isAuth: true, role: "Admin" },
    },
    {
        path: "/school/students",
        name: "StudentList",
        component: StudentList,
        meta: { isAuth: true, role: "Admin" },
    },
    {
        path: "/school/student/create",
        name: "AddStudent",
        component: AddStudent,
        meta: { isAuth: true, role: "Admin" },
    },
    {
        path: "/school/student/edit/:id",
        name: "EditStudent",
        component: EditStudent,
        meta: { isAuth: true, role: "Admin" },
    },
    {
        path: "/school/teachers",
        name: "TeacherList",
        component: TeacherList,
        meta: { isAuth: true, role: "Admin" },
    },
    {
        path: "/school/teachers/add",
        name: "AddTeacher",
        component: AddTeacher,
        meta: { isAuth: true, role: "Admin" },
    },
    {
        path: "/school/teachers/edit/:id",
        name: "EditTeacher",
        component: EditTeacher,
        meta: { isAuth: true, role: "Admin" },
    },
    {
        path: "/school/attendance",
        name: "Attendance",
        component: Attendance,
        meta: { isAuth: true, role: "Admin" },
    },
    {
        path: "/rooms",
        name: "Room",
        component: Room,
        meta: { isAuth: true, role: "Admin" },
    },
    {
        path: "/fees",
        name: "Fees",
        component: Fees,
        meta: { isAuth: true, role: "Admin" },
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

    const { getCookie, removeCookie } = useLogin();
    const { getUserRole } = useUser();
    const user = userStore();
    const token = getCookie("access_token");
    // Check if the route requires authentication
    if (requiresAuth) {
        if (token && !user.userRole) {
            getUserRole(token)
                .then((res) => {
                    user.userRole = res.data;
                    user.userRole = res.data;
                    if (requiredRoles != res.data) {
                        next({ name: "NotFound" }); // Redirect to a not found page or appropriate route
                        return;
                    } else {
                        next();
                    }
                })
                .catch((err) => {
                    if (err.response.status == 401) {
                        removeCookie("access_token");
                    }
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
