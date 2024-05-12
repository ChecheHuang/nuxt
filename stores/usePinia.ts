import { defineStore } from "pinia";

export const usePiniaStore = defineStore("piniaStore", {
  state: () => ({
    text: "pinia",
  }),
  getters: {
    getTextLength(): number {
      return this.text.length;
    },
  },
  actions: {
    increment(input: string) {
      this.text += input;
    },
    decrement(input: string) {
      this.text = this.text.slice(0, this.text.length - input.length);
    },
  },
});

export const usePiniaStore2 = defineStore("piniaStore2", () => {
  const text = ref("pinia2");
  const getTextLength = computed(() => text.value.length);
  const increment = (input: string) => (text.value += input);
  const decrement = (input: string) =>
    (text.value = text.value.slice(0, text.value.length - input.length));

  return {
    text,
    getTextLength,
    increment,
    decrement,
  };
});