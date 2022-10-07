const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.class-messages');

const socket = io();

// Message from Server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    // Scrolls Down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message Submit
chatForm.addEventListener('submit', e => {
    e.preventDefault();

    // Get Message Text
    const msg = e.target.elements.msg.value;

    // Emit a Message to the Server
    socket.emit('chatMessage', msg);

    // Clear Input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

// Output Message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
                        <p class="text">
                            ${message}
                        </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}