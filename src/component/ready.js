import React from 'react'

import { socket, listenToUserData, move, start } from '../functions.js'
import Dilemma from './dilemma.js'
import Result from './result.js'
import Over from './over.js'


class Ready extends React.Component {
  constructor(props) {
    super(props)
    this.canvas = React.createRef()
    this.state = {
      step: 0,
      q: '',
      a: '',
      b: '',
      res: '',
      life: 3,
      win: true,
      users:[]
    }
    this.x = 0
  }

  componentDidMount() {
    socket.on('newQuestion', q => {
      if(this.state.life > 0) {
        this.canvas.current.style.opacity = 0
      }
      this.setState({win:true})
      this.setState({step:1,q: q.q, a:q.a, b:q.b})
    });
    socket.on('majority', q => {
      this.canvas.current.style.opacity = 1
      let choose = this.x < .5 ? '1' : '-1'
      socket.emit('q',choose)
      this.setState({step:2,q: 'm', a:'I gave the majority answer', b:'I gave the minority answer'})
    });
    socket.on('result', res => {
      let choose = this.x < .5 ? '1' : '-1'
      socket.emit('m',choose)
      this.setState({step:3})
    });
    socket.on('finalresult', res => {
      this.setState({step:4,users:res})
      if(res[socket.id].life<this.state.life) {
        this.setState({win:false, life:res[socket.id].life})
      }
    })
    socket.on('gameover', res => {
      console.log(1)
      this.setState({step:5,users:res})
    })
    socket.on('restart', res => {
      window.location.reload();
    })

    listenToUserData(data => {
      this.canvas.current.innerHTML = ''
      Object.keys(data).forEach(key => {
        let i = data[key]
        let cursor = document.createElement('div')
        cursor.style.left = i.pos[0]*100 + 'vw'
        cursor.style.top = i.pos[1]*100 + 'vh'
        cursor.style.position = 'fixed'
        cursor.innerHTML = i.name
        cursor.style.color = '#fff'
        cursor.style.display = 'block'
        cursor.style.padding = '3px'
        cursor.style.margin = '20px'
        cursor.style.fontSize = '12px'
        cursor.style.backgroundColor = '#000'
        cursor.style.zIndex = 99999;
        this.canvas.current.appendChild(cursor)
      })
    })
    window.addEventListener('mousemove', e => {
      this.x = e.pageX/window.innerWidth
      move([e.pageX/window.innerWidth, e.pageY/window.innerHeight])
    })
  }


  render() {
    return (
      <div>
        <style>{`

            .startbtn {
              position: fixed;
              z-index: 999;
            }

            .calculate {
              width: 100vw;
              height: 100vh;
              position: fixed;
              top: 0;
              left: 0;
              font-size: 24px;
              font-style: italic;

            }

            .load {
              position: fixed;
              top: 50vh;
              left: 50vw;
              transform: translate(-50%, -50%);
            }

        `}</style>
        <div ref={this.canvas}>
        </div>
        {
          this.state.step === 0
          ? <div>
              <Dilemma Q={'r'} A={'wait a minute'} B={'ready'} countdown={9999}/>
              {
                window.location.href.includes('admin')
                ? <div className='startbtn' onClick={() => start()}>start</div>
                : ''
              }

            </div>
          :this.state.step === 1
          ?<Dilemma Q={this.state.q} A={this.state.a} B={this.state.b} countdown={20}/>
          :this.state.step === 2
          ?<Dilemma Q={this.state.q} A={this.state.a} B={this.state.b} countdown={100}/>
          :this.state.step === 3
          ?<div className='calculate'><div className='load'>Loading...</div></div>
          :this.state.step === 4
          ?<Result users={this.state.users} win={this.state.win} life={this.state.life} countdown={15}/>
          :this.state.step === 5
          ?<Over users={this.state.users} countdown={30}/>
          :''
        }
      </div>
    )
  }
}

export default Ready
