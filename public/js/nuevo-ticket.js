
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button'); //como sólo hay un botón no es necesario un id

const socket = io();

//cuando el socket está conectado el botón está habilitado
socket.on('connect', () => {
    btnCrear.disabled = false;
});

//cuando el socket está desconectado el botón está deshabilitado
socket.on('disconnect', () => {
    btnCrear.disabled = true;
});

//cuando inicial la aplicación muestra el último ticket
socket.on('ultimo-ticket', (ultimo) => {
    lblNuevoTicket.innerText = 'Ticket '+ ultimo;
});

//escucha el click del mouse y emite la generación de un nuevo ticket
btnCrear.addEventListener( 'click', () => {
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });
});