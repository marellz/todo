<template>
  <div class="list page">
    <div class="list--title">
      <div class="container pt-5">
        <div class="d-flex flex-column list--title-wrap border-bottom pb-4 mb-4">
          <h1 class="font-weight-light">
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
    <div class="list--content pb-5">
      <div class="container">
        <list-item v-for="(task, index) in tasks" :task="task" :key="index" :index="index"/>
      </div>
    </div>
    <div class="list--page-nav">
      <div class="container py-3">
        <div class="d-flex align-items-center">
          <router-link class="text-cultured" :to="{name:'home'}">
            <div class="d-flex">
              <arrow-left-icon />
              <h4 class="mb-0 ml-2">Back home</h4>
            </div>
          </router-link>
          <div class="ml-auto d-flex">
            <button class="btn text-danger" @click="deleteList">
              <trash-2-icon />
            </button>
            <button class="ml-3 btn btn-primary" @click="taskModal=true">
              <plus-icon />
            </button>
          </div>
        </div>
      </div>
    </div>
    <form @submit.prevent="addTask">
      <modal title="Add new task" :active="taskModal" @close="taskModal = false">
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
            @click="taskModal = false"
          >Close</button>
          <button class="btn btn-primary">Save task</button>
        </template>
      </modal>
    </form>
  </div>
</template>
<script>
import {
  PlusIcon,
  ArrowLeftIcon,
  Trash2Icon /*XIcon*/
} from "vue-feather-icons";
import ListItem from "@/components/ListItem.vue";
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
        name:"Pack bags",
        due:"tomorrow morning"
      }
      // list:{}
    };
  },
  computed: {
    list() {
      return this.$store.getters.list;
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
      console.log("saving");

      var t = this.newTask;
      if (t.name && t.due) {
        t.todolist_id = this.id;
        this.$store.dispatch("createTask", t);
        this.taskModal = false;
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