// Test import of a JavaScript module
// import { example } from '@/js/example'
import { fontAdd } from '@/js/font-add';

// Test import of styles
import '@/styles/style.css';

const fontLink = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap';

document.addEventListener('DOMContentLoaded', () => {
  fontAdd(fontLink);
});




const appButton = document.querySelector('#app_button');

// modal image open
appButton.addEventListener('click', function(e) {
  e.preventDefault();
  let modal = document.querySelector('#bill4Pay');

  modal.classList.add('active');
  modal.classList.add('modal-open');
  document.body.classList.add('overflow-hidden');
})

// modal image close button
document.querySelector('#bill4Pay-close').addEventListener('click', function(e) {
  e.preventDefault();
  const modal = document.querySelector('#bill4Pay');

  modal.classList.remove('active');
  modal.classList.remove('modal-open');
  document.body.classList.remove('overflow-hidden');
})

// modal image close outside
document.body.addEventListener('click', function(e) {
  const modal = document.querySelector('#bill4Pay');
  const matchesModal = e.target.matches('#bill4Pay');

  if ( matchesModal && !e.target.parentElement.classList.contains('.bill4Pay-dialog') ) {
    modal.classList.remove('active');
    modal.classList.remove('modal-open');
    document.body.classList.remove('overflow-hidden');
  }
})

