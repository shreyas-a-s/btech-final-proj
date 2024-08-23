document.getElementById('send-btn').addEventListener('click', function() {
  const userInput = document.getElementById('user-input').value.trim();

  if (userInput !== '') {
    addChatMessage(userInput, 'user-message');
    document.getElementById('user-input').value = '';

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
        console.log(response);
        const content = response.data.choices[0].message.content;
        addChatMessage(content, 'bot-message');
      })
      .catch(error => {
        addChatMessage('Sorry, an error occured: ' + error, 'bot-message');
      });
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
