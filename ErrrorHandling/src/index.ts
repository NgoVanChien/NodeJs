interface User {
  name: string
  age: number
}

const render = (user: User) => {
  console.log(user)
}
const user = {
  name: 'Galvin',
  age: 23
}

render(user)
