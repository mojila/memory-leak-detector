export default class WebWorker {
  constructor(worker) {
      let code = worker.toString()
      let blob = new Blob([`(${code})()`])

      return new Worker(URL.createObjectURL(blob))
  }
}