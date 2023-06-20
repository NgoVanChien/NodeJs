type Handle = () => Promise<string>
const fullname = 'Galvin Ngo'
const person: { name: string } = { name: fullname }
const handle: Handle = () => Promise.resolve(fullname)

handle().then(console.log)
