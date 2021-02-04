class Keyboard {
  private keydownHandle(e: KeyboardEvent) {
    if (e.ctrlKey) {
      console.log(e);
    }
  }
  register() {
    document.addEventListener("keydown", this.keydownHandle.bind(this));
  }
  remove() {
    document.removeEventListener("keydown", this.keydownHandle.bind(this));
  }
  ctrlZ(cb: () => void) {
    cb();
  }
}

export default Keyboard;
