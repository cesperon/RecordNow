// vue.config.js
module.exports = {
  devServer: {
    proxy: "http://localhost:3000",
  },
};
// module.exports = {
//   devServer: {
//     proxy: {
//       '^/api': {
//         target: 'http://localhost:3080',
//         changeOrigin: true
//       },
//     }
//   }
// }
