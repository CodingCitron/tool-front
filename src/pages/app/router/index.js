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
        meta: { isLogin: true },
        component: () =>
            import(/* webpackChunkName: "AccountDetailPage" */ '../views/AccountDetailPage.vue'),
    },
    {
        path: '/authoringtool/22/myworks',
        name: 'myworks',
        meta: { isLogin: true },
        component: () =>
            import(/* webpackChunkName: "InputOriginSentence" */ '../views/Myworks.vue'),
    },
    {
        path: '/authoringtool/22/manage',
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
        path: '/authoringtool/22/works/correction-mega',
        name: 'correctionMegaPage',
        meta: { isLogin: true },
        props: true,
        component: () =>
            import(/* webpackChunkName: "ScrapePage" */ '../views/CorrectionMegaPage.vue'),
    },
    {
        path: '/authoringtool/22/works/correction-expert',
        name: 'correctionExpertPage',
        meta: { isLogin: true },
        props: true,
        component: () =>
            import(/* webpackChunkName: "postExpertData" */ '../views/CorrectionExpertPage.vue'),
    },
    {
        path: '/authoringtool/22/works/process-expert',
        name: 'processExpertPage',
        meta: { isLogin: true },
        props: true,
        component: () =>
            import(/* webpackChunkName: "InputOriginSentence" */ '../views/ProcessExepertPage.vue'),
    },
    {
        path: '/authoringtool/22/works/process-sentence',
        name: 'processPage',
        meta: { isLogin: true },
        props: true,
        component: () =>
            import(/* webpackChunkName: "InputOriginSentence" */ '../views/ProcessPage.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach((to, from, next) => {
    var isLogin = store.getters['user/IS_LOGIN'],
    userAuth = store.getters['user/GET_AUTH']

    // to: ????????? url??? ???????????? ????????? ??????
    if (to.matched.some(record => record.meta.isLogin)) {
        const { Authorization } = to.meta

            if(isLogin) { // ????????? ????????? ??????

                if (Authorization && Authorization.length) { // ????????? ????????? ?????????
                    if(userAuth.includes(...Authorization)){ // ????????? ??????
                        next()   
                    } else { // ????????? ??????
                        next({ name: 'main' })
                        alert('????????? ????????????.')
                    }
                } else { // ???????????? ????????? ?????????
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
