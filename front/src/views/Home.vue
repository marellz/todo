<template>
  <div class="home page">
    <div class="home--title">
      <div class="container py-5">
        <div class="d-flex home--title-wrap">
          <h1 class="font-weight-light mx-auto">
            <b class="font-weight-semibold">Tasks</b>
            <span class="text-cultured">Lists</span>
          </h1>
        </div>
      </div>
    </div>

    <template v-if="newListForm.active">
      <div class="container">
        <form @submit.prevent="newList">
          <div class="d-flex justify-content-end">
            <button type="button" class="btn" @click="newListForm.active = false">
              <x-icon />
            </button>
          </div>
          <div class="form-group">
            <label for>Create new list</label>
            <input
              type="text"
              v-model="newListForm.name"
              class="form-control"
              placeholder
              aria-describedby="helpId"
            />
          </div>
          <button
            class="btn btn-primary btn-block"
            :disabled="newListForm.name==null || newListForm.name == ''"
          >Add List</button>
        </form>
      </div>
    </template>

    <template v-else>
      <div class="home--add-list">
        <button class="btn" @click="newListForm.active=true">
          <span class="icon">
            <plus-icon />
          </span>
          <p class="mb-0 mt-3">Add List</p>
        </button>
      </div>
    </template>

    <div class="home--list">
      <template v-if="lists.length">
        <div class="container">
          <carousel
            :perPageCustom="[[0,1],[480, 2], [768, 3]]"
            :paginationEnabled="false"
            :items="itemSpan"
            class="home--item-carousel"
          >
            <slide v-for="(item, i) in lists" :key="i">
              <router-link :to="{ name:'list', params: {index: i }}">
                <home-list :index="i" :item="item" />
              </router-link>
            </slide>
          </carousel>
        </div>
      </template>
      <template v-else>
        <div class="container">
          <div class="d-flex flex-column align-items-center">
          <h3>No Lists currently.</h3>
          <p class="text-cultured">Add one</p>

          </div>
        </div>
      </template>
    </div>

    <!-- navigation -->

    <div class="navigation">
      <nav class="nav">
        <!-- <router-link :to="{}"></router-link> -->
      </nav>
    </div>
  </div>
</template>

<script>
import HomeList from "@/components/HomeList";
import { Carousel, Slide } from "vue-carousel";
import { PlusIcon, XIcon } from "vue-feather-icons";
export default {
  name: "Home",
  components: {
    HomeList,
    Carousel,
    Slide,
    PlusIcon,
    XIcon
  },
  data() {
    return {
      itemSpan: 2,
      newListForm: {
        active: false
      }
    };
  },
  computed: {
    lists() {
      return this.$store.getters.lists;
    }
  },
  methods: {
    newList() {
      this.$store.dispatch("newList", { title: this.newListForm.name });
      (this.newListForm.active = false), (this.newListForm.name = null);
    }
  },
  mounted() {
    this.$store.dispatch("getLists");
  }
};
</script>
