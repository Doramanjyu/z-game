type DialogOption = {
  timeout?: number
}

export interface DialogManagerInterface {
  showMessage(text: string, opt?: DialogOption): void
  hideMessage(): void
}

class DialogManager implements DialogManagerInterface {
  readonly messageBox: HTMLDivElement
  open: boolean

  private text?: string
  private timeoutTimer?: ReturnType<typeof setTimeout>

  constructor(messageBox: HTMLDivElement) {
    this.messageBox = messageBox
    this.open = true
  }

  showMessage(text: string, opt?: DialogOption) {
    if (this.timeoutTimer) {
      clearTimeout(this.timeoutTimer)
      this.timeoutTimer = undefined
    }
    this.text = text
    this.messageBox.innerHTML = `${text} <span class="messageLast"/>`
    this.messageBox.style.display = 'block'
    this.messageBox.classList.remove('hide')
    this.open = true

    if (opt?.timeout) {
      this.timeoutTimer = setTimeout(this.hideMessage.bind(this), opt.timeout)
    }
  }

  hideMessage() {
    if (this.timeoutTimer) {
      clearTimeout(this.timeoutTimer)
      this.timeoutTimer = undefined
    }
    if (this.text) {
      this.messageBox.innerHTML = this.text
    }
    this.messageBox.classList.add('hide')
    this.open = false
  }

  keyup(e: Pick<KeyboardEvent, 'code'>) {
    e.code === 'Space' && this.hideMessage()
  }
}

export default DialogManager
