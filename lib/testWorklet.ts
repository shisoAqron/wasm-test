const messageFromWorklet = "worklet";
const logHeaderWorklet = "[" + messageFromWorklet + "] ";

class testProcessor extends AudioWorkletProcessor {
  private firstProcess = false;
  constructor() {
    super();

    this.port.postMessage({ 
      from: messageFromWorklet,
      command: "callback", 
      type: "worklet-init",
      params: null
    });
  }

  process(_inputs: Float32Array[][], _outputs: Float32Array[][], _parameters: Record<string, Float32Array>): boolean {
    if(!this.firstProcess) {
      console.log(`${logHeaderWorklet}process(first time)`);
      this.firstProcess = true;
    }
    return true;
  }
}

registerProcessor("test-processor", testProcessor);