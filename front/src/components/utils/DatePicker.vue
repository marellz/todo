<template>
  <div class="datepicker" v-click-outside="close">
    <slot />
    <template v-if="active">
      <div class="d-flex flex-column">
        <div class="dp_calendar border" :class="{'active':active}">
          <div class="month d-flex">
            <button type="button" class="pt-0 prev btn mr-auto btn-sm" @click="lastMonth()">
              <chevron-left-icon />
            </button>

            <div class="input-group">
              <select
                class="form-control form-control-sm"
                @change="calcMonthDays"
                v-model="userDate.month"
              >
                <option :value="i" v-for="(m,i) in months" :key="i">{{m}}</option>
              </select>
              <select
                class="form-control form-control-sm"
                @change="calcMonthDays"
                v-model="userDate.year"
              >
                <option :value="y" v-for="(y,i) in years" :key="i">{{y}}</option>
              </select>
            </div>
            <button type="button" class="pt-0 next btn ml-auto btn-sm" @click="nextMonth()">
              <chevron-right-icon />
            </button>
          </div>

          <table class="table">
            <thead>
              <th v-for="(item, index) in days" :key="index">{{item}}</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in monthDays" :key="index">
                <td v-for="(d, i) in item" :key="i">
                  <template v-if="d.prevMonth || d.nextMonth">
                    <span class="btn btn-sm text-muted date-btn">{{d.day}}</span>
                  </template>
                  <template v-else>
                    <button
                      @click="selectDate(d.day)"
                      :class="{'btn-secondary':d.day == currentDateParsed.day && currentDateParsed.month == userDate.month && currentDateParsed.year == userDate.year,
                      'btn-primary':selectedDate.day == d.day && selectedDate.month == userDate.month && selectedDate.year == userDate.year}"
                      class="date-btn btn-sm btn"
                      type="button"
                    >{{d.day}}</button>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Vue from "vue";
import VueMask from "v-mask";
import { ChevronLeftIcon, ChevronRightIcon } from "vue-feather-icons";
import ClickOutside from "vue-click-outside";
Vue.use(VueMask);
export default {
  name: "DatePicker",
  components: {
    ChevronLeftIcon,
    ChevronRightIcon
  },
  props: {
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: Array,
      default: () => {
        return ["Date", "Time"];
      }
    },
    value: {
      type: String,
      default: null
    },
    id: {
      type: String,
      default: "date-picker--0"
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    selectedDateString: function(val) {
      this.$emit("input", val);
    }
  },
  computed: {
    currentDate() {
      return new Date();
    },
    currentDateParsed() {
      return {
        day: this.currentDate.getDate(),
        month: this.currentDate.getMonth(),
        year: this.currentDate.getFullYear()
      };
    }
  },
  data() {
    return {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      years: [],
      yearsShowLast: 50,
      userDate: {},
      selectedDate: {},
      selectedDateString: this.value,
      strSeparator: "/",
      monthDays: []
    };
  },

  methods: {
    calcMonthDays() {
      var ls = new Date(
          this.userDate.year,
          this.userDate.month + 1,
          0
        ).getDate(),
        chunk,
        chunks = [],
        days = [];

      for (let index = 1; index <= ls; index++) {
        days.push({ day: index });
      }

      var monthTotaldays = days.length,
        // first day is not a monday
        fDay = new Date(this.userDate.year, this.userDate.month, 0).getDay(),
        lastMonthDays = new Date(
          this.userDate.year,
          this.userDate.month,
          0
        ).getDate();

      //add overflowing dates
      for (let index = 0; index < fDay; index++) {
        days.unshift({ day: lastMonthDays - index, prevMonth: true });
      }

      //last day is not sunday
      var lDay = new Date(
          this.userDate.year,
          this.userDate.month,
          monthTotaldays
        ).getDay(),
        lDayDiff = 7 - lDay;

      for (let d = 0; d < lDayDiff; d++) {
        days.push({ day: `${d + 1}`, nextMonth: true });
      }

      while (days.length) {
        if (days.length) {
          chunk = days.splice(0, 7);
          chunks.push(chunk);
        }
      }
      this.monthDays = chunks;
    },

    nextMonth() {
      if (this.userDate.month == 11) {
        this.userDate.year++;
        this.userDate.month = 0;
      } else {
        this.userDate.month++;
      }

      this.calcMonthDays();
    },
    lastMonth() {
      if (this.userDate.month == 0) {
        this.userDate.year--;
        this.userDate.month = 11;
      } else {
        this.userDate.month--;
      }

      this.calcMonthDays();
    },
    selectDate(date) {
      var day  = date ? date : this.userDate.day
      this.selectedDate = {
        day: day,
        month: this.userDate.month,
        year: this.userDate.year
      };

      this.selectedDateString = [
        this.selectedDate.day,
        this.selectedDate.month + 1,
        this.selectedDate.year
      ].join(this.strSeparator);

      this.close()
    },
    setUserDate() {
      var d = new Date(this.selectedDateString);
      this.userDate = {
        month: d.getMonth(),
        year: d.getFullYear()
      };
      this.selectedDate = this.userDate;
      this.selectedDate.day = d.getDate();
    },
    close() {
      this.$emit("close");
    }
  },
  mounted() {
    this.userDate = {
      day: this.currentDate.getDate(),
      year: this.currentDate.getFullYear(),
      month: this.currentDate.getMonth()
    };

    this.years = [];
    for (
      let index = this.currentDate.getFullYear() + 10;
      index > this.currentDate.getFullYear() - 40;
      index--
    ) {
      this.years.push(String(index));
    }

    this.calcMonthDays();
    this.selectDate()
  },

  directives: {
    ClickOutside
  }
};
</script>
