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
    <div class="list--content">
      <div class="container pb-3">
        <!-- deletables -->

        <template v-if="deletableTasks.length">
          <div
            class="d-flex align-items-center py-2"
            v-for="(item, index) in deletableTasks"
            :key="index"
          >
            <span class="pl-4">Task ID: {{item}} has been deleted</span>
            <div class="ml-auto">
              <button class="btn btn-sm text-danger" @click="preventDelete(item)">Undo</button>
            </div>
          </div>
        </template>
      </div>
      <div class="container">
        <!-- tasks -->

        <div v-for="(task, index) in tasks" :key="index">
          <task
            v-if="!deletableTasks.includes(task.id)"
            @edit="editTask"
            @delete="deleteTask"
            :item="task"
            :index="index"
          />
        </div>
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
            <button class="ml-3 btn btn-primary" @click="openModal">
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
            <div class="picker-group">
              <date-picker
                @close="datepickerActive = false"
                :active="datepickerActive"
                :required="true"
                v-model="newTask.dueDate"
              >
                <input
                  type="text"
                  v-model="newTask.dueDate"
                  placeholder="Date"
                  class="form-control"
                  @focus="datepickerActive = true"
                />
              </date-picker>
              <time-picker
                @close="timepickerActive = false"
                :active="timepickerActive"
                :required="true"
                v-model="newTask.dueTime"
              >
                <input
                  type="text"
                  v-model="newTask.dueTime"
                  placeholder="Time"
                  class="form-control"
                  @focus="timepickerActive = true"
                />
              </time-picker>
            </div>
          </div>
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
import { PlusIcon, ArrowLeftIcon, Trash2Icon } from "vue-feather-icons";
import Task from "@/components/lists/Task.vue";
export default {
  name: "List",
  components: {
    PlusIcon,
    ArrowLeftIcon,
    Trash2Icon,

    Task
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
      deleteTimeout: {},
      deletePrompt: false,
      deletableTasks: [],

      datepickerActive: false,
      timepickerActive: false
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
      if (t.name && t.dueDate && t.dueTime) {
        t.todolist_id = this.id;
        t.due = `${t.dueDate} ${t.dueTime}`
        this.$store.dispatch("createTask", t);
        this.closeModal()
      }
    },
    editTask(index) {
      this.newTask = this.tasks[index];
      this.taskModal = true;
    },
    updateTask() {
      this.$store.dispatch("updateTask", this.newTask);
      this.closeModal()
    },

    deleteTask(task) {
      if (!this.deletableTasks.includes(task)) {
        this.deletableTasks.push(task);
      }
      this.deleteTimeout[task] = setTimeout(() => {
        this.confirmTaskDelete(task);
      }, 3000);
    },

    preventDelete(id) {
      clearTimeout(this.deleteTimeout[id]);
      var index = this.deletableTasks.indexOf(id);
      this.deletableTasks.splice(index, 1);
    },

    confirmTaskDelete(id) {
      console.log("confirmed");
      var index = this.deletableTasks.indexOf(id);
      this.deletableTasks.splice(index, 1);
      this.$store.dispatch("deleteTask", id);
    },

    openModal(){
      this.taskModal =  true
      this.newTask.name = ''
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