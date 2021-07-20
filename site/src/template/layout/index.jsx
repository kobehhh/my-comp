import React, { Component } from 'react';
import { Link } from 'bisheng/router';
// import '../static/style';

class Layout extends Component {
  render() {
    const { children, helmetContext = {} } = this.props;
    return (
      <div>
        <div className="document yue">
          {children}
        </div>
      </div>
    );
  }
}

export default Layout;