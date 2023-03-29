
// Referencias HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket')
const btnCrear = document.querySelector('button')


const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');
    btnCrear.disabled = false

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
        // console.log('Conectado');
        btnCrear.disabled = true

});

socket.on( 'ultimo-ticket', (payload) => {
    lblNuevoTicket.innerText = 'Ticket ' + payload
} )


btnCrear.addEventListener( 'click', () => {
    
    socket.emit( 'ticket-siguiente', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket
    });

});