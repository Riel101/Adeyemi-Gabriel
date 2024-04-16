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

    emailjs.sendForm("service_5tkmm1g", "template_gy7au79", params).then(
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams).then(
            (response) => {
              console.log('SUCCESS!', response.status, response.text);
            },
            (error) => {
              console.log('FAILED...', error);
            },
        
    //     sentMsg.classList.replace("translate-x-[100%]", "translate-x-[0%]"),

    //     closeSentMsg.addEventListener('click', () => {
    //     if(sentMsg.classList.contains("translate-x-[0%]")){
    //         sentMsg.classList.replace("translate-x-[0%]", "translate-x-[100%]");
    //     }
    // })
        )
    }
    
    
    submitBtn.addEventListener('click', () => {
        // evt.preventDefault;
        sendMail();
    })