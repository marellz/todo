<template>
  <div class="modal modal--custom" :class="{'active':active, }" tabindex="-1" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="header">
            <h5 class="modal-title font-weight-semibold">{{title}}</h5>
          </slot>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="$emit('close')"
          >
            <x-icon size="22"/>
          </button>
        </div>
        <div class="modal-body pb-4">
          <slot>
            <p>Modal body text goes here.</p>
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="$emit('close')"
            >Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </slot>
        </div>
      </div>
    </div>
      <div class="modal-backdrop" @click="$emit('close')"></div>
  </div>
</template>
<script>
import { XIcon } from 'vue-feather-icons'
export default {
  name: "Modal",
  components:{
    XIcon
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "Modal title"
    }
  }
};
</script>