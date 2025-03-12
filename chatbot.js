/* Replace the entire content of chatbot.js with the following code for chatbot functionality */

document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const chatInput = document.querySelector('.chat-input');
    const sendButton = document.querySelector('.chat-send');
    const chatWindow = document.querySelector('.chat-window');

    // Predefined responses mapped to lower-case user questions
    const responses = {
        "what is your major": "I am majoring in Computer Science at Penn State University Park.",
        "what languages do you know": "I am proficient in Python, JavaScript, HTML, CSS, and I'm always learning new languages.",
        "how can i contact you": "You can contact me at jfk6111@psu.edu.",
        "what year are you": "I'm currently a freshman.",
        "tell me about yourself": "I'm a passionate computer science student, eager to learn and innovate in technology."
    };

    // Helper function to append a message to the chat window
    function appendMessage(message, sender) {
        const messageElem = document.createElement('div');
        messageElem.classList.add(sender); // 'user' or 'bot'
        messageElem.innerText = message;
        chatWindow.appendChild(messageElem);
        // Auto-scroll to the latest message
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // Process user input: send message and respond after a delay
    function processUserInput() {
        let text = chatInput.value.trim();
        if (text === '') {
            return; // Ignore empty messages
        }
        // Append user's message
        appendMessage(text, 'user');
        // Clear the input field
        chatInput.value = '';

        // Convert message to lower case for matching
        const lowerText = text.toLowerCase();
        // Get corresponding bot response or default message
        let botResponse = responses[lowerText] || "Sorry, I didn't quite understand that. Could you please rephrase?";

        // Mimic typing delay before showing bot's response (500ms delay)
        setTimeout(function() {
            appendMessage(botResponse, 'bot');
        }, 500);
    }

    // Listen for click event on send button
    sendButton.addEventListener('click', processUserInput);
    
    // Listen for Enter key press in the chat input field
    chatInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            processUserInput();
        }
    });

    // Add functionality to sample questions: on hover and on click
    const sampleItems = document.querySelectorAll('.chatbot-header .chat-samples ul li');
    sampleItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add click animation by adding a temporary class
            item.classList.add('clicked');
            setTimeout(() => { item.classList.remove('clicked'); }, 200);
            // Populate the user input box with the clicked question
            chatInput.value = item.innerText;
        });
    });
});