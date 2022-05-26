import { createRouter, createWebHistory } from 'vue-router'
import store from '@/pages/app/store'

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
    var isLogin = store.getters['user/IS_LOGIN']
    
    // to: 이동할 url에 해당하는 라우팅 객체
    if (to.matched.some(record => record.meta.isLogin)) {
        // 이동할 페이지에 인증 정보가 필요하면 경고 창을 띄우고 페이지 전환은 하지 않음
        if(isLogin) {
            next() // next()를 해야 다음 화면 이동
        }else{
            next({ name: 'signin' }) // 로그인이 안되어 있으면 로그인 페이지로 이동
        }
    } else { // signin, signup

        if(isLogin) { 
            if(to.name === 'signin' || to.name === 'signup') {
                if(from.path === '/') next({ name: 'main' })
            }
        }else{
            next()
        }
    }
})

export default router
