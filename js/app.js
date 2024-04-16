const toggleOpen = document.querySelector('#toggle-open');
const toggleClose = document.querySelector('#toggle-close');
const navLinks = document.querySelector('#nav-links');
const links = document.querySelectorAll('li');
const senderName = document.getElementById('sender-name');
const senderEmail = document.getElementById('sender-email');
const senderMessage = document.getElementById('email-message');
const backToTop = document.getElementById('back-to-top');
const sentMsg = document.getElementById('sent-msg');
const submitBtn = document.getElementById('submitBtn');
const closeSentMsg =document.getElementById('close-sent-msg');

// show nav
toggleOpen.addEventListener('click', function(){
    navLinks.classList.remove('hidden');
    toggleOpen.classList.add('hidden');
    toggleClose.classList.remove('hidden');
})

// hide nav
toggleClose.addEventListener('click', function(){
    navLinks.classList.add('hidden');
    toggleOpen.classList.remove('hidden');
    toggleClose.classList.add('hidden');
})

// hide nav after li click
links.forEach(function(link){
    link.addEventListener('click', function(){
        navLinks.classList.add('hidden');
    })
})

// back to top arrow
window.addEventListener('scroll', function(){
    if(scrollY <= '550'){
        backToTop.classList.add('hidden');
    } else {
        backToTop.classList.remove('hidden');
    }
})

// Send email functionality
function sendMail() {
    const params = {
        "from_name" : senderName.value,
        "email": senderEmail.value,
        "message": senderMessage.value
    };

    emailjs.send("service_5tkmm1g", "template_gy7au79", params).then(
            (response) => {
              alert('Email Sent!', response.status, response.text);
            },
            (error) => {
              alert('Email not sent!', error);
            },
        )
    }
    
    
    submitBtn.addEventListener('click', () => {
        // evt.preventDefault;
        sendMail();
    })