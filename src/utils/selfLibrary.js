// eslint-disable-next-line import/prefer-default-export
export const getTimeKeyGenerator = () => {
  let preTimeValue = null;
  let sameTimeKeyCounter = 0;
  const getTimeKey = () => {
    const newTimeValue = Date.now();

    let newTimeKey = null;
    if (newTimeValue === preTimeValue) {
      newTimeKey = Number(`${newTimeValue}${String(sameTimeKeyCounter).padStart(2, 0)}`);
    } else {
      preTimeValue = newTimeValue;
      sameTimeKeyCounter = 0;
      newTimeKey = Number(`${newTimeValue}${String(sameTimeKeyCounter).padStart(2, 0)}`);
    }
    sameTimeKeyCounter += 1;
    // console.log('newTimeKey: ', newTimeKey);

    return newTimeKey;
  };
  return getTimeKey;
};
