import { State } from './lib/StateMachine'
import DialogManager from './DialogManager'

interface hasDialogger {
  hasDialog: boolean
}

export const newDialogState = (
  dm: DialogManager,
  npc: hasDialogger,
  texts: string[],
  loops: number,
  onDone?: () => void,
) => {
  const doneState: State = {
    nextStates: {},
    tick: () => {
      onDone && onDone()
      return null
    },
  }
  let cnt = 0
  return {
    nextStates: { done: doneState },
    tick: () => {
      dm.showMessage(texts[cnt % texts.length])
      cnt += 1
      if (loops < 1) {
        return null
      }
      return cnt < loops * texts.length ? null : 'done'
    },
    enter: () => {
      npc.hasDialog = true
    },
    leave: () => {
      npc.hasDialog = false
    },
  }
}
