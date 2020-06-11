<template>
  <div class="list page">
    <div class="list--title">
      <div class="container py-5">
        <div class="d-flex flex-column list--title-wrap border pb-4 mb-4">
          <h1 class="font-weight-light">
            <b>{{list.title}}</b>
          </h1>
          <h6 class="text-cultured font-weight-semibold">{{completed.length}} of {{tasks.length}} tasks</h6>
        </div>
      </div>
    </div>
    <div class="list--content pb-5">
      <div class="container">
        <div class="custom-checkbox" v-for="(task, index) in tasks" :key="index">
          <div class="form-check">
            <label class="form-check-label" :for="`task-index-${index}`">
              <input
                type="checkbox"
                class="form-check-input"
                :id="`task-index-${index}`"
                @change="updateTask(index)"
                v-model="task.complete"
              />
              {{task.name}}
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="list--page-nav">
      <div class="container">Nav</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "List",
  props: {
    index: {
      required: true
    }
  },
  computed: {
    lists() {
      var storeLists = this.$store.getters.lists;
      return storeLists ? storeLists : [];
    },
    list() {
      return this.lists.length ? this.lists[this.index] : {};
    },
    tasks() {
      return this.list.tasks ? this.list.tasks : [];
    },
    completed() {
      return this.tasks.filter(task => {
        return task.complete;
      });
    }
  },
  methods: {
      updateTask(){
          
      }
  },
};
</script>