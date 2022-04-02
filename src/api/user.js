import request from '@/router/axios';
export const loginByUsername = (username, password, code, redomStr) => request({
    url: '/user/login',
    method: 'post',
    meta: {
        isToken: false
    },
    data: {
        username,
        password,
        code,
        redomStr
    }
})

export const getUserInfo = () => request({
    url: '/user/getUserInfo',
    method: 'get'
});

export const refeshToken = () => request({
    url: '/user/refesh',
    method: 'post'
})

export const getMenu = (type = 0) => request({
    url: '/user/getMenu',
    method: 'get',
    data: {
        type
    }
});

export const getTopMenu = () => request({
    url: '/user/getTopMenu',
    method: 'get'
});

export const sendLogs = (list) => request({
    url: '/user/logout',
    method: 'post',
    data: list
})

export const logout = () => request({
    url: '/user/logout',
    meta: {
        isToken: false
    },
    method: 'get'
})