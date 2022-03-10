console.log('안뇽!!')

const socket = new WebSocket(`ws://${window.location.host}`)

socket.addEventListener('open', () => {
    console.log("Connected to Server!!")
})

socket.addEventListener('message', (msg)=>{
    console.log("just got this:", msg.data, "from the server")
})

socket.addEventListener('close', ()=> {
    console.log("Disconnected from server")
})
// setTimeout(()=>{
//     socket.send("hello from the browser")
// }, 3000);

const messageForm = document.querySelector("form")
messageForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    const input = document.querySelector('input')
    // form 태그 내의 input 태그에 입력된 값을 읽어온다.
    // 그 값을 socket을 통해 WebSocket Server로 전송
    console.log('submit event occurred', input.value)
    socket.send(input.value)
    input.value="";
})
