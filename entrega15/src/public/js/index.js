
const socket = io();

socket.on('msg_04', data => {
    console.log(data);
})