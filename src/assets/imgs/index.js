/**
 * Created by rule on 2019/4/8.
 */
const img = {};
const req = require.context('./', false, /\.(png|jpe?g|gif|svg)(\?.*)?$/);

req.keys().forEach(it => {
  let key = it.replace(/\.\/(.*)\.(png|jpe?g|gif|svg)(\?.*)?$/, '$1');
  img[key] = req(it);
});

export default img