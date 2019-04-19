import { getQiNiuToken, upload2Qiniu } from "../api";

async function getToken() {
  let res = await getQiNiuToken();
  return res.success ? res.data.token : false;
}

const createForm = token => file => {
  const form = new FormData();
  form.append("key", Date.now() + ".png");
  form.append("file", file);
  form.append("token", token);
  return form;
};

export default async function() {
  const token = await getToken();
  const getForm = createForm(token);

  return (file, callback) => {
    upload2Qiniu(getForm(file)).then(res => {
      const err = res.success ? null : new Error("upload2Qiniu faild");
      callback(err, res);
    });
  };
}
