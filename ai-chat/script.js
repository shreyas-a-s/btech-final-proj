document.getElementById('send-btn').addEventListener('click', function() {
  const userInput = document.getElementById('user-input').value.trim();

  if (userInput !== '') {
    addChatMessage(userInput, 'user-message');
    document.getElementById('user-input').value = '';

    // Simulate bot response
    setTimeout(function() {
      addChatMessage('Hello there', 'bot-message');
    }, 500);
  }
});

function addChatMessage(message, messageType) {
  const chatWindow = document.getElementById('chat-window');
  const messageElement = document.createElement('div');
  messageElement.className = `chat-message ${messageType}`;
  messageElement.textContent = message;
  chatWindow.appendChild(messageElement);

  // Scroll to the bottom of the chat window
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
