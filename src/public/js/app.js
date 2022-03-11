console.log('안뇽!!')

const socket = new WebSocket(`ws://${window.location.host}`)

socket.addEventListener('open', () => {
    console.log("Connected to Server!!")
})
const ul = document.querySelector('ul')

socket.addEventListener('message', (msg)=>{
    // console.log("just got this:", msg.data, "from the server")
    // 웹 페이지의 ul 태그를 찾고 
    // 동적으로 li 태그를 생성하고 
    // 그 li 태그의 내용으로 서버로부터 받은 메세지를 설정하고
    // 그 li를 그 ul태그의 자식으로 추가하는 것이다 !
    const li = document.createElement("li");
    li.innerText = msg.data; // <li>hello </li>
    ul.appendChild(li);

})

socket.addEventListener('close', ()=> {
    console.log("Disconnected from server")
})
// setTimeout(()=>{
//     socket.send("hello from the browser")
// }, 3000);

const messageForm = document.querySelector("#message")
messageForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    const input = messageForm.querySelector('input')
    // form 태그 내의 input 태그에 입력된 값을 읽어온다.
    // 그 값을 socket을 통해 WebSocket Server로 전송
    console.log('submit event occurred', input.value)
    socket.send(input.value)
    input.value="";
})


// 아이디가 nick인 DOM 객체(Form)을 찾는다.
const nickForm = document.querySelector('#nick')

nickForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    // form 태그 내의 input 태그에 입력된 값을 읽어온다.
    const input = document.querySelector('input')
    socket.send(input.value)
})