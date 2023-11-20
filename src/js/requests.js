const getBillData = async (guid, currency) => {
  const response = await fetch(`https://api.cryptoprocessingcenter.com/v0/payments/${guid}/${currency}`);
  
  if (response.status === 200) {
    const data = await response.json();
    console.log(`https://api.cryptoprocessingcenter.com/v0/payments/${guid}/${currency}`);
    return data;
  } else {
    throw new Error('Unable to get data');
  }
}

export { getBillData };