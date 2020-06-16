<template>
  <div class="form-group custom-form custom-form--color color-selector">
    <label v-if="label">{{ label }}</label>
    <div class="color-selector--list">
      <div v-for="(item, index) in colors" :key="index" class="color-selector--item">
        <input :type="type" :id="`${givenId}-${index}`" :value="item" name="color-choice" class="color-selector--input" v-model="val" />
        <label :for="`${givenId}-${index}`" class="color-selector--label">
          <span class="color-selector--box" :style="`background-color:${item}`"></span>
        </label>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ColorSelector",
  props: {
    label: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: "radio"
    },
    colors: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      val: this.value
    };
  },
  computed: {
    givenId() {
      if (this.id != null) {
        return this.id;
      }
      var chars =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_-+={}[]><.,?/~|",
        id = [];
      for (let index = 0; index < 5; index++) {
        var randomIndex = Number(Math.random() * chars.length).toFixed(0);
        id.push(chars[randomIndex]);
      }
      var identifier = this.$route.name
        ? this.$route.name + "-" + this.type
        : this.type;
      id.push(`-${identifier}`);
      id = id.join("");

      return id;
    }
  },
  watch: {
    val(v) {
      this.$emit("input", v);
    },
    value(v) {
      this.val = v;
    }
  }
};
</script>