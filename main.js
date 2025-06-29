// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const menu = document.getElementById('menu');
    
    if (mobileToggle && menu) {
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            menu.classList.toggle('active');
        });
    }
});

// Chat functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.querySelector('.chat-message input');
    const sendButton = document.querySelector('.chat-message .button');
    const chatLog = document.getElementById('chat-log');
    
    if (chatInput && sendButton && chatLog) {
        // Send message on button click
        sendButton.addEventListener('click', function() {
            sendMessage();
        });
        
        // Send message on Enter key
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        function sendMessage() {
            const message = chatInput.value.trim();
            if (message) {
                // Add user message to chat
                const userMessage = document.createElement('li');
                userMessage.innerHTML = `
                    <span class="avatar user">User</span>
                    <div class="message">${message}</div>
                `;
                chatLog.appendChild(userMessage);
                
                // Clear input
                chatInput.value = '';
                
                // Simulate bot response (you can replace this with actual chatbot logic)
                setTimeout(() => {
                    const botMessage = document.createElement('li');
                    botMessage.innerHTML = `
                        <span class="avatar bot">AI</span>
                        <div class="message">Thanks for your message! I'm a demo chatbot. In a real implementation, I would process your question about the portfolio.</div>
                    `;
                    chatLog.appendChild(botMessage);
                    
                    // Scroll to bottom
                    const scrollArea = document.querySelector('.scroll-area');
                    if (scrollArea) {
                        scrollArea.scrollTop = scrollArea.scrollHeight;
                    }
                }, 1000);
                
                // Scroll to bottom
                const scrollArea = document.querySelector('.scroll-area');
                if (scrollArea) {
                    scrollArea.scrollTop = scrollArea.scrollHeight;
                }
            }
        }
    }
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Prevent default behavior for empty links
document.addEventListener('DOMContentLoaded', function() {
    const emptyLinks = document.querySelectorAll('a[href="#"]');
    
    emptyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
}); 