<template>
  <div
    class="number-input-spinner row no-wrap items-center justify-between"
    :style="[wrapperWidth]"
  >
    <q-btn
      round
      flat
      :disable="!allowDecrement"
      :text-color="!allowDecrement ? 'grey-6' : undefined"
      size="sm"
      icon="mdi-chevron-left"
      @click="decrement()"
    />
    <div class="q-px-xs">{{ number }}</div>
    <q-btn
      round
      flat
      :disable="!allowIncrement"
      :text-color="!allowIncrement ? 'grey-6' : undefined"
      size="sm"
      icon="mdi-chevron-right"
      @click="increment()"
    />
  </div>
</template>

<script>
export default {
  name: "NumberInputSpinner",
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: undefined
    },
    max: {
      type: Number,
      default: undefined
    },
    width: {
      type: [Number, String]
    }
  },
  data() {
    return {
      number: 0
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.number = val;
      }
    },
    number(val) {
      this.$emit("input", val);
    }
  },
  computed: {
    allowIncrement() {
      return !this.max || (this.max && this.number < this.max);
    },
    allowDecrement() {
      return !this.min || (this.min && this.number > this.min);
    },
    wrapperWidth() {
      if (!this.width) return {};
      const width =
        typeof this.width === "number" ? this.width + "px" : this.width;
      return {
        width
      };
    }
  },
  methods: {
    increment() {
      if (this.allowIncrement) {
        this.number++;
      }
    },
    decrement() {
      if (this.allowDecrement) {
        this.number--;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.number-input-spinner {
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 2px 3px;
}
</style>
