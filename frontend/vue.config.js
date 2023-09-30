const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/discovery/api/books": {
        target: "https://reedsy.com",
        changeOrigin: true,
      },
    },
  },
});
