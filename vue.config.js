module.exports = {
    lintOnSave: false,
    outputDir: '../main/resources/static/tools/22',
    //indexPath: '../src/main/resources/static/index.html', // 같은 폴더에 안된다고 말 뜸 사용하면
    pages: {
        app: {
            entry: 'src/pages/app/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'app'
        },
        /*
        account: {
            entry: 'src/pages/account/main.js',
            template: 'public/account.html',
            filename: 'account.html',
            title: 'account'
        },
        */
        /*
        admin: {

        }
        */
    },
    devServer: { 
        port: 3000,
        /* 사용하지 말것 ▼
        개발할때는 끔 ▽ 포트가 2개 일때만 사용 
        스프링 부트 서버에서 프론트 포트를 허용해주면 사용하지 않아도 됨
        */
        /*
        proxy: {
            '/authoringtool/22': {
                target: 'http://localhost:8000/',
                pathRewrite: { '^/': '' },
                changeOrigin: true,
                secure: false,
            },
        },
        */
    },
    chainWebpack: config => {
        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule.use('vue-svg-loader').loader('vue-svg-loader')
    },
}

// https://hyem-study.tistory.com/107
// cors 이슈

// 빌드 할때는 반드시 static 폴더를 지우고 해야함 안 지워도 됨 패스가 틀리면 더 생김

// https://velog.io/@butterf12/Springboot-VueJS-%ED%99%98%EA%B2%BD-%EC%84%A4%EC%A0%95
