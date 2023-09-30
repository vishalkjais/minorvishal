const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
// const loginBtn = document.querySelector('.login_button');
const iconClose = document.querySelector('.icon-close');
const btnregister = document.querySelector('.btnregister');

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');

});

// loginBtn.addEventListener('click', () => {
//     wrapper.classList.add('active-popup');
// });

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});

btnregister.addEventListener('click', () => {
    wrapper.classList.remove('active');

});