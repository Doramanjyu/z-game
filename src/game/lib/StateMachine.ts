class StateMachine {
  private readonly initial: State
  private readonly states: Map<State, null>
  current: State

  constructor(initial: State) {
    this.current = nopState
    this.initial = initial
    this.states = new Map<State, null>()
    this.set(initial)

    const next = [initial]
    while (next.length > 0) {
      const n = next.pop()
      if (!n) {
        continue
      }
      this.states.set(n, null)
      Object.values(n.nextStates).forEach(
        (s) => this.states.has(s) || next.push(s),
      )
    }
  }

  set(s: State) {
    this.current.leave && this.current.leave()
    this.current = s
    s.enter && s.enter()
  }

  tick() {
    const next = this.current.tick()
    if (next === null) {
      return
    }
    console.log(next, this.current.nextStates)
    this.set(this.current.nextStates[next])
  }

  reset() {
    this.current = nopState
    this.states.forEach((v, s) => s.reset && s.reset())
    this.set(this.initial)
  }

  handler(s: State) {
    return () => {
      if (this.current === s) {
        this.tick()
      }
    }
  }
}

export type State = {
  nextStates: { [name: string]: State }
  tick: () => string | null
  reset?: () => void
  enter?: () => void
  leave?: () => void
}

export const nopState = {
  nextStates: {},
  tick: () => null,
}

export default StateMachine
