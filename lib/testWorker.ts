const messageFromWorker = "testWorker.ts";
const logHeaderWorker = "[" + messageFromWorker + "] ";

postMessage({
  from: messageFromWorker,
  command: 'call-back',
  type: 'worker-init',
  params: null
})

self.addEventListener("message", (event) => {
  console.log(`${logHeaderWorker}onmessage`, event.data);
  // workletからのメッセージをmainから受け取る
  // main経由でworkletにメッセージを送る
});