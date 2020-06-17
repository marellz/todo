<template>
  <div class="home page">
    <div class="home--title">
      <div class="container py-4">
        <div class="d-flex home--title-wrap">
          <h1 class="font-weight-light mx-auto">
            <b class="font-weight-semibold">Tasks</b>
            <span class="text-cultured">Lists</span>
          </h1>
        </div>
      </div>
    </div>

    <form @submit.prevent="newList">
      <modal
        @close="newListForm.active= false"
        title="Create new list"
        :active="newListForm.active"
      >
        <form-input label="List name" v-model="newListForm.name" />
        <color-selector label="List color" :colors="colors" v-model="newListForm.bg" />
        <template slot="footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="newListForm.active = false"
          >Close</button>
          <button
            class="btn btn-primary"
            :disabled="newListForm.name==null || newListForm.name == ''"
          >Save list</button>
        </template>
      </modal>
    </form>

    <div class="home--add-list">
      <button class="btn btn-no-shadow" @click="newListForm.active=true">
        <span class="icon">
          <plus-icon size="18" />
        </span>
        <p class="mb-0 mt-3 small text-cultured">Add List</p>
      </button>
    </div>

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
              <router-link :to="{ name:'list', params: {id: item.id }}">
                <home-list :index="i" :item="item" />
              </router-link>
            </slide>
          </carousel>
        </div>
      </template>
      <template v-else>
        <div class="container">
          <div class="d-flex flex-column align-items-center">
            <img src="@/assets/img/empty.svg" height="100" alt="">
            <h3 class="mt-3">No Lists currently</h3>
            <p class="text-cultured">It's a little boring.</p>
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
import HomeList from "@/components/lists/HomeList";
import { Carousel, Slide } from "vue-carousel";
import { PlusIcon } from "vue-feather-icons";

export default {
  name: "Home",
  components: {
    HomeList,
    Carousel,
    Slide,
    PlusIcon
  },
  data() {
    return {
      itemSpan: 2,
      newListForm: {
        active: false
      },
      colors: [
        "#EF767A",
        "#456990",
        "#49BEAA",
        "#1A1423",
        "#9A275A",
        "#016FB9",
        "#6D8EA0"
      ]
    };
  },
  computed: {
    lists() {
      return this.$store.getters.lists;
    }
  },
  methods: {
    newList() {
      var n = this.newListForm;
      if(!n.bg){
        n.bg = this.colors[0]
      }
      this.$store.dispatch("newList", { title: n.name, bg: n.bg });
      this.newListForm = {
        active: false
      };
    }
  },
  mounted() {
    this.$store.dispatch("getLists");
  }
};
</script>
