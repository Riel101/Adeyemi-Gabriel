const toggleOpen = document.querySelector('#toggle-open');
const toggleClose = document.querySelector('#toggle-close');
const navLinks = document.querySelector('#nav-links');
const links = document.querySelectorAll('li');

toggleOpen.addEventListener('click', function(){
    navLinks.classList.remove('hidden');
    toggleOpen.classList.add('hidden');
    toggleClose.classList.remove('hidden');
})

toggleClose.addEventListener('click', function(){
    navLinks.classList.add('hidden');
    toggleOpen.classList.remove('hidden');
    toggleClose.classList.add('hidden');
})

links.forEach(function(link){
    link.addEventListener('click', function(){
        navLinks.classList.add('hidden');
    })
})