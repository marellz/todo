<template>
  <div
    class="list--item"
    :class="{'active':active,'list--item-deletable':task.delete}"
    v-click-outside="disableActive"
  >
    <div class="form-check">
      <input
        type="checkbox"
        class="form-check-input"
        :id="`task-index-${index}`"
        @change="updateTask(index)"
        v-model="task.complete"
      />
      <label class="form-check-label" :for="`task-index-${index}`">
        <div class="d-flex w-100">
          <div class="flex-grow-1 ml-2">
            <span class="list--item-title m-0">{{task.name}}</span>
            <br />
            <small class="list--item-due">{{task.due}}</small>
          </div>
        </div>
      </label>
    </div>
    <div class="ml-auto d-flex list--item-toggler">
      <button
        class="btn btn-sm py-0 btn-no-shadow"
        @click="toggleActive"
        :class="{'text-cultured':task.complete}"
      >
        <x-icon size="18" v-if="active" />
        <more-vertical-icon size="16" v-else />
      </button>
    </div>
    <div class="list--item-options">
      <button class="btn">
        <edit-2-icon size="18" @click="toggleEdit" />
      </button>
      <button class="btn btn-danger" @click="deleteTask">
        <trash-icon size="18" />
      </button>
    </div>
  </div>
</template>
<script>
import {
  MoreVerticalIcon,
  XIcon,
  TrashIcon,
  Edit2Icon
} from "vue-feather-icons";
import ClickOutside from "vue-click-outside";
export default {
  name: "Task",
  components: {
    MoreVerticalIcon,
    XIcon,
    TrashIcon,
    Edit2Icon
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      active: false,
      task: this.item
    };
  },
  methods: {
    updateTask() {
      if (this.active) {
        return false;
      }
      var t = this.task;
      t.index = this.index;
      this.$store.dispatch("updateTask", t);
    },
    toggleEdit() {
      this.$emit("edit", this.index);
      this.toggleActive();
    },
    toggleActive() {
      this.active = !this.active;
    },
    disableActive() {
      this.active = false;
    },
    
    deleteTask(){
      this.active = false
      this.$emit('delete',this.task.id);
      console.log('delete', this.task.id);
      
    },
  },

  directives: {
    ClickOutside
  }
};
</script>