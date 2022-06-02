import { createRouter, createWebHistory } from 'vue-router'
import store from '@/pages/app/store'

const routes = [
    {
        path: '/authoringtool/22',
        alias: ['/', '/authoringtool/22', '/authoringtool/22/signin'],
        name: 'signIn',
        component: () =>
            import(/* webpackChunkName: "SignInPage" */ '../views/SignInPage.vue'),
    },
    {
        path: '/authoringtool/22/signup',
        name: 'signUp',
        component: () =>
            import(/* webpackChunkName: "SignUpPage" */ '../views/SignUpPage.vue'),
    },
    {
        path: '/authoringtool/22/account-detail',
        name: 'accountDetail',
        component: () =>
            import(/* webpackChunkName: "AccountDetailPage" */ '../views/AccountDetailPage.vue'),
    },
    {
        path: '/authoringtool/22/manage/',
        name: 'manage',
        meta: { isLogin: true, Authorization: ['ADMIN'] },
        component: () =>
            import(/* webpackChunkName: "AdminPage" */ '../views/AdminPage.vue'),
    },
    {
        path: '/authoringtool/22/404',
        name: 'notFound',
        component: () =>
            import(/* webpackChunkName: "notFoundPage" */ '../views/notFoundPage.vue'),
      },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/authoringtool/22/404',
    },
    {
        path: '/authoringtool/22/works',
        name: 'main',
        meta: { isLogin: true },
        component: () =>
            import(/* webpackChunkName: "MainPage" */ '../views/MainPage.vue'),
    },
    {
        path: '/authoringtool/22/works/scrape',
        name: 'scrape',
        meta: { isLogin: true },
        component: () =>
            import(/* webpackChunkName: "ScrapePage" */ '../views/ScrapePage.vue'),
    },
    {
        path: '/authoringtool/22/works/error-sentence',
        name: 'inputErrorSentence',
        meta: { isLogin: true },
        component: () =>
            import(/* webpackChunkName: "InputErrorSentence" */ '../views/InputErrorSentence.vue'),
    },
    {
        path: '/authoringtool/22/works/origin-sentence',
        name: 'inputOriginSentence',
        meta: { isLogin: true },
        component: () =>
            import(/* webpackChunkName: "InputOriginSentence" */ '../views/InputOriginSentence.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach((to, from, next) => {
    var isLogin = store.getters['user/IS_LOGIN'],
    userAuth = store.getters['user/GET_AUTH']

    // to: 이동할 url에 해당하는 라우팅 객체
    if (to.matched.some(record => record.meta.isLogin)) {
        const { Authorization } = to.meta

            if(isLogin) { // 로그인 했는지 확인

                if (Authorization && Authorization.length) { // 권한이 필요한 페이지
                    if(userAuth.includes(...Authorization)){ // 권한이 존재
                        next()   
                    } else { // 권한이 없음
                        next({ name: 'main' })
                        alert('권한이 없습니다.')
                    }
                } else { // 로그인만 필요한 페이지
                    next()
                }

            }else{
                next({ name: 'signIn' }) 
            }
        
    } else { // signin, signup

        if(isLogin) { 
            if(to.name === 'signIn' || to.name === 'signUp') {
                if(from.path === '/') next({ name: 'main' })
            } else {
                next()
            }
        }else{
            next()
        }
    }
})

export default router
