import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/authoringtool/22',
        alias: ['/', '/authoringtool/22', '/authoringtool/22/signin'],
        name: 'signin',
        component: () =>
            import(/* webpackChunkName: "Home" */ '../views/SignInPage.vue'),
    },
    {
        path: '/authoringtool/22/signup',
        name: 'signup',
        component: () =>
            import(/* webpackChunkName: "Home" */ '../views/SignUpPage.vue'),
    },
    {
        path: '/authoringtool/22/works',
        name: 'main',
        meta: { isLogin: true },
        component: () =>
            import(/* webpackChunkName: "Home" */ '../views/MainPage.vue'),
    },
    {
        path: '/authoringtool/22/works/scrape',
        name: 'scrape',
        meta: { isLogin: true },
        component: () =>
            import(/* webpackChunkName: "Home" */ '../views/ScrapePage.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach((to, from, next) => {
    const isLogin = localStorage.getItem('user')

    // to: 이동할 url에 해당하는 라우팅 객체
    if (to.matched.some(record => record.meta.isLogin)) {
        // 이동할 페이지에 인증 정보가 필요하면 경고 창을 띄우고 페이지 전환은 하지 않음
        if(isLogin) next()
        
    } else {
        //console.log("routing success : '" + to.path + "'");
        next() // 페이지 전환
    }
})

export default router
