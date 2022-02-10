<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
          flat
        >
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Today
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="value"
          color="primary"
          type="category"
          category-show-all="false"
          interval-minutes="5"
          interval-count="84"
          first-time="07:30"
          :categories="categories"
          :events="events"
          :event-color="getEventColor"
          :event-ripple="false"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="getEvents"
          @mousedown:event="startDrag"
          @mousedown:time-category="startTime"
          @mousemove:time-category="mouseMove"
          @mouseup:time-category="endDrag"
          @mouseleave.native="cancelDrag"
        >
           <template #event="{ event, timed, eventSummary }">
             <div style="border-left: coral solid 5px; height:100%;">
              <div
                class="v-event-draggable"
                v-html="eventSummary()"
              ></div>
              <div
                v-if="timed"
                class="v-event-drag-bottom"
                @mousedown.stop="extendBottom(event)"
              ></div>
             </div>
          </template>
        </v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="true"
          :activator="selectedElement"
          offset-y
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title >{{selectedEvent.name}}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span >{{selectedEvent.details}}</span>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      value: '',
      focus: '',
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      categories: ['John Smith', 'Tori Walker','Ali Mohamed', 'Ibrahim Ahmed', 'Hosini Ahmed', 'Ismaeil Saied', 'Hoda Ahmed'],
      dragEvent: null,
      dragStart: null,
      createEvent: null,
      createStart: null,
      extendOriginal: null,
    }),
    mounted () {
      this.$refs.calendar.checkChange()
    },
    methods: {
      viewDay({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          requestAnimationFrame(() =>
            requestAnimationFrame(() => (this.selectedOpen = true))
          )
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      fetchEvents ({ start, end }) {
        const events = []

        const min = new Date(`${start.date}T07:30:00`)
        const max = new Date(`${end.date}T13:59:59`)
        const days = (max.getTime() - min.getTime()) / 86400000
        const eventCount = this.rnd(days, days + 270)

        for (let i = 0; i < eventCount; i++) {
          const allDay = this.rnd(0, 3) === 0
          const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          // const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
          const secondTimestamp = 5 * 60000
          const second = new Date(first.getTime() + secondTimestamp)

          events.push({
            name: this.names[this.rnd(0, this.names.length - 1)],
            start: first,
            end: second,
            color: this.colors[this.rnd(0, this.colors.length - 1)],
            timed: !allDay,
            category: this.categories[this.rnd(0, this.categories.length - 1)],
          })
        }

        this.events = events
      },
      getEvents ({ start, end }) {
        const events = []

        const min = new Date(`${start.date}T07:30:00`).getTime()
        const max = new Date(`${end.date}T13:59:59`).getTime()
        // const days = (max - min) / 86400000
        // const eventCount = this.rnd(days, days + 20)
        const days = (max - min) / 86400000
        const eventCount = this.rnd(days, days + 270)

        for (let i = 0; i < eventCount; i++) {
          const timed = this.rnd(0, 3) !== 0
          const firstTimestamp = this.rnd(min, max)
          // const secondTimestamp = this.rnd(2, timed ? 8 : 288) * 900000
          const start = firstTimestamp - (firstTimestamp % 900000)
          const end = start + ( 5 * 60000) // + secondTimestamp

          events.push({
            id: i+1,
            name: this.rndElement(this.names),
            color: this.rndElement(this.colors),
            start,
            end,
            timed,
            category: this.rndElement(this.categories),
          })
        }

        this.events = events
      },
      AddEvent(args){
        console.log('args', args)
        const strt=  new Date(`${args.date}T${args.time}:00`);
        this.events.push({
            name: "New Event",
            start: strt,
            end: strt, // new Date(strt.getTime()  + (5 * 60000)),
            color: this.colors[this.rnd(0, this.colors.length - 1)],
            category: args.category,
          })
      },
      startDrag (args) {
        console.log('args', args);
        if (args.event && args.timed) {
          this.dragEvent = args.event
          this.dragTime = null
          this.extendOriginal = null
        }
      },
      startTime (tms) {
        console.log('start-time', tms);
        const mouse = this.toTime(tms)

        if (this.dragEvent && this.dragTime === null) {
          const start = this.dragEvent.start

          this.dragTime = mouse - start
        } else {
          this.createStart = this.roundTime(mouse)
          this.createEvent = {
            id:this.events.length + 1,
            name: `Event #${this.events.length +1}`,
            color: this.rndElement(this.colors),
            start: this.createStart,
            end: new Date(this.createStart+(5*60000)),
            timed: true,
            category: tms.category,
          }

          this.events.push(this.createEvent)
        }
      },
      extendBottom (event) {
        this.createEvent = event
        this.createStart = event.start
        this.extendOriginal = event.end
      },
      mouseMove (tms) {
        const mouse = this.toTime(tms)

        if (this.dragEvent && this.dragTime !== null) {
          const start = this.dragEvent.start
          const end = this.dragEvent.end
          const duration = end - start
          const newStartTime = mouse - this.dragTime
          const newStart = this.roundTime(newStartTime)
          const newEnd = newStart + duration

          this.dragEvent.start = newStart
          this.dragEvent.end = newEnd
          this.dragEvent.category = tms.category

        } else if (this.createEvent && this.createStart !== null) {
          const mouseRounded = this.roundTime(mouse, false)
          const min = Math.min(mouseRounded, this.createStart)
          const max = Math.max(mouseRounded, this.createStart)

          this.createEvent.start = min
          this.createEvent.end = max
        }
      },
      endDrag () {
        this.dragTime = null
        this.dragEvent = null
        this.createEvent = null
        this.createStart = null
        this.extendOriginal = null
      },
      cancelDrag () {
        if (this.createEvent) {
          if (this.extendOriginal) {
            this.createEvent.end = this.extendOriginal
          } else {
            const i = this.events.indexOf(this.createEvent)
            if (i !== -1) {
              this.events.splice(i, 1)
            }
          }
        }

        this.createEvent = null
        this.createStart = null
        this.dragTime = null
        this.dragEvent = null
      },
      roundTime (time, down = true) {
        const roundTo = 5 // minutes
        const roundDownTime = roundTo * 60 * 1000

        return down
          ? time - time % roundDownTime
          : time + (roundDownTime - (time % roundDownTime))
      },
      toTime (tms) {
        return new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute).getTime()
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      rndElement (arr) {
        return arr[this.rnd(0, arr.length - 1)]
      },
    },
  }
</script>

<style scoped lang="scss">
.v-event-draggable {
  padding-left: 6px;
}

.v-event-timed {
  user-select: none;
  -webkit-user-select: none;
}

.v-event-drag-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  height: 4px;
  cursor: ns-resize;

  &::after {
    display: none;
    position: absolute;
    left: 50%;
    height: 4px;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    width: 16px;
    margin-left: -8px;
    opacity: 0.8;
    content: '';
  }

  &:hover::after {
    display: block;
  }
}
</style>