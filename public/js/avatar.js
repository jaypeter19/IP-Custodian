document.addEventListener('DOMContentLoaded', () => {
    
    const avatar = document.getElementById('custodianAvatar');
    const speech = document.getElementById('avatarSpeech');
    const speechText = document.getElementById('speechText');

    if (!avatar || !speech || !speechText) {
        return;
    }

    const messages = [
        "Hi! I'm Custodian, your IP expert",
        "Need help with renewals? I've got you! 🛡️",
        "We handle the boring stuff so you don't have to",
        "Click me! I'm friendly 😊",
        "Transparent pricing. No surprises.",
        "Let's talk about your IP needs",
    ];

    let messageIndex = 0;
    let speechTimeout;

    function showSpeech(message) {
        speechText.textContent = message;
        speech.classList.add('show');

        clearTimeout(speechTimeout);
        speechTimeout = setTimeout(() => {
            speech.classList.remove('show');
        }, 3000);
    }

    setTimeout(() => {
        showSpeech(messages[0]);
    }, 2000);

    avatar.addEventListener('click', () => {
        messageIndex = (messageIndex + 1) % messages.length;
        showSpeech(messages[messageIndex]);
    });

    setInterval(() => {
        if (!speech.classList.contains('show')) {
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            showSpeech(randomMessage);
        }
    }, 12000);
})