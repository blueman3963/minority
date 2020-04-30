import React from 'react';

import { socket } from '../functions.js'

class Result extends React.Component {
  constructor(props) {
    super(props)
    this.itv = null
    this.state = {
      countdown: this.props.countdown,
      users: [],
      portion:null,
    }
  }

  componentDidMount() {
    this.itv = setInterval(() => {
      let countdown = this.state.countdown
      if(countdown > 0) {
        countdown--
      }
      this.setState({countdown})
    },1000)

    let users = []
    let a=0,b=0
    Object.keys(this.props.users).forEach(i => {
      users.push(this.props.users[i])
    })
    users.sort((a, b) => (a.life < b.life) ? 1 : -1)
    this.setState({users})

    let portion = a/(a+b)*100
    this.setState({portion})
  }

  render() {
    return (
      <div>
      <style>{`
        .res-wrapper {
          font-size: 20px;
          position: fixed;
          top: 50vh;
          left: 50vw;
          transform: translate(-50%, -50%);
          text-align: center;
          font-size: 24px;
        }

        .countdown {
          position: fixed;
          left: 50vw;
          top: 50vh;
          transform: translate(-50%, -50%);
          font-size: 20vw;
          opacity: .2;
          pointer-events: none;
        }
      `}</style>
        <div className='res-wrapper'>
          <div>
          {
            this.props.life < 1
            ? 'You Are Out!'
            : this.props.win
            ? 'you survived! '+this.props.life+' life(s) left'
            : 'dang, you only have '+this.props.life +' life(s) left'
          }
          </div>
          <div>
            {
              this.props.portion !== null?Math.floor(this.props.portion*100)+'%':'N/A'
            }
            {
              this.props.A
            }
            <br/>
            {
              this.props.portion !== null?Math.floor((1-this.props.portion)*100)+'%':'N/A'
            }
            {
              this.props.B
            }
          </div>
          <div>&nbsp;</div>
          <div>
          {
            this.state.users.map(user => {
              return <div style={{
                color: user.id === socket.id ? '#f00' : user.life > 0 ? '#000' : '#ddd'
              }}>
              {user.name}({user.life > 0 ? user.life : 0})
              </div>
            })
          }
          </div>
        </div>
        <div className='countdown'>{this.state.countdown}</div>

      </div>
    )
  }
}

export default Result;
