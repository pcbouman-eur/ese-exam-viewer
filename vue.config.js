const path = require("path");

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  outputDir: path.resolve(__dirname, "docs"),
  publicPath: process.env.NODE_ENV === 'production' ? '/ese-exam-viewer/' : '/',
  pages: {
    index: {
      entry: './src/main.js',
      title: 'Answer Viewer'
    }
  }
}