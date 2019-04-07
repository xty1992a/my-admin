/**
 * Created by TY-xie on 2018/5/10.
 */
import request from './request'

// 登录,获取用户信息接口
export const login = (data, loading = true) => request({data, url: '/api/Login/UserLogin'}, loading)
export const getUser = () => request({data: {}, url: '/api/User/UserInfo', method: 'GET'})
export const getRole = (role) => request({data: {params: {role}}, url: '/api/User/GetRole', method: 'GET'})
export const getUserList = () => request({data: {}, url: '/api/User/UserList', method: 'GET'}, false)

export const getEditorList = () => request({data: {}, url: '/api/User/getEditorList', method: 'GET'}, false)
export const deleteEditor = (key) => request({data: {params: {key}}, url: '/api/User/DeleteEditor'})
export const addEditor = (data) => request({data, url: '/api/User/AddEditor'})
export const editEditor = (data) => request({data, url: '/api/User/RewriteEditor'})

export const editUser = (data) => request({data, url: '/api/User/RewriteUser'})
export const deleteUser = (token) => request({data:{params:{token}}, url: '/api/User/DeleteUser'})
export const addUser = (data) => request({data, url: '/api/User/AddUser'})
