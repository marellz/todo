<template>
  <div class="timepicker" v-click-outside="close">
    <slot />
    <template v-if="active">
      <div class="timepicker--group">
        <div class="timepicker--element-wrap">
          <perfect-scrollbar>
            <div class="timepicker-element-item" ref="ps-hour" @click="scroll('ps-hour',index)" v-for="(item, index) in hours" :key="index">
              <input
                type="radio"
                name="hours"
                v-model="timeObj.hours"
                :id="`hour-${item.val}`"
                :value="item.val"
              />
              <label :for="`hour-${item.val}`">{{item.val}}</label>
            </div>
          </perfect-scrollbar>
        </div>
        <div class="timepicker--element-wrap">
          <perfect-scrollbar ref="ps-hour">
            <div class="timepicker-element-item" ref="ps-min" @click="scroll('ps-min',index)" v-for="(item, index) in minutes" :key="index">
              <input
                type="radio"
                name="minute"
                v-model="timeObj.minutes"
                :id="`minute-${index}`"
                :value="item.val"
              />
              <label :for="`minute-${index}`">{{item.val}}</label>
            </div>
          </perfect-scrollbar>
        </div>
        <div class="timepicker--element-wrap">
          <perfect-scrollbar ref="ps-min">
            <div class="timepicker-element-item"  v-for="(item, index) in meridiems" :key="index">
              <input
                type="radio"
                name="meridiem"
                v-model="timeObj.meridiem"
                :id="`meridiem-${item}`"
                :value="item"
              />
              <label :for="`meridiem-${item}`">{{item}}</label>
            </div>
          </perfect-scrollbar>
        </div>
      </div>
       <div class="p-1 d-flex justify-content-center">
        <button type="button" @click="close" class="btn btn-sm">
          <span class="d-inline-block mt-1 mr-2">Close</span>
          <x-icon class="mb-1" size="18"/>
        </button>
      </div>
    </template>
  </div>
</template>
<script>
import { PerfectScrollbar } from "vue2-perfect-scrollbar";
import { XIcon } from 'vue-feather-icons'
import ClickOutside from "vue-click-outside";
export default {
  name: "TimePicker",
  components: { PerfectScrollbar, XIcon },
  props: {
    value: {
      type: String,
    },
    type: {
      type: String
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hours() {
      var hors = [];
      for (let index = 1; index < 12; index++) {
        hors.push({val:this.sanHr(index)});
      }
      hors.unshift("12");
      return hors;
    },
    minutes() {
      var mins = [];
      for (let index = 0; index < 60; index += 5) {
        mins.push({val:this.sanMin(index)});
      }
      return mins;
    },
    time(){
       var hours = this.timeObj.hours,
        minutes = this.timeObj.minutes,
        meridiem = this.timeObj.meridiem;

      return  `${hours}:${minutes} ${meridiem} `

    }
  },
  data() {
    return {
      defaultMeridiem: "AM",
      timeObj: {
        hours: 12,
        minutes: "00",
        meridiem: "AM"
      },
      meridiems: ["AM", "PM"]
    };
  },
  watch: {
    time(){
      this.$emit("input", this.time);
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    scroll(side,index){

      // not working
      document.getElementsByClassName(`${side}`).scrollTop = index * 34
    },
    sanMin(min){
      var m = min.toString()
      return m.length < 2 ? `0${m}` : m
    },
    sanHr(hr){
      var h = hr.toString()
      return h.length < 2 ? `0${h}` : h
    }
    
  },
  mounted() {
    var d = new Date()
    var h = d.getHours()
    this.timeObj.meridiem = h > 11 ? "PM" : "AM"
    var nh = h > 12 ? h - 12 : h
    this.timeObj.hours = nh == 12 ? "01" : this.sanHr(nh+1)
  },

  directives: {
    ClickOutside
  }
};
</script>