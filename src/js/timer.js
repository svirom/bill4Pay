const getTimer = (data) => {
  

  // const timeDeadline = data.deadline_at;
  const timeDeadline = 1654880046;
  const timeNow = Math.floor(Date.now() / 1000);
  const timeRemains = timeDeadline - timeNow;

  console.log(timeDeadline, timeNow, timeRemains);
};

export { getTimer };