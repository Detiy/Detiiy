import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex);
const LK_USERS = 'lk_users'
export default new Vuex.Store({
    state: {
        currDbSource: [],
        DbSource: [],
        mobile: '' || localStorage.getItem('mobile'),
    },
    mutations: {
        saveDbSource(state, DbSource) {
            state.DbSource = DbSource;
            localStorage.setItem('DbSource', JSON.stringify(DbSource))
        },
        readDbSource(state) {
            return JSON.parse(localStorage.getItem(state.DbSource))
        },
        saveUsers(state, foodsFilter) {
            state.foodsFilter = foodsFilter;
            localStorage.setItem(LK_USERS, JSON.stringify(foodsFilter))
        },
        handleUserMobile(state, mobile) {
            state.mobile = mobile;
            localStorage.setItem('mobile', JSON.stringify(mobile))
        },
        handleUserPass(state, passWord) {
            state.passWord = passWord;
            localStorage.setItem('passWord', passWord)
        },
    },
    getters: {
        mobile: (state) => state.mobile,
        passWord: (state) => state.passWord,
    }
})