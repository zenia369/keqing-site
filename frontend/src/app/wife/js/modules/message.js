const colors = {
  200: "linear-gradient(to right, #00b09b, #96c93d)",
  error: "linear-gradient(to right, #ff5f6d, #ffc371)",
};

export default (status, message) => {
  Toastify({
    text: message,
    duration: 5000,
    close: true,
    gravity: "bottom",
    position: "center",
    stopOnFocus: true,
    style: {
      background: colors[status] ?? colors["error"],
    },
  }).showToast();
};
