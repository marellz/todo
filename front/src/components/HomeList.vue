<template>
  <div class="home-list-item">
    <div class="card" :style="`background-color:${item.bg ? item.bg : '#000'}`">
      <div class="card-header">
        <h5 class="card-title">{{item.title}}</h5>
      </div>
      <template v-if="item.tasks.length">
        <ul class="list-group list-group-flush">
          <perfect-scrollbar class="h-100">
            <li
              class="list-group-item"
              @click="toggleComplete(i)"
              :class="{'complete':task.complete}"
              v-for="(task, i) in item.tasks"
              :key="i"
            >{{task.name}}</li>
          </perfect-scrollbar>
        </ul>
      </template>
      <template v-else>
        <ul class="list-group list-group-flush">
          <li class="list-group-item text-center font-italic">No Tasks.</li>
        </ul>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomeList",
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
  methods: {
    toggleComplete(i) {
      this.$store.commit("toggleComplete", { list: this.index, task: i });
    }
  }
};
</script>