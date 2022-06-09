import { chooseLang } from '@/js/lang';
import { fontAdd } from '@/js/font-add';
import { copyToClipboard } from '@/js/clipboard';
import { modalAction } from '@/js/modal-action';
import { getBillData } from '@/js/requests';
import { renderModal } from '@/js/views';
import { getTimer } from '@/js/timer';

// Test import of styles
import '@/styles/style.css';

// forEach fix for ie11
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

const appButton = document.querySelector('#app_button');
const guid = appButton.dataset.appGuid;
const currency = appButton.dataset.appCurrency;
const lang = appButton.dataset.appLang;
const fontLink = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap';
const appModalId = 'bill4Pay';

let clipboards;

chooseLang[lang] ? appButton.textContent = chooseLang[lang].button : appButton.textContent = chooseLang['en-US'].button;

const getData = async () => {
  const data = await getBillData(guid, currency);
  
  if (data) {
    renderModal(appModalId, currency, lang, data);
    getTimer(lang, data);

    clipboards = document.querySelectorAll('.bill4Pay-link__clipboard');

    // copy to clipboard
    clipboards.forEach((clipboard) => {
      clipboard.addEventListener('click', (e) => {
        copyToClipboard(e.target);
      });
    })

    // modal image open
    appButton.addEventListener('click', (e) => {
      e.preventDefault();
      modalAction(appModalId, 'open');
    })

    // modal image close outside
    document.body.addEventListener('click', (e) => {
      modalAction(appModalId, 'closeOutside', e);

      if (e.target.id === 'bill4Pay-close') {
        e.preventDefault();
        modalAction(appModalId, 'close');
      }
    })

  }
}

getData();

// add styles link
document.addEventListener('DOMContentLoaded', () => {
  fontAdd(fontLink);
});
