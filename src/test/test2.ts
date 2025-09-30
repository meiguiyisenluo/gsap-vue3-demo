type FlowItem<Name, T> = {
  name: Name,
  action: () => Promise<T>,
  afterAction: (res: T, next: (name: Name) => void) => void,
}

const defineArr = (arr: FlowItem<这里应该怎么填>[]) => arr

const arr = [
  {
    name: 'stepA',
    action: () => Promise.resolve(1),
    afterAction(res) { console.log(res) }
  },
  {
    name: 'stepB',
    action: () => Promise.resolve('1'),
    afterAction(res) { console.log(res) }
  },
  {
    name: 'stepC',
    action: () => Promise.resolve(true),
    afterAction(res) { console.log(res) }
  },
]
defineArr(arr)


