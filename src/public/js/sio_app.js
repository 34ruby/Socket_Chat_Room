const socket = io();

const welcome = document.querySelector('#welcome');
const roomForm = welcome.querySelector('form');
let roomName = '';

roomForm.addEventListener('submit', event => {
    event.preventDefault();
    roomName = roomForm.querySelector('input').value;

    socket.emit('enter_room', roomName, () => {
        console.log('server in done');
        showRoom();
    });
});

const room = document.querySelector('#room');
room.hidden = true;

function showRoom() {
    welcome.hidden = true;
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

socket.on('welcome', () => {
    addMessage('Somebody joined!');
});

socket.on('bye', (user) => {
    addMessage(`Somebody left ${user}`);
});

const messageForm = room.querySelector('#message');
messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = messageForm.querySelector('input');
    const message = input.value;
    socket.emit('new_message', message, roomName, () => {
        addMessage(`You : ${message}`);
    });
    input.value = '';
    console.log('버튼 이벤트 1')
});

const nickNameForm = document.querySelector("#nick")
nickNameForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nickInput = nickNameForm.querySelector("input")
    const nickName = nickInput.value;
    socket.emit("nickname", nickName)
    console.log('버튼 이벤트 12')
})

socket.on('new_message', addMessage); // (msg) => {addMessage(msg);}