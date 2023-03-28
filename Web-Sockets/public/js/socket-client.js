
const socket = io()

// Referencias HTML
const lblOnline  = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')
const btnEnviar  = document.querySelector('#btnEnviar')
const txtMsg     = document.querySelector('#txtMsg')


socket.on('connect', () => {
    //console.log('conectado');

    lblOffline.style.display = 'none'
    lblOnline.style.display  = ''

})

socket.on('disconnect', () => {
    //console.log('desconectado');

    lblOffline.style.display = ''
    lblOnline.style.display  = 'none'

})

socket.on('enviar-mensaje', (payload) => {
    console.log(payload);
})


btnEnviar.addEventListener( 'click', () => {

    const msg = txtMsg.value
    const payload = {
        msg,
        id: '1234'
    }

    socket.emit( 'enviar-mensaje', payload, (id) => {
        console.log('Mensaje enviado', id);
    })
})