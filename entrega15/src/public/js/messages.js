const socket = io();
let user;
const email = document.getElementById('email')
const mensaje = document.getElementById('mensaje')
const buttonEnviar = document.getElementById('buttonEnviar')

Swal.fire({
    icon: "info",
    title: "Identificate, por favor!!",
    input: 'text',
    text: 'Ingrese su nombre para indentificarse.',
    color: "#13417a",
    inputValidator: (value) => {
        if (!value) {
            return "Necesitas escribir tu nombre para continuar!!"
        } else {
            socket.emit('userConnected', { user: value })
        }
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value
    const myName = document.getElementById('myName')
    myName.innerHTML = user
})

mensaje.addEventListener('keyup', evt => {
    if (evt.key === 'Enter') {
        if (email.value.trim().length > 0) {
            socket.emit('message', { user: user, email: email.value, area: mensaje.value })
            email.value = '';
            mensaje.value = '';
        } else {
            Swal.fire({
                icon: "warning",
                title: "Alert",
                text: "Por favor ingrese un mensaje"
            })
        }
    }
})
buttonEnviar.addEventListener('click', function () {
    console.log('click')

    if (mensaje.value.trim().length > 0) {
        socket.emit('message', { user: user, email: email.value, area: mensaje.value })
        mensaje.value = '';
        email.value = '';
    } else {
        Swal.fire({
            icon: "warning",
            title: "Alert",
            text: "Por favor ingrese un mensaje"
        })
    }
})

socket.on('messageLogs', data => {
    const messageLogs = document.getElementById('messageLogs')
    let logs = '';
    data.forEach(log => {
        logs +=
            `<div style="display: flex; flex-direction:column"><b>${log.user}:</b></div>
            <div><b>${log.email}</b></div>
            <div><b>${log.area}</b></div>      
         <br/>`
    });
    messageLogs.innerHTML = logs
})
    `<b>${log.user}</b> dice: ${log.email}  ${log.area}<br/>`


socket.on('userConnected', data => {
    let message = `Nuevo usuario conectado ${data}`
    Swal.fire({
        icon: 'info',
        title: 'Nuevo usuario entra al chat!!',
        text: message,
        toast: true,
        color: '#13417a'
    })
})

const closeChatBox = document.getElementById('closeChatBox');
closeChatBox.addEventListener('click', evt => {
    alert("Gracias por usar este chat, Adios!!")
    socket.emit('closeChat', { close: "close" })
    messageLogs.innerHTML = ''
})