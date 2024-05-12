<script setup lang="ts" name="Child">
import { defineProps, defineEmits, inject } from "vue";
import { usePiniaStore, usePiniaStore2 } from "~/stores/usePinia";
import { storeToRefs } from "pinia";

interface Props {
  message: string;
  count: number;
}
const props = withDefaults(defineProps<Props>(), {
  message: "Hello, World!",
  count: 0,
});
const emits = defineEmits<{
  (event: "update-message", payload: string): void;
}>();

const childName = ref("child");

defineExpose({ childName });

const injectName = inject("name");

// const props = defineProps({
//   message: String,
//   count: {
//     type: Number,
//     default: 0,
//   },
// });

console.log("Child", props);

onMounted(() => {
  console.log("Child mounted");
});

onUpdated(() => {
  console.log("Child updated");
});

onUnmounted(() => {
  console.log("Child unmounted");
});

// Create an instance of the store
const piniaStore = usePiniaStore2();
const { text } = storeToRefs(piniaStore);
const { increment, decrement } = piniaStore;

piniaStore.$subscribe((mutation, state) => {
  console.log("piniaStore", state);
});

const updatePiniaText = () => {
  piniaStore.text = "updated";
};

const patchPiniaText = () => {
  piniaStore.$patch({
    text: "patched",
  });
};

const changeParentName = (parent: any) => {
  // parent.name = "parent change";
  console.log(parent);
  parent.name = "change name";
};
</script>

<template>
  <div class="flex gap-2 flex-wrap">
    <div>ChildName:{{ childName }}</div>
    <div>Inject:{{ injectName }}</div>
    <slot />
    <div>Child:{{ message }}{{ count }}</div>
    <Button @click="emits('update-message', 'childEmit')">Emit</Button>
    <Button @click="changeParentName($parent)">$parent</Button>
    <div>{{ $attrs }}</div>
  </div>
  <div class="flex gap-2 flex-wrap flex-col">
    <div>pinia:{{ text }}</div>
    <div>piniaTextLength:{{ piniaStore.getTextLength }}</div>
    <Button @click="increment('+')"> ++ </Button>
    <Button @click="decrement('-')"> -- </Button>
    <Button @click="updatePiniaText">update pinia</Button>
    <Button @click="patchPiniaText">patch pinia</Button>
  </div>
</template>
