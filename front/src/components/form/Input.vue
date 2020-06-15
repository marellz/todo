<template>
  <div
    class="form-group custom-form form-input"
    :class="{
      'required' : required, 
      'disabled':disabled, 
      'has-bg': bgIcon != null, 
      'has-label': label!=null
    }"
  >
    <label
      v-if="label"
      :for="givenId"
    >{{ label }}</label>
    <input
      :id="givenId"
      v-model="val"
      :type="type"
      class="form-control"
      :style="background"
      :class="{ customClass,'form-control-sm' : size=='sm', 'form-control-lg':size=='lg','has-error':error}"
      :name="name"
      :aria-describedby="helpId"
      :required="required"
      :disabled="disabled"
    >
    <span
      v-if="placeholder && (val == null || val == '')"
      class="placeholder"
    >{{ placeholder }}</span>
    <small
      v-if="error"
      :id="helpId"
      class="form-text"
    >{{ error }}</small>
  </div>
</template>
<script>
export default {
  name: "FormInput",
  props: {
    type: {
      type: String,
      default: "text"
    },

    placeholder: {
      type: String,
      default: null
    },

    required: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    },

    label: {
      type: String,
      default: null
    },

    size: {
      type: String,
      default: null
    },

    error: {
      type: [String, Array],
      default: null
    },

    hasError: {
      type: Boolean,
      default: false
    },

    name: {
      type: String,
      default: null
    },

    customClass: {
      type: String,
      default: null
    },

    value: {
      type: [String, Number],
      default: ""
    },

    id: {
      type: String,
      default: null
    },

    bgIcon: {
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
    background() {
      if (this.bgIcon) {
        return `background-image:url('/images/svg/${this.bgIcon}.svg')`;
      } else {
        return null;
      }
    },
    status() {
      return {};
    },
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
    },
    helpId() {
      return this.generatedId;
    }
  },
  watch: {
    val(value) {
      this.$emit("input", value);
    },
    value(v){
      this.val = v
    }
  }
};
</script>
