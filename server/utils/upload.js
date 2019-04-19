const qiniu = require("qiniu");
const qiniu_config = require("../config/qiniu");

const mac = new qiniu.auth.digest.Mac(
  qiniu_config.accessKey,
  qiniu_config.secretKey
);

const putPolicy = new qiniu.rs.PutPolicy({
  scope: qiniu_config.bucket,
  returnBody:
    '{"success": true,"data": {"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","path":"http://pq3cs0ksy.bkt.clouddn.com/$(key)"}}'
});

module.exports = {
  getToken() {
    return putPolicy.uploadToken(mac);
  }
};
