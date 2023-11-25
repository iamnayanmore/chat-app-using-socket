const socket = io();

let name;
let textarea = document.querySelector("#textarea");
let msgArea = document.querySelector(".message__area");
do {
  name = prompt("Please enter your name: ");
} while (!name);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim(),
  };

  // Append
  appendMessage(msg, "outgoing");
  scrollToBottom()
  textarea.value = '';
  // Send to server
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("message", type);

  let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `;

  mainDiv.innerHTML = markup;

  msgArea.appendChild(mainDiv);
}


// Receive messages
socket.on('message', msg => {
    appendMessage(msg, "incoming");
    scrollToBottom()
})


function scrollToBottom() {
    msgArea.scrollTop = msgArea.scrollHeight
}