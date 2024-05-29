<script setup lang="ts">
const { data: FakeTest } = await useAsyncData('jsonplaceholder', async () => {
  const test = $fetch('https://jsonplaceholder.typicode.com/todos/1')
  const aaa = await test
  console.log(aaa)
  return test
})


console.log('data', FakeTest)

</script>






<template>
  <div>about</div>
</template>
