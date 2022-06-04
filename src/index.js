// Test import of a JavaScript module
// import { example } from '@/js/example'
import { fontAdd } from '@/js/font-add';
import { copyToClipboard } from '@/js/clipboard';
import { modalAction } from '@/js/modal-action';
import { getBillData } from '@/js/requests';
import { renderModal } from '@/js/views';

// Test import of styles
import '@/styles/style.css';

// forEach fix for ie11
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

const appButton = document.querySelector('#app_button');
const guid = appButton.dataset.appGuid;
const fontLink = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap';
const appModalId = 'bill4Pay';
// const appModal = document.querySelector(`#${appModalId}`);

let clipboards;

const getData = async () => {
  const data = await getBillData(guid);
  
  if (data) {
    renderModal(appModalId, data);
    clipboards = document.querySelectorAll('.bill4Pay-link__clipboard');

    clipboards.forEach((clipboard) => {
      clipboard.addEventListener('click', (e) => {
        copyToClipboard(e.target);
      });
    })
  }
}

getData();

// add styles link
document.addEventListener('DOMContentLoaded', () => {
  fontAdd(fontLink);
});


// document.querySelector('.bill4Pay .bill4Pay-counter__progress span').style.width = '25%';

// copy to clipboard
// const clipboards = document.querySelectorAll('.bill4Pay-link__clipboard');
// clipboards.forEach((clipboard) => {
//   clipboard.addEventListener('click', (e) => {
//     copyToClipboard(e.target);
//   });
// })

// console.log('Hey: ' + clipboards[0]);

// modal image open
appButton.addEventListener('click', (e) => {
  e.preventDefault();
  modalAction(appModalId, 'open');
})

// modal image close button
// appModal.querySelector('#bill4Pay-close').addEventListener('click', function(e) {
//   e.preventDefault();
//   modalAction(appModalId, 'close');
// })

// modal image close outside
document.body.addEventListener('click', (e) => {
  modalAction(appModalId, 'closeOutside', e);

  if (e.target.id === 'bill4Pay-close') {
    e.preventDefault();
    modalAction(appModalId, 'close');
  }
})

