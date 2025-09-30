// 你希望：
// 每项都必须有 name、action()、afterAction() 三个字段
// action() 的返回值类型自动推导为 R
// afterAction(res) 的 res 类型必须是该项的 R
// 整个数组必须是只读、结构统一、类型安全

// Arr应该如何写
type Arr = unknown

const arr: Arr = [
  { name: 'stepA', action: () => Promise.resolve(1), afterAction(res) { /* res 是 number */ } },
  { name: 'stepB', action: () => Promise.resolve('1'), afterAction(res) { /* res 是 string */ } },
  { name: 'stepC', action: () => Promise.resolve(true), afterAction(res) { /* res 是 boolean */ } },
]

console.log(arr)
