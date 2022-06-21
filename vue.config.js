// module.exports = {
//     devServer: {
//         	proxy : 'http://34.64.113.15:5000'
//         }
// }

module.exports = {
    devServer: {
      proxy: {
        '/':{
          "target":'http://34.64.113.15:5000',
          "pathRewrite":{'^/':''},
          "changeOrigin":true,
          "secure":false
        }
      }
    }
  }