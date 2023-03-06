const initialState = window.__INITIAL_STATE__

const app = Vue.createApp({
  data() {
    return {
      list: initialState.data
    }
  },
  template: `
    <div>
      <ul>
        <li v-for="item in list" :key="item.id">
          {{ item.title }}
        </li>
      </ul>
    </div>
  `
})

app.mount('#app')
