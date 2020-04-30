import React from 'react'

import { onboard } from '../functions.js'


class Onboard extends React.Component {

  constructor(props) {
    super(props)
    this.name = ''
    this.state = {
      value: ''
    }
  }

  start() {
    if(this.state.value !== ''){
      onboard(this.name||'john doe')
    }
  }

  render() {
    return(
      <div>
        <style>{`
            .intro-wrapper {
              position: fixed;
              left: 50vw;
              top: 50vh;
              transform: translate(-50%, -50%);
              text-align: center;
              font-size: 50px;
            }

            .joinbtn {
              padding: 20px 50px;
              background-color: ${this.state.value === '' ? '#ddd':'#f99' };
              display: block;
              width: 100px;
              margin: auto;
              border-radius: 30px;
            }

            .inp {
              margin: 100px;
              font-size: 32px;
              text-align: center;
              border: none;
              padding: 20px;
              border-bottom: 1px solid #ddd;
              cursor: pointer;
            }

            .inp:focus {
              outline: none;
            }
        `}</style>
      <div className='intro-wrapper'>
        <div>Move your cursor to the side you belongs to...</div>
        <input className='inp' placeholder='your name' onChange={e => (this.name = e.target.value, this.setState({value:e.target.value}))}/>
        <div className='joinbtn' onClick={() => this.start()}>join</div>
      </div>
      </div>
    )
  }
}

export default Onboard
