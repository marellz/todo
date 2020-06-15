<template>
  <div class="list--item">
    <div class="form-check">
      <input
        type="checkbox"
        class="form-check-input"
        :id="`task-index-${index}`"
        @change="updateTask(index)"
        v-model="task.complete"
      />
      <label class="form-check-label" :for="`task-index-${index}`">
        <div class="d-flex flex-grow-1">
          <div class="flex-grow-1 ml-2">
            <span class="list--item-title m-0">{{task.name}}</span>
            <br>
            <small class="list--item-due">{{task.due}}</small>
          </div>
          <div class="ml-auto d-flex align-self-start">
            <button class="btn btn-sm py-0 btn-no-shadow" :class="{'text-cultured':task.complete}">
              <more-vertical-icon size="16"/>
            </button>
          </div>
        </div>
      </label>
    </div>
  </div>
</template>
<script>
import { MoreVerticalIcon } from 'vue-feather-icons'
export default {
  name: "ListItem",
  components:{
    MoreVerticalIcon
  },
  props: {
    task: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    updateTask() {
      this.$store.dispatch("updateTask", {
        complete: this.task.complete,
        index: this.index,
        id: this.task.id
      });
    }
  }
};
</script>