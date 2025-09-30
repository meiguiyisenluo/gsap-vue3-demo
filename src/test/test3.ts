const watch = <T>(obj: T): {
  on: <K extends string & keyof T>(
    prop: `${K}Changed`,
    handler: (newValue: T[K], oldValue: T[K]) => void
  ) => void
} => {
  console.log(obj)
  return {
    on(prop, handler) {
      console.log(prop, handler)
    }
  }
}

watch({
  name: 'John',
  age: 30
}).on('nameChanged', (newValue, oldValue) => { oldValue.slice(0, 1) })
