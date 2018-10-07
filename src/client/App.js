import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import io from 'socket.io-client';
 
export default class App extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      socket: io()
    }
  }
  
  componentDidMount() {
    const messages = document.getElementById("messages")
    this.state.socket.on('chat message', function(msg){
      const receivedMsg = document.createElement('li')
      receivedMsg.textContent = msg
      messages.appendChild(receivedMsg)
    });
  }
  
  sendMsg = (evt) => {
    const form = document.getElementById('form')
    const msg = document.getElementById('m')
    this.state.socket.emit('chat message', msg.value);
    msg.value = ""
    evt.preventDefault()
  }
  
  render() {
    return (<React.Fragment>
      <ul id="messages"></ul>
    <form action="" id = "form" onSubmit = {this.sendMsg}>
      <input id="m" autocomplete="off" /><button>Send</button>
    </form></React.Fragment>
    );
  }
}
