export class Hello {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }

  sayHello() {
    return `Hello, ${this.name}-san!`;
  }
}