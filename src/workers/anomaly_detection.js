export default () => {
  self.sum = arr => arr.reduce((a,b) => a + b, 0)
  self.mean = arr => arr.reduce((a,b) => a + b, 0) / arr.length

  self.outlier_detection = (raw) => {
    let toArray = Array.from(raw)
    let sequence = toArray.map(d => d.value);
    let sequence_mean = self.mean(sequence);
    let squares = sequence.map(d => Math.pow(d - sequence_mean, 2));
    let variance = self.sum(squares) / sequence.length;
    let standart_deviation = Math.sqrt(variance);
    let min = sequence_mean - 3 * standart_deviation;
    let max = sequence_mean + 3 * standart_deviation;

    return toArray.filter(x => x.value > max || x.value < min);
  }

  self.addEventListener("message", (e) => {
    if (!e) return;

    let outliers_found = self.outlier_detection(e.data)

    postMessage({ outliers_found, sequence: e.data })
  });
};