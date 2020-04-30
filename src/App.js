import React from 'react';

import Onboard from './component/onboard.js'
import Ready from './component/ready.js'

import { socket, listenToUserData } from './functions.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 0
    }
  }

  componentDidMount() {
    socket.on('login', data => {
      if(data) {
        this.setState({step:1})
      } else {
        alert('game is ongoing')
      }
    });
  }

  render() {
    return (
      <div className="App">
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');

            * {
              font-family: 'Righteous', cursive;
            }
        `}</style>
        {
          this.state.step === 0
          ? <Onboard/>
          : this.state.step === 1
          ? <Ready />
          :''

        }
      </div>
    )
  }
}

export default App;
