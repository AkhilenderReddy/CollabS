import React, { useEffect, useRef } from 'react';

const ToastMsg = ({ message }) => {
  const timeout1 = useRef(null);

  useEffect(() => {
    const toast = document.getElementById('toast');
    timeout1.current = setTimeout(() => {
      toast.classList.add('slideout');
    }, 5000);

    return () => {
      clearTimeout(timeout1.current);
    };
  }, []);

  const closeToast = () => {
    const toast = document.getElementById('toast');
    toast.classList.add('slideout');
    clearTimeout(timeout1.current);
  };

  return (
    <div className='w-0 h-0'>
      <div id='toast' className='toast fixed gap-2 px-5 py-2 top-20 right-3 flex items-center overflow-hidden'>
        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" d="m12 1c-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11-4.925-11-11-11zm4.768 9.14c.0878-.1004.1546-.21726.1966-.34383.0419-.12657.0581-.26026.0477-.39319-.0105-.13293-.0475-.26242-.1087-.38085-.0613-.11844-.1456-.22342-.2481-.30879-.1024-.08536-.2209-.14938-.3484-.18828s-.2616-.0519-.3942-.03823c-.1327.01366-.2612.05372-.3782.1178-.1169.06409-.2198.15091-.3027.25537l-4.3 5.159-2.225-2.226c-.1886-.1822-.4412-.283-.7034-.2807s-.51301.1075-.69842.2929-.29058.4362-.29285.6984c-.00228.2622.09851.5148.28067.7034l3 3c.0983.0982.2159.1748.3454.2251.1295.0502.2681.0729.4069.0665.1387-.0063.2747-.0414.3991-.1032.1244-.0617.2347-.1487.3236-.2554z" fill="#84D65A" fillRule="evenodd"></path>
        </svg>
        <div className='flex flex-col'>
          <p className='font'>Success</p>
          <small>{message}</small>
        </div>
        <svg onClick={closeToast} className='close-toast absolute top-20 right-1 cursor-pointer' height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
          <path d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z" fill="#393a37"></path>
        </svg>
        <div className='progress-bar w-full absolute h-1 bottom-0 right-0 bg-green-500'></div>
      </div>
    </div>
  );
};

export default ToastMsg;
