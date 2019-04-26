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

const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z2;
const bucketManager = new qiniu.rs.BucketManager(mac, config);

module.exports = {
  getToken() {
    return putPolicy.uploadToken(mac);
  },
  delItem(key) {
    return new Promise(resolve => {
      bucketManager.delete(qiniu_config.bucket, key, function(
        err,
        respBody,
        respInfo
      ) {
        if (err) {
          console.log(err);
          resolve({
            success: false,
            data: err
          });
        } else {
          resolve({
            success: true,
            info: respInfo,
            data: respBody
          });
        }
      });
    });
  }
};
