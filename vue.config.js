const path = require("path");

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  outputDir: path.resolve(__dirname, "docs"),
  pages: {
    index: {
      entry: './src/main.js',
      title: 'Answer Viewer'
    }
  }
}