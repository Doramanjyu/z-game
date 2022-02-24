type DialogOption = {
  timeout?: number
}

export class DialogManager {
  readonly messageBox: HTMLDivElement

  private timeoutTimer?: ReturnType<typeof setTimeout>

  constructor(messageBox: HTMLDivElement) {
    this.messageBox = messageBox
  }

  showMessage(text: string, opt?: DialogOption) {
    if (this.timeoutTimer) {
      clearTimeout(this.timeoutTimer)
    }
    this.messageBox.innerHTML = text
    this.messageBox.style.display = 'block'
    this.messageBox.classList.remove('hide')

    if (opt?.timeout) {
      this.timeoutTimer = setTimeout(this.hideMessage.bind(this), opt.timeout)
    }
  }

  hideMessage() {
    this.messageBox.classList.add('hide')
  }
}
