import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'bisheng/router';
import '../../static/main.less';

function getMenuData(props) {
  const menuList = [...props.picked.components];
  return menuList;
}

class Content extends React.Component {
  renderMenu(menuList) {
    return menuList.map((item,index) => {
      const {meta: {title, filename}} = item;
      return (
        <div className="menu-item" key={index}>
          <Link to={`/${filename.replace(/(\/index)?\.md$/i, '')}`}>{title}</Link>
        </div>
      )
    });
  }

  renderDemo(demos) {
    if (!demos) return null;
    const demoValues = Object.keys(demos).map(key => demos[key]);
    return demoValues.map(demo => {
      const {meta: {title}} = demo;
      return (
        <div key={demo.meta.filename} className="demo">
          <div>{title}</div>
          <div>{demo.preview(React, ReactDOM)}</div>
        </div>
      )
    });
  }

  renderArticle(props) {  // 后面把这个组件抽离出来
    const {
      localizedPageData,
      utils,
      demos,
    } = props;
    const { meta: {title, subtitle }, content } = localizedPageData;
    return (
      <article>
        <section className="markdown">
          <h1>
            {title}  {subtitle}
          </h1>
        </section>
        {utils.toReactComponent(
          ['section', { className: 'markdown' }].concat(content.slice(1)),
        )}
        <div>
           {this.renderDemo(demos)}
        </div>
      </article>
    )
  }

  render() {
    const menuList = getMenuData(this.props)

    return (
      <>
        <div className="menu-list">
          {this.renderMenu(menuList)}
        </div>
        <div className="content">
          {this.renderArticle(this.props)}
        </div>
      </>
    );
  }
}

export default Content;
