// Referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender    = document.querySelector('#btnAtender');
const lblPendientes = document.querySelector('#lblPendientes');
const lblTicket     = document.querySelector('#atendiendo');
const divAlerta     = document.querySelector('#alerta');

const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;
divAlerta.style.display = 'none';

const socket = io();

//cuando el socket está conectado el botón está habilitado
socket.on('connect', () => {
    btnAtender.disabled = false;
});

//cuando el socket está desconectado el botón está deshabilitado
socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

//cuando inicial la aplicación muestra el último ticket
socket.on('ultimo-ticket', (ultimo) => {
    //lblNuevoTicket.innerText = 'Ticket '+ ultimo;
});

// cuando hay tickets pendientes
socket.on('tickets-pendientes', (pendientes) => {
    if(pendientes === 0){
        lblPendientes.style.display = 'none';
    }else{
        lblPendientes.style.display = '';
        lblPendientes.innerText = pendientes;
    }
});

//escucha el click del mouse y emite la generación de un nuevo ticket
btnAtender.addEventListener( 'click', () => {
    socket.emit('atender-ticket', { escritorio }, ({ok, ticket, msg}) => {
        if(!ok){
            lblTicket.innerText = 'Nadie';
            return divAlerta.style.display = '';
        }
        lblTicket.innerText = 'Ticket ' + ticket.numero;
    });
});