<script setup lang="ts">
import { ref, reactive, toRefs, computed, watch, watchEffect } from "vue";
import Child from "./Child.vue";
import JSX from "./JSX.vue";
import { useMouse } from "./useMouse";
import { Input } from "@/components/ui/input";


const cookie = useCookie("NEXT_LOCALE");
const { locale, getLocaleMessage, setLocaleMessage } = useI18n()



const changeLang = () => {
  // console.log(locale.value)
  console.log(getLocaleMessage(locale.value))
  setLocaleMessage('en', {
    hello: 'hahaha'
  })
  locale.value = locale.value === 'en' ? 'zh-tw' : 'en'
}

const name = ref("about");
defineExpose({ name });
provide("name", name);

const child = ref();

const changeChild = () => {
  child.value.childName = "parent change";
};
const getChild = (refs: any) => {
  for (const key in refs) {
    console.log(refs[key]);
  }
};
const toggle = () => {
  console.log("ref", name);
  name.value = name.value === "about" ? "nuxt" : "about";
};

const reactiveData = reactive({
  message: "Hello, World!",
  count: 0,
});
// 使用 toRefs 將 reactive 對象轉換為一個普通對象，其中每個屬性都是一個 ref
const { count, message } = toRefs(reactiveData);

const updateMessage = () => {
  console.log("reactive", reactiveData);
  message.value += "!";
  reactiveData.message += "~";
};

const incrementCount = () => {
  reactiveData.count++;
};

const doubleCount = computed(() => count.value * 2);

watch([() => reactiveData.count], (newValue, oldValue) => {
  console.log("watch", oldValue, newValue);
});
const mouse = useMouse();
// console.log(mouse);

const emitFn = (value: string) => {
  console.log("emitFn", value);
  reactiveData.message = value;
};
</script>
<template>
  <Button @click="changeLang">
    {{ $t('hello') }}
  </Button>
  <div>Home</div>
  <Input v-model="name" type="string" placeholder="name" />
  <Input :modelValue="name" @update:modelValue="name = $event.toString()" type="string" placeholder="name" />
  <Button @click="toggle">toggle Name</Button>

  <div>
    reactiveData.message
    <pre>{{ reactiveData.message }}</pre>
  </div>
  <div>
    Message
    <pre>{{ message }}</pre>
  </div>
  <Button @click="updateMessage">Update Message</Button>
  <div>Count: {{ count }}</div>
  <div>Double Count: {{ doubleCount }}</div>
  <Button @click="incrementCount">Increment Count</Button>

  <Child v-if="count > 0 && count % 3 !== 0" :message="message" :count="doubleCount" @update-message="emitFn"
    ref="child">
    <div class="flex gap-2">
      <Button @click="getChild($refs)"> get child </Button>
      <Button @click="changeChild"> slot change child </Button>
    </div>
  </Child>
  <JSX @update-message="emitFn" :message="'text'" />
  <br />
</template>
