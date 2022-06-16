// import { chooseLang } from '@/js/lang';
import { fontAdd } from '@/js/font-add';
import { copyToClipboard } from '@/js/clipboard';
import { modalAction } from '@/js/modal-action';
import { getBillData } from '@/js/requests';
import { renderButton, renderModal, renderModalSuccess } from '@/js/views';
import { getTimer } from '@/js/timer';

// Test import of styles
import '@/styles/style.css';

// forEach fix for ie11
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

const appButton = document.querySelector('#bill4PayButtonBitcoin');
const guid = appButton.dataset.appGuid;
const currency = appButton.dataset.appCurrency;
const lang = appButton.dataset.appLang;
const fontLink = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap';
const appModalId = `bill4Pay-${currency}`;

let clipboards;

// chooseLang[lang] ? appButton.textContent = chooseLang[lang].button : appButton.textContent = chooseLang['en-US'].button;

renderButton(appButton, currency);

const getData = async () => {
  const data = await getBillData(guid, currency);
  
  if (data) {
    data.paid_at ? renderModalSuccess(appModalId, currency, lang, data) : renderModal(appModalId, currency, lang, data);
    getTimer(appModalId, lang, data);

    const modal = document.querySelector(`#${appModalId}`);

    clipboards = modal.querySelectorAll('.bill4Pay-link__clipboard');

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

      if ( (e.target.id === `bill4Pay-${currency}-close`) || (e.target.classList.contains('bill4Pay-button__close')) ) {
        e.preventDefault();
        modalAction(appModalId, 'close');
      }
    })

    

    let i = 0;

    const checkBill = async () => {
      const checkData = await getBillData(guid, currency);
      i++;
      console.log('yes', checkData.paid_at, i);
      return checkData;
    }

    let checkInterval = setInterval(() => {
      const getData = checkBill();

      getData.then((result) => {        

        // if (result.paid_at) {
        //   clearInterval(checkInterval);
        //   renderModalSuccess(appModalId, currency, lang, data);
        // }

        // if (i === 2) {
        //   clearInterval(checkInterval);
        //   renderModalSuccess(appModalId, currency, lang, data);
        // }
      });
    }, 5000);

  }
}

getData();

// add styles link
document.addEventListener('DOMContentLoaded', () => {
  fontAdd(fontLink);
});
