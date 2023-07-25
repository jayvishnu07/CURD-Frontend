import React from 'react'

//libraries
import { toast } from 'react-toastify';
import { css } from 'glamor';

//style sheets
import 'react-toastify/dist/ReactToastify.css';


const ShowToast = ({ message, type }) => {
  const toastOptions = {
    position: 'top-right',
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: true,
    theme: 'colored',
  };

  switch (type) {
    case 'error':
      toast.error(<b style={{ color: '#000' }}>{message}</b>, {
        className: 'error_toast_message',
        ...toastOptions,
      });
      break;
    case 'success':
      toast.success(<b style={{ color: '#000' }}>{message}</b>, {
        className: 'success_toast_message',
        ...toastOptions,
      });
      break;
    case 'warn':
      toast.warn(<b style={{ color: '#000' }}>{message}</b>, {
        className: 'warn_toast_message',
        ...toastOptions,
      });
      break;
    case 'info':
      toast.dark(<b style={{ color: '#000' }}>{message}</b>, {
        className: css({
          background: '#pink',
        }),
        className: css({
          background: '#pink',
        }),
        ...toastOptions,
      });
      break;

    default:
      break;
  }
};

export default ShowToast;



