import axios from 'axios';

//Custom components
import ShowToast from '../Components/ShowToast';



export const makeGetRequest = (url, setTask, setCount) => {
  axios({
    url,
    method: 'GET',
  })
    .then((res) => { setTask(res?.data?.data); setCount(res?.data?.count); })
    .catch((err) => {
      ShowToast({ message: `${err?.response?.data?.message}`, type: 'error' });
    })
}

export const makePutRequest = (url, data, callbacks) => {
  axios({
    url,
    method: 'PUT',
    data
  })
    .then((res) => {
      if (callbacks.onSuccess && typeof callbacks.onSuccess === 'function') {
        callbacks.onSuccess(res);
        ShowToast({ message: res?.data?.message, type: 'success' });
      }
    })
    .catch((err) => {
      ShowToast({ message: `${err.response.data.message}`, type: 'error' });
    })
}

export const makeDeleteRequest = (url, setRecentEditHappen, setShowDeleteModel) => {
  axios({
    url,
    method: 'DELETE',
  })
    .then((res) => { setRecentEditHappen((prev) => !prev); setShowDeleteModel(false); ShowToast({ message: res?.data?.message, type: 'success' }); })
    .catch((err) => {
      ShowToast({ message: `${err.response.data.message}`, type: 'error' });
    })
}

export const makePostRequest = (url, data, callbacks) => {
  axios({
    url,
    method: 'POST',
    data
  })
    .then((res) => {
      if (callbacks.onSuccess && typeof callbacks.onSuccess === 'function') {
        callbacks.onSuccess();
        ShowToast({ message: res?.data?.message, type: 'success' });

      }
    }).catch((err) => {
      ShowToast({ message: `${err.response.data.message}`, type: 'error' });
    })
}





