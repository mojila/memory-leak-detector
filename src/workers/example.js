export default () => {
  self.addEventListener("message", e => {
    if (!e) return;

    postMessage(e.data)
  });
};