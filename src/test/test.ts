

const defineArr = <
  T extends readonly { name: string, action: () => Promise<unknown>, afterAction: (res: Result, next: (name: Name) => void) => void }[],
  Name extends T[number]['name'],
  Result extends Awaited<ReturnType<T[number]['action']>>
>(arr: T): T => arr

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


