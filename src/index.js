// Test import of a JavaScript module
// import { example } from '@/js/example'
import { fontAdd } from '@/js/font-add';
import { copyToClipboard } from '@/js/clipboard';
import { modalAction } from '@/js/modal-action';
import { getBillData } from '@/js/requests';

// Test import of styles
import '@/styles/style.css';

// forEach fix for ie11
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

const appButton = document.querySelector('#app_button');
const guid = appButton.dataset.appGuid;
const fontLink = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap';

document.addEventListener('DOMContentLoaded', () => {
  fontAdd(fontLink);
});


// document.querySelector('.bill4Pay .bill4Pay-counter__progress span').style.width = '25%';

// copy to clipboard
const clipboards = document.querySelectorAll('.bill4Pay-link__clipboard');
clipboards.forEach((clipboard) => {
  clipboard.addEventListener('click', (e) => {
    copyToClipboard(e.target);
  });
})

// modal image open
appButton.addEventListener('click', function(e) {
  e.preventDefault();
  modalAction('#bill4Pay', 'open');
})

// modal image close button
document.querySelector('#bill4Pay-close').addEventListener('click', function(e) {
  e.preventDefault();
  modalAction('#bill4Pay', 'close');
})

// modal image close outside
document.body.addEventListener('click', function(e) {
  modalAction('#bill4Pay', 'closeOutside', e);
})

const getData = async () => {
  const data = await getBillData(guid);
  
  if (data) {
    console.log(`Data: `, data);
  }
  return data;
}

getData();

