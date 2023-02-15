// import { chooseLang } from '@/js/lang';
import { linkAdd } from '@/js/link-add';
import { copyToClipboard } from '@/js/clipboard';
import { modalAction } from '@/js/modal-action';
import { getBillData } from '@/js/requests';
import { renderButton, renderModal, renderModalSuccess, renderPreloader } from '@/js/views';
import { getTimer } from '@/js/timer';

// Test import of styles
import '@/styles/style.css';

// forEach fix for ie11
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

let buttons = document.querySelectorAll('[data-app-guid]');

const btn = [];
const mainButton = document.querySelector('#bill4PayButton');
const mainModalId = 'bill4Pay-modal';
const appPreloaderId = 'bill4Pay-preloader';

const fontLink = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap';
const stylesLink = 'https://code.bill4pay.com/widget-popup/v1/styles/main.css';

// buttons ids array
buttons.forEach((button) => btn.push(button.id));

// add styles link
document.addEventListener('DOMContentLoaded', () => {
  linkAdd(fontLink);
  linkAdd(stylesLink);
});

// render main button
document.addEventListener('DOMContentLoaded', () => {
  mainButton.style.display = 'block';
});

renderPreloader(appPreloaderId);

// main modal open
mainButton.addEventListener('click', (e) => {
  e.preventDefault();
  modalAction(mainModalId, 'open');
});

// main modal close
document.body.addEventListener('click', (e) => {
  modalAction(mainModalId, 'closeOutside', e);

  if (e.target.id === `bill4Pay-modal-close`) {
    e.preventDefault();
    modalAction(mainModalId, 'close');
  }
})

// make buttons logic
buttons.forEach((elem) => {

  const appButton = elem;
  const guid = appButton.dataset.appGuid;
  const currency = appButton.dataset.appCurrency;
  const lang = appButton.dataset.appLang;
  const btnText = appButton.dataset.appBtntext;
  
  const appModalId = `bill4Pay-${currency}`;
  // const appPreloaderId = `bill4Pay-${currency}-preloader`;

  let clipboards;

  // document.addEventListener('DOMContentLoaded', () => {
  //   appButton.style.display = 'block';
  // });

  renderButton(appButton, currency, btnText);

  const getData = async () => {
    const data = await getBillData(guid, currency);
  
    if (data) {
      // appButton.style.display = 'block';
  
      data.paid_at ? renderModalSuccess(appModalId, currency, lang, data) : renderModal(appModalId, currency, lang, data);
      data.paid_at ? '' : getTimer(appModalId, lang, data);
      // getTimer(appModalId, lang, data);
  
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

  
  // renderPreloader(appPreloaderId);

  appButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    // modalAction(appPreloaderId, 'open');
    modalAction(appPreloaderId, 'open');
  
    const receiveData = getData();
    receiveData.then(() => {
      modalAction(mainModalId, 'close');
      modalAction(appModalId, 'open');
      // modalAction(appPreloaderId, 'close');
      modalAction(appPreloaderId, 'close');
    });
  }, { once: true });

})
