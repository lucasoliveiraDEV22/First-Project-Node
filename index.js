/*
- Query Params => meusite.com/users?nome=rodolfo&age=28
-Route Params => /users/2  //BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
-Request Body => { "name":"Rodolfo", "age":33}
- GET   => Buscar informação no Back-End
- POST => Criar informação no Back-End
- PUT / PATCH => Alterar/Atualizar Informação no Back-End
- DELETE => Deletar informação no Back-End

-MIDDLEWARE => Interceptador => Têm o poder de parar ou alterar dados da requisição
*/

import cors from 'cors'
const port = 3001
const express = require ('express')
const app = express ()
app.use (express.json())
const uuid = require ('uuid')
app.use (cors())

// EXEMPLO DE MIDDLEWARE 👇
/*const myFirstMiddleware = (request, response, next) => {
    console.log ('Fui chamado')

    next()

    console.log ('Finalizamos')
}
app.use (myFirstMiddleware)*/
// AGORA, VOU CRIAR UM PROJETO PRÁTICO PARA ALTERAR E DELETAR USUÁRIO, SÓ QUE CHAMANDO AS FUNÇÕES ANTES DE TODAS AS ROTAS!!
const checkUserId = (request, response, next) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)
    if (index < 0) {
        return response.status(404).json({ error: "User not found" })
    }
    request.userIndex = index
    request.userId = id
    next()
}

const users = []
app.get('/users', (request, response) => {
    //console.log ('A rota foi chamada')
    return response.json(users)
})


app.post('/users', (request, response) => {
    const { name, age } = request.body
    //console.log(uuid.v4())
    
    const user = {id: uuid.v4(), name, age}
    users.push(user)
    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex
    const id = request.userId
    const { name,age } = request.body
    const updatedUser = { id, name, age}
    users[index] = updatedUser
    //console.log (index)

    return response.json(updatedUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex
    users.splice (index,1)
    //console.log (index)

    return response.status(204).json()
})



app.listen (port, () =>  {
    console.log(`🚀 Server started on port ${port}`)
})

