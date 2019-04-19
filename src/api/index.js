/**
 * Created by TY-xie on 2018/5/10.
 */
import request from "./request";

// 登录,获取用户信息接口
export const login = (data, loading = true) =>
  request({ data, url: "/api/Login/UserLogin" }, loading);

export const getUser = () =>
  request({ data: {}, url: "/api/User/UserInfo", method: "GET" });
export const getRole = role =>
  request({
    data: { params: { role } },
    url: "/api/User/GetRole",
    method: "GET"
  });

export const addRole = data => request({ data, url: "/api/User/AddEditor" });
export const deleteRole = key =>
  request({ data: { params: { key } }, url: "/api/User/DeleteEditor" });
export const editRole = data =>
  request({ data, url: "/api/User/RewriteEditor" });
export const getRoleList = () =>
  request({ data: {}, url: "/api/User/getEditorList", method: "GET" }, false);

export const addUser = data => request({ data, url: "/api/User/AddUser" });
export const deleteUser = token =>
  request({ data: { params: { token } }, url: "/api/User/DeleteUser" });
export const editUser = data => request({ data, url: "/api/User/RewriteUser" });
export const getUserList = () =>
  request({ data: {}, url: "/api/User/UserList", method: "GET" }, false);

export const getQiNiuToken = () =>
  request({ data: {}, url: "/api/upload/qiniu_token", method: "GET" }, false);
export const upload2Qiniu = data =>
  request({ data, url: "http://up-z2.qiniup.com" });
