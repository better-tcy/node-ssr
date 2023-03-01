// 获取初始状态
const initialState = window.__INITIAL_STATE__

console.log(initialState)

// 创建一个 Vue 实例
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
