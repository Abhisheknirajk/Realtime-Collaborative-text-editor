//1)Connect the socket.io the local host 9000
var socket = io.connect('http://localhost:9000');

//2)Get the id  from the html page and return it
function getEl(id) {
    return document.getElementById(id)
}

const editor = getEl("text")
//2 on the event data send to the server
editor.addEventListener("keyup", (evt) => {
    const text = editor.value
    socket.send(text)
})
socket.on('message', (data) => {
    editor.value = data
})
