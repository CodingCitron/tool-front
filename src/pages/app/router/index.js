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
    {
        path: '/authoringtool/22/works',
        name: 'Main',
        component: () =>
            import(/* webpackChunkName: "Home" */ '../views/MainPage.vue'),
    },
    {
        path: '/authoringtool/22/works/scrape',
        name: 'Scrape',
        component: () =>
            import(/* webpackChunkName: "Home" */ '../views/ScrapePage.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
