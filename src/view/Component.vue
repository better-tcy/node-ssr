<template>
  <div>
    <div @click="clientFun">客户端交互（点击此处 然后看控制台）</div>
    <div v-for="item in list" :key="item.id">{{ item.title }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  list: {
    type: Array,
    default: []
  }
})

const clientFun = () => {
  console.log('客户端交互')
}
</script>
