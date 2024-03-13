const socket = io();
let user;
const chatBox = document.getElementById('chatBox')
const buttonEnviar = document.getElementById('buttonEnviar')



/*=============================================
=              Aplicando SweetAlert           =
=============================================*/
Swal.fire({
    icon: "info",
    title: "Identificate, por favor!!",
    input: 'text',
    text: 'Ingrese el username para identificarse en el chat.',
    color: "#716add",
    inputValidator: (value) => {
        if (!value) {
            return "Necesitas escribir tu username para continuar!!"
        } else {
            socket.emit('userConnected', { user: value })
        }
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value

    // Cargamos Nombre en el Navegador
    const myName = document.getElementById('myName')
    myName.innerHTML = user
})


//Guardar mensajes por usuario y mostrarlo en nuesto log de mensajes.

chatBox.addEventListener('keyup', evt => {
    if (evt.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', { user: user, message: email.value, area: msg.value })
            chatBox.value = '';
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
    if (evt.event === 'click') {
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', { user: user, message: email.value, area: msg.value })
            chatBox.value = '';
        } else {
            Swal.fire({
                icon: "warning",
                title: "Alert",
                text: "Por favor ingrese un mensaje"
            })
        }
    }
})

socket.on('messageLogs', data => {
    const messageLogs = document.getElementById('messageLogs')
    let logs = '';
    data.forEach(log => {
        logs += `<b>${log.user}</b> dice: ${log.message}<br/>`
    });
    messageLogs.innerHTML = logs
})


// 2da - parte
// Aqui escuchamos los nuevos usuarios que se conectan al chat\
socket.on('userConnected', data => {
    let message = `Nuevo usuario conectado ${data}`
    Swal.fire({
        icon: 'info',
        title: 'Nuevo usuario entra al chat!!',
        text: message,
        toast: true,
        color: '#716add'
    })
})


/*=============================================
=                   Extras                   =
=============================================*/


// close chatBox
const closeChatBox = document.getElementById('closeChatBox');
closeChatBox.addEventListener('click', evt => {
    alert("Gracias por usar este chat, Adios!!")
    socket.emit('closeChat', { close: "close" })
    messageLogs.innerHTML = ''
})