import socketio from 'socket.io-client'
const socket =  socketio("https://xlan-property-finder.herokuapp.com/")
export{socket}