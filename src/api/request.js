import axios from "axios";
import { Loading, Message } from "element-ui";
import store from "../store";

// region 拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    if (typeof response.data.data === "string") {
      try {
        response.data.data = JSON.parse(response.data.data);
      } catch (e) {
        console.log("not json type");
      }
    }

    return response;
  },
  function(error) {
    // 对响应错误做点什么
    console.log("响应错误");
    return Promise.reject(error);
  }
);

// endregion

//  region 格式化请求体
const formatData = data => {
  let keys = [];
  const form = new FormData();
  if (data instanceof FormData) {
    keys = [...data.keys()];
  } else if (typeof data === "object") {
    keys = Object.keys(data);
  } else {
    throw new Error("expect an object or FormData");
  }
  keys.forEach(key => {
    form.append(key, data.get ? data.get(key) : JSON.stringify(data[key]));
  });
  return form;
};

// endregion

export default function request(
  { method = "post", data, url, headers = {} },
  loading = true,
  toast = true
) {
  loading && Loading.service();
  return new Promise((resolve, reject) => {
    let params = null;

    if (data.params) {
      params = data.params;
      delete data.params;
    }

    const form = formatData(data);

    axios({
      method,
      url,
      data: form,
      params,
      headers: {
        ...headers,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(res => {
        loading && Loading.service().close();
        // console.log(res, 'request success')

        if (!res.data.success && toast) {
          Message({
            type: "waring",
            message: res.data.message || "服务异常"
          });
        }

        resolve(res.data);
      })
      .catch(err => {
        loading && Loading.service().close();
        console.log(err, "net error");
        toast &&
          Message({
            type: "error",
            message: "网络故障"
          });
        resolve({
          success: false,
          message: "网络故障",
          data: err
        });
      });
  });
}
