import path from 'path'

import express from 'express'

import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

import axios from 'axios'

import { CLIENT_ENTRY_NAME, OUTPUT_FILE_NAME } from '../config.js'

import Component from '../dist/component.js'

import entranceHtml from './template/entrance-html.js'

const app = express()

const clientPath = `/${OUTPUT_FILE_NAME}/${CLIENT_ENTRY_NAME}.js`

app.get(clientPath, (_, res) => {
  res.setHeader('Content-Type', 'text/javascript')
  res.sendFile(path.join(path.resolve(), clientPath))
})

app.get('/', async (_, res) => {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/todos'
    )
    const data = response.data

    const vm = createSSRApp(Component, { list: data })

    const html = await renderToString(vm)

    res.send(entranceHtml(html, data))
  } catch (err) {
    res.status(500).send('服务器错误')
  }
})

app.listen(3001, () => {
  console.log('Server listening on port 3001')
})
