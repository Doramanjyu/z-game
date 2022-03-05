export type Item = {
  id: number
  label: string
  onUse?: () => void
}

export type ItemUpdater = (items: Item[]) => Item[]

export const itemLabels: { [id: number]: string } = {
  0: 'nut (edible)',
}
