import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/authoringtool/22',
        alias: ['/', '/authoringtool/22/signin'],
        name: 'SignIn',
        component: () =>
            import(/* webpackChunkName: "Home" */ '../views/SignInPage.vue'),
    },
    {
        path: '/authoringtool/22/signup',
        name: 'SignUp',
        component: () =>
            import(/* webpackChunkName: "Home" */ '../views/SignUpPage.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router