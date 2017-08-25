const keyHandle = () => {
  const events = [];
  let start = 0;
  let end = 0;
  let keyCode = 0;
  return (e, re) => {
    if (re.type === 'react-keydown') {
      if (start === 0) {
        start = re.timeStamp;
        keyCode = e.keyCode;
      }
    }
    if (re.type === 'react-keyup') {
      if (start !== 0) {
        const interval = end === 0 ? 0 : start - end;
        end = re.timeStamp;
        const duration = end - start;
        events.push({
          keyCode,
          duration,
          interval,
        });
        start = 0;
      }
    }
    if (start === 0) {
      console.log(events);
    }
  };
};

export default keyHandle();
