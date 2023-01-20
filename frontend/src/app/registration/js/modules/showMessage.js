import Toastify from "toastify-js";

const showMessage = (message) => {
  Toastify({
    text: message ?? "server error: null",
    duration: 4000,
    close: true,
    gravity: "bottom",
    position: "left",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #ff5f6d, #ffc371)",
    },
  }).showToast();
};

export default showMessage;
