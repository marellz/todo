<template>
  <div class="list page">
    <div class="list--title">
      <div class="container pt-4">
        <div class="d-flex flex-column list--title-wrap border-bottom pb-4 mb-4">
          <h1 class="font-weight-light">
            <span class="list--theme-cirlce" :style="`background-color:${list.bg}`"></span>
            <b>{{list.title}}</b>
          </h1>
          <h6
            class="text-cultured font-weight-semibold"
            v-if="tasks.length"
          >{{completed}} of {{tasks.length}} tasks</h6>
          <h6 class="text-cultured font-weight-semibold" v-else>No tasks</h6>
        </div>
      </div>
    </div>
    <div class="list--content pt-5">
      <div class="container">
        <list-item
          @edit="editTask"
          @delete="toggleTaskDelete"
          @evadeDelete="evadeTaskDelete"
          v-for="(task, index) in tasks"
          :item="task"
          :key="index"
          :index="index"
        />
      </div>
    </div>
    <div class="list--page-nav">
      <div class="container py-3">
        <div class="d-flex align-items-center">
          <router-link class="btn text-cultured" :to="{name:'home'}">
            <div class="d-flex">
              <arrow-left-icon size="20" />
              <h6 class="mb-0 ml-2">Back home</h6>
            </div>
          </router-link>
          <div class="ml-auto d-flex">
            <button class="btn text-danger" @click="deletePrompt = true">
              <trash-2-icon />
            </button>
            <button class="ml-3 btn btn-primary" @click="taskModal=true">
              <plus-icon />
            </button>
          </div>
        </div>
      </div>
    </div>
    <form @submit.prevent="newTask.id ? updateTask() : addTask()">
      <modal
        :title="newTask.id ? 'Edit task' : 'Add new task'"
        :active="taskModal"
        @close="closeModal"
      >
        <div class="row">
          <div class="col-sm-12">
            <form-input label="Name" :required="true" v-model="newTask.name" />
          </div>
          <div class="col-sm-12">
            <form-input label="Due" :required="true" v-model="newTask.due" />
          </div>
          <!-- <div class="col-sm-12"></div> -->
        </div>
        <template slot="footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-dismiss="modal"
            @click="closeModal"
          >Close</button>
          <button class="btn btn-primary" v-if="newTask.id">Update task</button>
          <button class="btn btn-primary" v-else>Save task</button>
        </template>
      </modal>
    </form>
    <prompt
      :show="deletePrompt"
      action="Are you sure you want to delete this list?"
      @close="deletePrompt = false"
      @confirm="deleteList"
    ></prompt>
  </div>
</template>
<script>
import {
  PlusIcon,
  ArrowLeftIcon,
  Trash2Icon /*XIcon*/
} from "vue-feather-icons";
import ListItem from "@/components/lists/ListItem.vue";
export default {
  name: "List",
  components: {
    PlusIcon, // XIcon,
    ArrowLeftIcon,
    Trash2Icon,

    ListItem
  },
  props: {
    id: {
      required: true
    }
  },
  data() {
    return {
      taskModal: false,
      newTask: {
        name: "",
        due: ""
      },
      deleteTimeout: null,
      deletePrompt: false,
      deletableTask: {
        index: null,
        id: null
      }
    };
  },
  computed: {
    list() {
      var l = this.$store.getters.list;
      return l ? l : {};
    },
    tasks() {
      return this.list.tasks ? this.list.tasks : [];
    },
    completed() {
      return this.tasks.filter(task => {
        return task.complete;
      }).length;
    }
  },
  methods: {
    updateList() {
      this.$store.dispatch("updateList", this.list);
    },
    deleteList() {
      this.$store.dispatch("deleteList", this.list);
      this.$router.push({ name: "home" });
    },
    addTask() {
      var t = this.newTask;
      if (t.name && t.due) {
        this.newTask.todolist_id = this.id;
        this.$store.dispatch("createTask", this.newTask);
        this.taskModal = false;
        this.newTask = {};
      }
    },
    editTask(index) {
      this.newTask = this.tasks[index];
      this.taskModal = true;
    },
    updateTask() {
      this.taskModal = false;
      this.$store.dispatch("updateTask", this.newTask);
      this.newTask = {};
    },
    toggleTaskDelete(item) {

      // deletable = true
      var task = this.list.tasks[item.index];
      this.deletableTask = item;
      task.delete = true;
      this.deleteTimeout = setTimeout(this.confirmTaskDelete, 3000);
    },
    evadeTaskDelete() {

      // deletable = false

      clearTimeout(this.deleteTimeout);
      this.tasks[this.deletableTask.index].delete = false;
    },

    confirmTaskDelete() {
      this.$store.dispatch("deleteTask", this.deletableTask.id);
    },

    closeModal() {
      this.taskModal = false;
      if (this.newTask.id) {
        this.newTask = {};
      }
    }
  },
  mounted() {
    this.$store.dispatch("getList", this.id);
  },
  destroyed() {
    this.$store.commit("clearList");
  }
};
</script>