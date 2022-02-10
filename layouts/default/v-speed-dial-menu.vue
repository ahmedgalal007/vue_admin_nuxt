<template>
  <v-card id="create" :style="$vuetify.rtl? {right:'20px'}:{left:'40px'}">
    <v-speed-dial
    v-model="fab"
    :top="top"
    :bottom="bottom"
    :right="right"
    :left="left"
    :direction="direction"
    :open-on-hover="hover"
    :transition="transition"
    >
      <template #activator>
        <v-badge
        :content="3"
        :value="3"
        color="accent"
        overlap
        >
          <v-btn
          v-model="fab"
          color="secondary darken-2"
          dark
          fab
          >
            <v-icon v-if="fab">mdi-close</v-icon>
            <v-icon v-else>mdi-pencil-box-multiple</v-icon>
          </v-btn>
        </v-badge>
      </template>
      

      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-card
            color="#385F73"
            dark
            >
              <v-card-title class="text-h5">Unlimited music now</v-card-title>

              <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle>

              <v-card-actions>
                <v-btn text>Listen Now</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="12"
          >
            <v-card
            :color="item.color"
            dark
            >
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title
                  class="text-h5"
                  v-text="item.title"
                  ></v-card-title>

                  <v-card-subtitle v-text="item.artist"></v-card-subtitle>

                  <v-card-actions>
                    <v-btn
                    v-if="item.artist === 'Ellie Goulding'"
                    class="ml-2 mt-3"
                    fab
                    icon
                    height="40px"
                    right
                    width="40px"
                    >
                      <v-icon>mdi-play</v-icon>
                    </v-btn>

                    <v-btn
                      v-else
                      class="ml-2 mt-5"
                      outlined
                      rounded
                      small
                    >
                        START RADIO
                    </v-btn>
                  </v-card-actions>
                </div>

                <v-avatar
                class="ma-3"
                size="125"
                tile
                >
                  <v-img :src="item.src"></v-img>
                </v-avatar>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-speed-dial>
  </v-card>
</template>

<script>
  export default {
    name: 'VSpeedDialMenu',
    data: () => ({
      direction: 'top',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition',
      absolute: true,
      items: [
        {
          color: '#1F7087',
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People',
        },
        {
          color: '#952175',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Halcyon Days',
          artist: 'Ellie Goulding',
        },
      ],
    }),

    watch: {
      top (val) {
        this.bottom = !val
      },
      right (val) {
        this.left = !val
      },
      bottom (val) {
        this.top = !val
      },
      left (val) {
        this.right = !val
      },
    },
  }
</script>


<style>
  /* This is for documentation purposes and will not be needed in your application */
  #create {
    z-index: 7;
    position: fixed;
    /*height: 200px;*/
    /* right: 20px; */
    bottom: 15px;
    /* margin-left: -150px; /*half the width*/
  }

  #create .v-speed-dial {
    position: absolute;
    
  }
  #create  .v-speed-dial .v-speed-dial--is-active{
width: 450px;
  }
  #create .v-speed-dial__list {
    /* width:450px */
  }

  #create .v-btn--floating {
    /*position: relative;*/
    bottom: 0;
    position: absolute;
    margin: 0 0 16px 16px;
  }
</style>