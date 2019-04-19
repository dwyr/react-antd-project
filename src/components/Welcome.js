import React from 'react';
import {observer} from 'mobx-react';
import SiderMenu from '../components/SiderMenu/index'

@observer
export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return (
        <div>
          <SiderMenu />
          环境配置好了，可以开发了
        </div>
    );
  }
};
