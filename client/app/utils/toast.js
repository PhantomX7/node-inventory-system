import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastComponent = props => (
  <div className="text-left p-2">
    <h6>{props.message}</h6>
  </div>
);

export function triggerError(message) {
  toast.error(<ToastComponent message={message} />, {
    className: 'toast-error',
    position: toast.POSITION.TOP_RIGHT,
    // autoClose: false,
  });
}

export function triggerErrorFromResponse(response) {
  const { data } = response;
  if (data.errors) {
    const message = data.errors[Object.keys(data.errors)[0]][0];
    triggerError(message);
  } else {
    const { message } = data;
    triggerError(message);
  }
}

export function triggerSuccess(message) {
  toast.success(<ToastComponent message={message} />, {
    className: 'toast-success',
    position: toast.POSITION.TOP_RIGHT,
    // autoClose: false,
  });
}

export function removeToast() {
  toast.dismiss();
}
