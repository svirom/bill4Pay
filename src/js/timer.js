import { chooseLang } from '@/js/lang';

const getTimer = (lang, data) => {
  
  const timer = setInterval(() => {
    // const timeCreated = data.created_at;
    // const timeDeadline = data.deadline_at;
    const timeCreated =		1654797175;
    const timeDeadline = 		1654797595;
    const timeNow = Math.floor(Date.now() / 1000);
    let timeRemains = timeDeadline - timeNow;

    const progressFull = timeDeadline - timeCreated;
    const progressCurrent = document.querySelector('.bill4Pay-counter__progress span');
    let progressWidth = (timeRemains * 100) / progressFull;

    let hours = document.querySelector('.bill4Pay-counter__hours');
    let minutes = document.querySelector('.bill4Pay-counter__minutes');
    let seconds = document.querySelector('.bill4Pay-counter__seconds');

    if (timeRemains < 0) {
      clearInterval(timer);

      const counterText = document.querySelector('.bill4Pay-counter__text');

      chooseLang[lang] ? lang : lang = 'en-US';

      counterText.classList.add('expired');
      counterText.textContent = chooseLang[lang].textExpired;

      progressCurrent.style.width = `0%`;

      hours.textContent = '00';
      minutes.textContent = '00';
      seconds.textContent = '00';
    } else {

      progressCurrent.style.width = `${progressWidth.toFixed(2)}%`;

      let hoursRemain = Math.floor(timeRemains / 3600);

      timeRemains = timeRemains - (hoursRemain * 3600);
      
      let minutesRemain = Math.floor(timeRemains / 60);
      let secondsRemain = timeRemains - (minutesRemain * 60);

      hoursRemain >= 10 ? hoursRemain : hoursRemain = `0${hoursRemain}`;
      minutesRemain >= 10 ? minutesRemain : minutesRemain = `0${minutesRemain}`;
      secondsRemain >= 10 ? secondsRemain : secondsRemain = `0${secondsRemain}`;

      hours.textContent = hoursRemain.toString();
      minutes.textContent = minutesRemain.toString();
      seconds.textContent = secondsRemain.toString();
    }
  }, 1000);
};

const getInitialTimer = (data) => {
  // const timeCreated = data.created_at;
  // const timeDeadline = data.deadline_at;
  const timeCreated = 1654797175;
  const timeDeadline = 1654797595;
  const timeNow = Math.floor(Date.now() / 1000);
  let timeRemains = timeDeadline - timeNow;
  let hoursRemain = Math.floor(timeRemains / 3600);
  let minutesRemain;
  let secondsRemain;

  const progressFull = timeDeadline - timeCreated;
  let progressWidth = ((timeRemains * 100) / progressFull).toFixed(2);

  if (timeRemains < 0) {
    progressWidth = '0';
    hoursRemain = '00';
    minutesRemain = '00';
    secondsRemain = '00';
  } else {
    timeRemains = timeRemains - (hoursRemain * 3600);
  
    minutesRemain = Math.floor(timeRemains / 60);
    secondsRemain = timeRemains - (minutesRemain * 60);
  
    hoursRemain >= 10 ? hoursRemain : hoursRemain = `0${hoursRemain}`;
    minutesRemain >= 10 ? minutesRemain : minutesRemain = `0${minutesRemain}`;
    secondsRemain >= 10 ? secondsRemain : secondsRemain = `0${secondsRemain}`;
  }

  return [hoursRemain.toString(), minutesRemain.toString(), secondsRemain.toString(), progressWidth];
}

export { getTimer, getInitialTimer };