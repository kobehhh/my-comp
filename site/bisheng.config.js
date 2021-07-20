const path = require('path')

// 严格区分commonJS文件和ES6文件
// https://babel.docschina.org/docs/en/options#sourcetype
// https://github.com/webpack/webpack/issues/4039#issuecomment-419284940
function editBabelConfig(rules) {
  rules.forEach((rule) => {
    if (rule.loader && rule.loader.includes('babel-loader')) {
      rule.options = {
        ...rule.options,
        sourceType: 'unambiguous',
      }
    } else if (rule.use) {
      editBabelConfig(rule.use)
    }
  })
  return rules
}

module.exports = {
  source: {
    // 读取markdown文件的目录
    components: './components',
    // docs: './docs',
  },
  themeConfig: {
    // 这里为空也要配个空对象，不然报错
  },
  output: './_site',
  hash: true,
  theme: './site/src',
  htmlTemplate: './site/src/static/template.html',
  root: process.env.NODE_ENV !== 'development' ? '/react/' : '/',
  port: 8004,
  webpackConfig(config) {
    console.log(path.join(process.cwd(), 'site/src'))
    config.resolve.alias = {
      kui: path.join(process.cwd(), 'index'),
      '@src': path.join(process.cwd(), 'site/src'),
    }
    config.output.publicPath = process.env.NODE_ENV !== 'development' ? '/react/' : '/'
    config.module.rules = editBabelConfig(config.module.rules)
    config.devtool = 'cheap-module-eval-source-map'
    return config
  },
}
