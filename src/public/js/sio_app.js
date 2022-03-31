const socket = io();
const welcome = document.querySelector('#welcome');
const roomForm = welcome.querySelector('#room_form');
let roomName = '';

roomForm.addEventListener('submit', (event) => {
    event.preventDefault();
    roomName = roomForm.querySelector('input').value;

    socket.emit('enter_room', roomName)
});

const room = document.querySelector('#room_div');
room.hidden = true;
roomForm.hidden = true;

function showRoom() {
    // welcome.hidden = true;
    nickNameForm.hidden = true;
    roomForm.hidden = false;
    room.hidden = false;
    const h3 = room.querySelector('h3');
    h3.innerText = `Room : ${roomName}`;

}

function addMessage(msg) {
    const ul = room.querySelector('ul');
    const li = document.createElement('li');
    li.innerText = msg;
    ul.appendChild(li);
}

socket.on('welcome', (user, newCount) => {
    const h3 = room.querySelector('h3')
    h3.innerText = `Room ${roomName} (${newCount})`
    addMessage(`${user} joined the room!`);
});

socket.on('bye', user => {
    const h3 = room.querySelector('h3');
    h3.innerText = `Room ${roomName} (${newCount})`;
    addMessage(`${user} left the room`);
});

const messageForm = room.querySelector('#message');
messageForm.addEventListener('submit', event => {
    event.preventDefault();
    const input = messageForm.querySelector('input');
    const message = input.value;
    socket.emit('new_message', message, roomName, () => {
        addMessage(`당신 : ${message}`);
    });
    input.value = '';
});

const nickNameForm = document.querySelector('#nick');
nickNameForm.addEventListener('submit', event => {
    event.preventDefault();
    const nickInput = nickNameForm.querySelector('input');
    const nickName = nickInput.value;
    socket.emit('nickname', nickName, showRoom);
});

socket.on('room_change', (rooms)=> {
    // console.log(rooms)
    const roomList = document.querySelector('#open_rooms') 
    roomList.innerText = ''
    rooms.forEach(room => {
        const li = document.createElement('li')
        li.innerText = room;
        roomList.appendChild(li)
    })
})

socket.on('new_message', addMessage); // (msg) => {addMessage(msg);}