const path = require('path');

module.exports = {
  lazyLoad(nodePath, nodeValue) {
    if (typeof nodeValue === 'string') {
      return true;
    }
    return nodePath.endsWith('/demo'); // 将demo下的所有md合为一个
  },
  pick: {
    components(markdownData) {  // 只读取components下部分
      const { filename } = markdownData.meta;
      if (!/^components/.test(filename) || /[/\\]demo$/.test(path.dirname(filename))) {
        return null;
      }
      return {
        meta: markdownData.meta,
      };
    },
  },
  plugins: [
    'bisheng-plugin-description', //抽取markdown文件的中间的description部分
    // 下面两个插件用于渲染md文件中的jsx代码
    'bisheng-plugin-react?lang=__react',
    'bisheng-plugin-antd?injectProvider',
    // 'bisheng-plugin-toc?maxDepth=2&keepElem', //产生一个table,暂时不用
  ],
  routes: {
    path: '/',
    component: './template/layout/index',
    // indexRoute: {
    //   component: './template/home/index'
    // },
    childRoutes: [
      {
        path: 'components/:children',
        component: './template/content/index',
      }
    ],
  }
};