// @ts-ignore workletPathの 型が 不明なため
import workletPath from "./testWorklet.ts?worker&url";

const messageFrom = "testClass.ts";
const logHeader = "[" + messageFrom + "] ";

export class TestClass {
  private worker: Worker;
  private audioContext?: AudioContext;
  private constructor() {
  
    // workerの読み込み
    this.worker = new Worker(
      new URL("./testWorker.ts", import.meta.url),
      { type: "module" }
    );
  }

  static init() {
    const testClass = new TestClass();
    testClass.worker.onmessage = async (event) => {
      console.log(`${logHeader}onmessage`, event.data);
      await testClass.createProcessNode();
    };
  }

  private async createProcessNode() {
    this.audioContext = new AudioContext({ sampleRate: 16000 });
    await this.audioContext.resume();

    await this.audioContext.audioWorklet.addModule(workletPath).then(() => {
      const testWorkletNode = new AudioWorkletNode(this.audioContext as AudioContext, "test-processor");
      testWorkletNode.port.onmessage = (event) => {
        console.log(`${logHeader}onmessage`, event.data);
      };

      // 中継系の処理もここで書く
    });
  }
}