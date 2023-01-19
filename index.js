/*
- Query Params => meusite.com/users?nome=rodolfo&age=28
-Route Params => /users/2  //BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
-Request Body => { "name":"Rodolfo", "age":33}
- GET   => Buscar informação no Back-End
- POST => Criar informação no Back-End
- PUT / PATCH => Alterar/Atualizar Informação no Back-End
- DELETE => Deletar informação no Back-End
*/

const port = 3000
const express = require ('express')
const app = express ()
app.use (express.json())
const uuid = require ('uuid')


const users = []
app.get('/users', (request, response) => {
    return response.json(users)
})


app.post('/users', (request, response) => {
    const { name, age } = request.body
    //console.log(uuid.v4())
    
    const user = {id: uuid.v4(), name, age}
    users.push(user)
    return response.status(201).json(user)
})

app.put('/users/:id', (request, response) => {
    const {id} = request.params
    const { name,age } = request.body
    const updatedUser = { id, name, age}
    const index = users.findIndex(user => user.id === id)
    if (index < 0) {
        return response.status(404).json({ message: "User not found" })
    }
    users[index] = updatedUser
    //console.log (index)

    return response.json(updatedUser)
})

app.delete('/users/:id', (request, response) => {
    const {id} = request.params
    const index = users.findIndex(user => user.id === id)
    if (index < 0) {
        return response.status(404).json({ message: "User not found" })
    }
    users.splice (index,1)
    //console.log (index)

    return response.status(204).json()
})



app.listen (port, () =>  {
    console.log(`🚀 Server started on port ${port}`)
})

