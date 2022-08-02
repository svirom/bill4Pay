import { chooseLang } from '@/js/lang';
import { getInitialTimer } from '@/js/timer';

const renderButton = (button, currency) => {
  const buttonInner = document.createElement('span');

  button.classList.add('bill4PayButton', `bill4PayButton-${currency}`);
  buttonInner.textContent = currency;
  button.appendChild(buttonInner);
}

const renderModal = (id, currency, lang, data) => {
  const [initialHours, initialMinutes, initialSeconds, initialProgress] = getInitialTimer(data);

  chooseLang[lang] ? lang : lang = 'en-US';

  const modalContainer = document.createElement('div');
  const modalDialog = document.createElement('div');

  const modalClose = document.createElement('div');

  const modalCurrency = document.createElement('div');

  const modalCounter = document.createElement('div');
  const modalCounterProgress = document.createElement('div');
  const modalCounterProgressSpan = document.createElement('span');
  const modalCounterText = document.createElement('div');
  const modalCounterTime = document.createElement('div');
  const modalCounterHours = document.createElement('span');
  const modalCounterMinutes = document.createElement('span');
  const modalCounterSeconds = document.createElement('span');

  const modalQr = document.createElement('div');
  const modalQrImg = document.createElement('img');

  const modalAddress = document.createElement('div');
  const modalAddressValue = document.createElement('div');
  const modalAddressValueSpan = document.createElement('span');
  const modalAddressCopy = document.createElement('div');
  const modalAddressCopySpan = document.createElement('span');

  const modalAmount = document.createElement('div');
  const modalAmountValue = document.createElement('div');
  const modalAmountValueSpan = document.createElement('span');
  const modalAmountCopy = document.createElement('div');
  const modalAmountCopySpan = document.createElement('span');

  const modalButtonContainer = document.createElement('div');
  // const modalButton = document.createElement('button');
  const modalButton = document.createElement('a');

  modalContainer.id = id;
  modalContainer.classList.add('bill4Pay');
  document.body.appendChild(modalContainer);

  modalDialog.classList.add('bill4Pay-dialog');
  modalContainer.appendChild(modalDialog);

  // close button
  modalClose.id = `bill4Pay-${currency}-close`;
  modalClose.classList.add('bill4Pay-close');
  modalDialog.appendChild(modalClose);

  // currency
  modalCurrency.classList.add('bill4Pay-currency', currency);
  modalDialog.appendChild(modalCurrency);

  // counter
  modalCounter.classList.add('bill4Pay-counter', 'bill4Pay-row');
  modalCounterProgress.classList.add('bill4Pay-counter__progress');
  modalCounterProgressSpan.style.width = `${initialProgress}%`;
  modalCounterProgress.appendChild(modalCounterProgressSpan);
  modalCounterText.classList.add('bill4Pay-counter__text');
  (initialProgress <= 0) ? modalCounterText.classList.add('expired') : '';
  modalCounterText.textContent = (initialProgress > 0) ? chooseLang[lang].text : chooseLang[lang].textExpired;
  modalCounterTime.classList.add('bill4Pay-counter__time');
  modalCounterHours.classList.add('bill4Pay-counter__hours');
  modalCounterHours.textContent = initialHours;
  modalCounterTime.appendChild(modalCounterHours);
  modalCounterTime.append(':');
  modalCounterMinutes.classList.add('bill4Pay-counter__minutes');
  modalCounterMinutes.textContent = initialMinutes;
  modalCounterTime.appendChild(modalCounterMinutes);
  modalCounterTime.append(':');
  modalCounterSeconds.classList.add('bill4Pay-counter__seconds');
  modalCounterSeconds.textContent = initialSeconds;
  modalCounterTime.appendChild(modalCounterSeconds);
  modalCounter.appendChild(modalCounterProgress);
  modalCounter.appendChild(modalCounterText);
  modalCounter.appendChild(modalCounterTime);
  modalDialog.appendChild(modalCounter);

  // qr
  modalQr.classList.add('bill4Pay-qr', 'bill4Pay-row');
  modalQrImg.src = data.qr_link;
  modalQr.appendChild(modalQrImg);
  modalDialog.appendChild(modalQr);

  // address
  modalAddress.classList.add('bill4Pay-link', 'bill4Pay-row');
  modalAddressValue.classList.add('bill4Pay-link__value');
  modalAddressValueSpan.textContent = data.address;
  modalAddressValue.appendChild(modalAddressValueSpan);
  modalAddressCopy.classList.add('bill4Pay-link__clipboard');
  modalAddressCopySpan.textContent = chooseLang[lang].address;
  modalAddressCopy.appendChild(modalAddressCopySpan);
  modalAddress.appendChild(modalAddressValue);
  modalAddress.appendChild(modalAddressCopy);
  modalDialog.appendChild(modalAddress);

  // amount
  modalAmount.classList.add('bill4Pay-link', 'bill4Pay-row');
  modalAmountValue.classList.add('bill4Pay-link__value');
  modalAmountValueSpan.textContent = parseFloat(data.amount) + parseFloat(data.fee_external);
  modalAmountValue.append(modalAmountValueSpan, ' ', data.currency_iso);
  modalAmountCopy.classList.add('bill4Pay-link__clipboard');
  modalAmountCopySpan.textContent = chooseLang[lang].amount;
  modalAmountCopy.appendChild(modalAmountCopySpan);
  modalAmount.appendChild(modalAmountValue);
  modalAmount.appendChild(modalAmountCopy);
  modalDialog.appendChild(modalAmount);

  // button
  modalButtonContainer.classList.add('bill4Pay-button');
  // modalButton.type = 'button'; 
  modalButton.href = encodeURI(`${currency}:${data.address}?amount=${data.amount}&label=${data.service_name}&message=${data.desc}`); 
  modalButton.target = '_blank';
  modalButton.classList.add('bill4Pay-button__pay');
  modalButton.textContent = chooseLang[lang].pay;
  modalButtonContainer.appendChild(modalButton);
  modalDialog.appendChild(modalButtonContainer); 
}

const renderModalSuccess = (id, currency, lang, data) => {
  if (data.success_url) { 
    location = data.success_url ;
  } else if (data.unsuccess_url) {
    location = data.unsuccess_url;
  } else {
    chooseLang[lang] ? lang : lang = 'en-US';

    const isModal = document.querySelector(`#${id}`);
  
    let modalContainer;
    let modalDialog;
  
    if (isModal) {
      modalContainer = document.querySelector(`#${id}`);
      modalDialog = modalContainer.querySelector('.bill4Pay-dialog');
      modalDialog.innerHTML = '';
    } else {
      modalContainer = document.createElement('div');
      modalContainer.id = id;
      modalContainer.classList.add('bill4Pay');
      document.body.appendChild(modalContainer);
      modalDialog = document.createElement('div');
      modalDialog.classList.add('bill4Pay-dialog');
      modalContainer.appendChild(modalDialog);
    }
  
    const modalClose = document.createElement('div');
  
    const modalCurrency = document.createElement('div');
  
    const modalSuccess = document.createElement('div');
    const modalSuccessTitle = document.createElement('h3');
    const modalSuccessP = document.createElement('p');
  
    const modalButtonContainer = document.createElement('div');
    const modalButton = document.createElement('button');
  
    // modal dialog
    modalDialog.classList.add('bill4Pay-dialog-success');
  
    // // close button
    modalClose.id = `bill4Pay-${currency}-close`;
    modalClose.classList.add('bill4Pay-close');
    modalDialog.appendChild(modalClose);
  
    // // currency
    modalCurrency.classList.add('bill4Pay-currency', currency);
    modalDialog.appendChild(modalCurrency);
  
    // success
    modalSuccess.classList.add('bill4Pay-success');
    modalSuccessTitle.textContent = chooseLang[lang].successTitle;
    modalSuccessP.textContent = chooseLang[lang].successText;
    modalSuccess.appendChild(modalSuccessTitle);
    modalSuccess.appendChild(modalSuccessP);
    modalDialog.appendChild(modalSuccess);
  
    // button
    modalButtonContainer.classList.add('bill4Pay-button');
    modalButton.type = 'button'; 
    modalButton.classList.add('bill4Pay-button__pay', 'bill4Pay-button__close');
    modalButton.textContent = chooseLang[lang].closeButton;
    modalButtonContainer.appendChild(modalButton);
    modalDialog.appendChild(modalButtonContainer);
  } 
}

const renderPreloader = (id) => {
  const preloaderContainer = document.createElement('div');
  const preloaderDiv = document.createElement('div');
  const preloaderDiv2 = document.createElement('div');
  const preloaderDiv3 = document.createElement('div');
  const preloaderDiv4 = document.createElement('div');

  preloaderContainer.id = id;
  preloaderContainer.classList.add('bill4Pay', 'bill4Pay-spinner');
  document.body.appendChild(preloaderContainer);

  preloaderContainer.appendChild(preloaderDiv);
  preloaderContainer.appendChild(preloaderDiv2);
  preloaderContainer.appendChild(preloaderDiv3);
  preloaderContainer.appendChild(preloaderDiv4);
}

export { renderButton, renderModal, renderModalSuccess, renderPreloader };
