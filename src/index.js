// import { chooseLang } from '@/js/lang';
import { linkAdd } from '@/js/link-add';
import { copyToClipboard } from '@/js/clipboard';
import { modalAction } from '@/js/modal-action';
import { getBillData } from '@/js/requests';
import { renderMainModal, renderPaymentButton, renderModal, renderModalSuccess, renderPreloader } from '@/js/views';
import { getTimer } from '@/js/timer';

// Test import of styles
import '@/styles/style.css';

// forEach fix for ie11
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

const mainButton = document.querySelector('#bill4PayButton');
const mainModalId = 'bill4Pay-modal';
const appPreloaderId = 'bill4Pay-preloader';

let currencies = mainButton.dataset.appCurrency;
const guid = mainButton.dataset.appGuid;
const lang = mainButton.dataset.appLang;

currencies = currencies.split(',').map(currency => currency.trim());

const fontLink = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap';
const stylesLink = 'https://code.cryptoprocessingcenter.com/widget-popup/v1/styles/main.css';

// add styles link
document.addEventListener('DOMContentLoaded', () => {
  linkAdd(fontLink);
  linkAdd(stylesLink);
});

// render main button
document.addEventListener('DOMContentLoaded', () => {
  mainButton.style.display = 'block';
});

// render main modal
renderMainModal(mainModalId, lang);

// render preloader
renderPreloader(appPreloaderId);

// render payment buttons
currencies.forEach(currency => {
  renderPaymentButton(currency, lang);
});

// main modal open
mainButton.addEventListener('click', (e) => {
  e.preventDefault();
  modalAction(mainModalId, 'open');
});

// main modal close
document.body.addEventListener('click', (e) => {
  modalAction(mainModalId, 'closeOutside', e);

  if (e.target.id === 'bill4Pay-modal-close') {
    e.preventDefault();
    modalAction(mainModalId, 'close');
  }
})

let buttons = document.querySelectorAll('#bill4Pay-modal [data-app-currency]');

// make buttons logic
buttons.forEach((elem) => {
  const appButton = elem;
  const currency = appButton.dataset.appCurrency;  
  const appModalId = `bill4Pay-${currency}`;
  let clipboards;

  const getData = async () => {
    const data = await getBillData(guid, currency);

    if (data) {  
      data.paid_at ? renderModalSuccess(appModalId, currency, lang, data) : renderModal(appModalId, currency, lang, data);
      data.paid_at ? '' : getTimer(appModalId, lang, data);
  
      const modal = document.querySelector(`#${appModalId}`);
  
      clipboards = modal.querySelectorAll('.bill4Pay-link__clipboard');
  
      // copy to clipboard
      clipboards.forEach((clipboard) => {
        clipboard.addEventListener('click', (e) => {
          copyToClipboard(e.target);
        });
      })
  
      // modal open
      appButton.addEventListener('click', (e) => {
        e.preventDefault();
        modalAction(mainModalId, 'close');
        modalAction(appModalId, 'open');
      })
  
      // modal close
      document.body.addEventListener('click', (e) => {
        modalAction(appModalId, 'closeOutside', e);
  
        if ( (e.target.id === `bill4Pay-${currency}-close`) || (e.target.classList.contains('bill4Pay-button__close')) ) {
          e.preventDefault();
          modalAction(appModalId, 'close');
          modalAction(mainModalId, 'open');
        }

      })
  
      // let i = 0;
  
      const checkBill = async () => {
        const checkData = await getBillData(guid, currency);
        // i++;
        // console.log('yes', checkData.paid_at, i);
        return checkData;
      }
  
      let checkInterval = setInterval(() => {
        const getData = checkBill();
  
        getData.then((result) => {        
  
          if (result.paid_at) {
            clearInterval(checkInterval);
            renderModalSuccess(appModalId, currency, lang, data);
          }
  
          // if (i === 2) {
          //   clearInterval(checkInterval);
          //   renderModalSuccess(appModalId, currency, lang, data);
          // }
        });
      }, 5000);
  
    }
  }

  appButton.addEventListener('click', (e) => {
    e.preventDefault();

    modalAction(appPreloaderId, 'open');
  
    const receiveData = getData();

    receiveData.then(() => {
      modalAction(mainModalId, 'close');
      modalAction(appModalId, 'open');
      modalAction(appPreloaderId, 'close');
    });
  }, { once: true });

})
