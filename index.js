const express = require('express')
const { Sequelize, DataTypes } = require('sequelize')
const task = require('./models/task')
const Task = require('./models/task')

const app = express()
const sequelize = new Sequelize({ dialect: 'sqlite', storage: './task-list.db' })
const tasks = Task(sequelize, DataTypes)


app.use(express.json())

// Listar as tarefas
app.get('/tasks', async (req, res) => {
  const task = await tasks.findAll()
  res.json({ task})
})

// ciar as tarefas
app.post('/tasks', async(req, res) => {
  const body = req.body
  const task = await tasks.create(body)

  res.json(body)
})


app.get('/tasks/:id', async (req, res) => {
  const taskId = req.params.id
  const task = await tasks.findByPk(taskId)

  res.send({ action: 'Showing task', task })
})

// Fazer update 
app.put('/tasks/:id', async(req, res) => {
  try {
    const taskId = req.params.id
    const body = req.body
    const taskUpdate = await tasks.findByPk(taskId)
    taskUpdate.update({
      description: body.description,
      done: body.done
    })    
    res.send("Updating Task")
  } catch (error) {
    console.log(error);
  } 
})

// Apagar as tarefas
app.delete('/tasks/:id', async(req, res) => {
  try {
    const taskId = req.params.id
    const taskRemove = await tasks.destroy({ where: {id: taskId}})
    res.send({ action: 'Deleting task', taskRemove: taskRemove })
  } catch (error) {
    console.log(error);
  } 
})

app.listen(3000, () => {
  console.log('Iniciando o ExpressJS na porta 3000')
})