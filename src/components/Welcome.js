import React from 'react';
import {observer} from 'mobx-react';

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
          环境配置好了，可以开发了
        </div>
    );
  }
};
