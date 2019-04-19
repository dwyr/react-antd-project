import React from 'react';

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

      }
    }

    render() {
        return (
          <div style={{'height':'100%'}}>
            {this.props.children}
          </div>
        );
    }
}

export default App;
