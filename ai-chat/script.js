document.getElementById('send-btn').addEventListener('click', function() {
  const userInput = document.getElementById('user-input').value.trim();

  if (userInput !== '') {
    addChatMessage(userInput, 'user-message');
    document.getElementById('user-input').value = '';
    showTypingIndicator();

    const headers = {
      'Authorization': 'Bearer MISTRAL_API_KEY',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const data = {
      model: 'open-mistral-nemo-2407',
      messages: [{ role: 'user', content: userInput }],
    };

    axios.post('https://api.mistral.ai/v1/chat/completions', data, { headers: headers })
      .then(response => {
        hideTypingIndicator();
        const content = response.data.choices[0].message.content;
        addChatMessage(content, 'bot-message');
      })
      .catch(error => {
        hideTypingIndicator();
        addChatMessage('Sorry, an error occured: ' + error, 'bot-message');
      });
  }
});

document.getElementById("user-input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent the default form submit behavior
    document.getElementById("send-btn").click(); // Trigger the button click
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

function showTypingIndicator() {
  const chatWindow = document.getElementById('chat-window');
  const typingIndicator = document.createElement('div');
  typingIndicator.className = 'chat-message bot-message typing-indicator';
  chatWindow.appendChild(typingIndicator);

  // Ensure typing indicator is visible
  typingIndicator.style.display = 'block';
}

function hideTypingIndicator() {
  const typingIndicator = document.querySelector('.typing-indicator');
  typingIndicator.style.display = 'none';
  typingIndicator.remove();
}
