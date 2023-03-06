import path from 'path'

import express from 'express'

import { createApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

import axios from 'axios'

import compile from './script/compile.js'

import entranceHtml from './template/entrance-html.js'

const app = express()

app.get('/client.js', (_, res) => {
  res.setHeader('Content-Type', 'text/javascript')
  res.sendFile(path.join(path.resolve(), './src/client.js'))
})

app.get('/', async (_, res) => {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/todos'
    )
    const data = response.data

    const readFilePath = await compile('/src/view/Component.vue')

    const component = await import(path.join(path.resolve(), readFilePath))

    const vm = createApp(component.default, { list: data })

    const html = await renderToString(vm)

    res.send(entranceHtml(html, data))
  } catch (err) {
    res.status(500).send('服务器错误')
  }
})

app.listen(3001, () => {
  console.log('Server listening on port 3001')
})
