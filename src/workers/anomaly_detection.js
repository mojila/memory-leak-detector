export default () => {
  self.sum = arr => arr.reduce((a,b) => a + b, 0)
  self.mean = arr => arr.reduce((a,b) => a + b, 0) / arr.length

  self.outlier_detection = (raw) => {
    let sequence = Array.from(raw).map(d => d.value);
    let sequence_mean = self.mean(sequence);
    let squares = Array.from(sequence).map(d => Math.pow(d - sequence_mean, 2));
    let variance = self.sum(squares) / sequence.length;
    let standart_deviation = Math.sqrt(variance);
    let min = sequence_mean - 3 * standart_deviation;
    let max = sequence_mean + 3 * standart_deviation;

    let outliers = Array.from(raw).filter(x => x.value > max || x.value < min);

    return outliers;
  }

  self.addEventListener("message", (e) => {
    if (!e) return;

    let results = self.outlier_detection(e.data)

    postMessage({ outliers_found: results, sequence: e.data })
  });
};