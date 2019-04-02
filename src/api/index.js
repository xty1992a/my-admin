/**
 * Created by TY-xie on 2018/5/10.
 */
import request from './request'

// 登录,获取用户信息接口
export const login = data => request({data, url: '/api/Login/UserLogin'})
export const getUser = () => request({data: {}, url: '/api/User/UserInfo', method: 'GET'})
