<template>
  <div class="home-list-item">
    <div class="card" :style="`background-color:${item.bg ? item.bg : '#456990'}`">
      <div class="card-header">
        <h5 class="card-title">{{item.title}}</h5>
      </div>
      <template v-if="hasTasks">
        <ul class="list-group list-group-flush">
          <li
            class="list-group-item"
            :class="{'complete':task.complete}"
            v-for="(task, i) in tasks"
            :key="i"
          >{{task.name}}</li>
        </ul>
      </template>
      <template v-else>
        <ul class="list-group list-group-flush">
          <div class="d-flex justify-content-center mt-3 mb-2">
            <img src="@/assets/img/create.svg" height="50" alt />
          </div>
          <span class="list-group-item text-center font-italic no-tasks">Click to add tasks.</span>
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
  computed: {
    hasTasks() {
      return this.item.tasks && this.item.tasks.length;
    },
    tasks() {
      return this.hasTasks
        ? this.item.tasks.filter((task, index) => {
            return index <= 3;
          })
        : [];
    }
  },
  methods: {}
};
</script>