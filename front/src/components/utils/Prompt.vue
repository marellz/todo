<template>
  <modal :title="title" @close="close" :active="show">
    <p>{{action}}</p>
    <template slot="footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close">Cancel</button>
      <button type="button" @click="confirm" class="btn btn-primary">Yes, I am</button>
    </template>
  </modal>
</template>
<script>
export default {
  name: "Prompt",
  props: {
    action: {
      type: String,
      default: "Are you sure?"
    },
    title: {
      type: String,
      default: "Confirm"
    },
    show: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    confirm() {
      this.$emit("confirm");
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>