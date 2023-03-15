import { createApp } from 'vue'

import Component from './view/Component.vue'

const initialState = window.__INITIAL_STATE__

const app = createApp(Component, { list: initialState.data })

app.mount('#app')
