
//libraries
import { toast } from 'react-toastify';

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
  toast[type](message);
};

export default ShowToast;



