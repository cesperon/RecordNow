// vue.config.js
module.exports = {
  devServer: {
    proxy: "http://localhost:3001",
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
