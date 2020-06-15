<template>
  <div
    class="form-group custom-form form-select"
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
    <select
      :id="givenId"
      v-model="val"
      :style="background"
      class="form-control"
      :class="{ customClass,'form-control-sm' : size=='sm', 'form-control-lg':size=='lg','has-error':hasError}"
      :name="name"
      :aria-describedby="helpId"
      :required="required"
      :disabled="disabled"
    >
      <slot />
      <template v-if="options.length">
        <option
          v-for="(givenOption,i) in givenOptions"
          :key="i"
          :value="givenOption.value"
        >
          {{ givenOption.label }}
        </option>
      </template>
    </select>
    <span
      v-if="placeholderMode"
      class="placeholder"
    >{{ placeholder }}</span>
    <small
      v-if="status"
      :id="helpId"
      class="form-text"
      :class="{'text-danger':status.error, 'text-success':status.success, 'text-muted':!status.success && !status.error}"
    >{{ status.message }}</small>
  </div>
</template>
<script>
export default {
  name: "FormSelect",
  props: {
    type: {
      type: String,
      default: "text"
    },

    placeholder: {
      type: String,
      default: "Select"
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
      type: String,
      default: null
    },

    id: {
      type: String,
      default: null
    },
    options: {
      type: Array,
      default: () => {
        return [];
      }
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
    givenOptions() {
      var ops = [];
      if (typeof this.options[0] == "string") {
        this.options.forEach(element => {
          ops.push({ value: element, label: element });
        });
      } else {
        ops = this.options;
      }

      return ops;
    },
    status() {
      if (this.error) {
        var er = typeof this.error == String ? this.error : this.error[0];
        return {
          error: true,
          message: er
        };
      } else {
        return {};
      }
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
    placeholderMode() {
      return this.val == null && this.placeholder != null;
    },
    helpId() {
      return this.generatedId;
    }
  },
  watch: {
    val(value) {
      this.$emit("input", value);
    }
  }
};
</script>
