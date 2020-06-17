import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Register from './components/Register.vue'
import Member from './components/Member.vue'
import Order from './components/Order.vue'
import Ours from './components/Ours.vue'
import Main from './components/Main.vue'
import YX from './components/stores/yexiao.vue'
import ZJM from './components/stores/zhajiangmian.vue'
import HB from './components/stores/hanbao.vue'
import QLTC from './components/stores/qinglvtaocan.vue'
import BJKY from './components/stores/beijingkaoya.vue'
import ETSP from './components/stores/ertongshiping.vue'
import MHQX from './components/stores/manhanquanxi.vue'
import WEL from './components/stores/woel.vue'
import SG from './components/stores/shuiguo.vue'
Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        {
            path: '/home', component: Home, redirect: '/main',
            children: [
                {
                    path: '/main', component: Main
                },
                {
                    path: '/member', component: Member
                }, {
                    path: '/order', component: Order
                },
                {
                    path: '/ours', component: Ours
                },
                { path: '/yexiao', component: YX },
                { path: '/zhajiangmian', component: ZJM },
                { path: '/hanbao', component: HB },
                { path: '/qinglvtaocan', component: QLTC },
                { path: '/beijingkaoya', component: BJKY },
                { path: '/ertongshiping', component: ETSP },
                { path: '/manhanquanxi', component: MHQX },
                { path: '/woel', component: WEL },
                { path: '/shuiguo', component: SG }
            ]
        }
    ]
})