import React from 'react';

import { onboard } from '../functions.js'

import major from '../assets/major.gif'
import minor from '../assets/minor.gif'


class Dilemma extends React.Component {
  constructor(props) {
    super(props)
    this.itv = null
    this.state = {
      countdown: this.props.countdown,
      Q:null
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

    console.log(process.env.PUBLIC_URL+'/assets/'+this.props.Q+'a.gif')
  }

  componentDidUpdate(prevProps) {
    if(prevProps.countdown !== this.props.countdown) {
      this.setState({countdown:this.props.countdown})
    }
    if(prevProps.Q !== this.props.Q) {
      this.setState({Q:this.props.Q})
    }

  }

  componentWillUnmount() {
    clearInterval(this.itv)
  }

  render() {
    return (
      <div>
      <style>{`
          * {
            cursor: default;
          }
        .select-wrapper {
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
          position: fixed;
        }

        .a, .b {
          width: 50vw;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          font-size: 5vw;
          text-align: center;
          padding: 30px;
          color: #fff;
          background-color: #000;
        }

        .text {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .b {
          left: 50vw;
        }

        .a:hover,.b:hover {
          background-color: #00f;
        }
        .a:hover img,.b:hover img {
          opacity: 1;
        }

        .countdown {
          position: fixed;
          left: 50vw;
          top: 50vh;
          transform: translate(-50%, -50%);
          font-size: 20vw;
          opacity: .2;
          pointer-events: none;
          color: #fff;
        }

        .bga, .bgb {
          display: block;
          position: absolute;
          left: 50%;
          top: 50vh;
          transform: translate(-50%, -50%);
          opacity: .2;
          transition-duration: .2s;
          max-width: 40vw;
        }
      `}</style>
        <div className='select-wrapper'>
          <div className='a'>
            <div style={{position:'relative'}}>
              {this.props.Q === 'r'?'':this.state.Q === 'm'?<img src={major} className='bga'/>:<img src={process.env.PUBLIC_URL+'/assets/'+this.props.Q+'a.gif' } className='bga'/>}
            </div>
            <div className='text'>{this.props.A}</div>
          </div>
          <div className='b'>
            <div style={{position:'relative'}}>
              {this.props.Q === 'r'?'':this.state.Q === 'm'?<img src={minor} className='bgb'/>:<img src={process.env.PUBLIC_URL+'/assets/'+this.props.Q+'b.gif' } className='bgb'/>}
            </div>
            <div className='text'>{this.props.B}</div>
          </div>
        </div>
        <div className='countdown'>{this.state.countdown}</div>
      </div>
    )
  }
}

export default Dilemma;
