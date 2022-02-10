<template>
  <div class="spinner-container intro">
    <div class="globe-container">
      <img
        width="200"
        height="200"
        src="~/assets/SVG/world-globe.svg"
        style=""
      />
      <img
        width="200"
        height="200"
        src="~/assets/SVG/world-globe.svg"
        style="transform: scale(1, 1);"
      />
      <img
        width="400"
        height="400"
        src="~/assets/SVG/akhbar-el-yom.svg"
        style="display: block;position:absolute;"
      />
    </div>
    <!--div class="spinner"></div-->
  </div>
</template>
<script>
// import {mapActions} from 'vuex';
export default {
  /* data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.$store.commit('ui/SHOW_LOADER');
      this.loading = true;
      console.log('UI',this.$store); 
    },
    finish() {
      this.$store.commit('ui/HIDE_LOADER');
      this.loading = false;
    },
    
    ...mapActions('ui',['SHOW_LOADER', 'HIDE_LOADER']),
  }, */
}
</script>
<style >
.globe-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;
}
.spinner-container {
  position: relative;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  padding: 1rem;
  text-align: center;
  font-size: 3rem;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /*background: linear-gradient(90deg,rgb(107, 107, 107), rgb(32, 32, 32));
  background: rgb(9,9,121);
  background: linear-gradient(50deg, rgba(9,9,121,1) 35%, rgba(0,212,255,0) 100%);*/
}
.spinner-container2:before {
  content: '';
  display: block;
  width: 25vh;
  height: calc(25vh - 20px);
  background-color: #fff;
  border-radius: 100vh;
}

.intro{
    /*background:url(''),linear-gradient(233deg, #e56420, #c22525, #3d9c31, #37bbde);*/
    /*background:linear-gradient(-120deg,#021B79,#0575E6,#205E9B);*/
    background: transparent;
    width:100%;
    height:90vh;
    background-size:cover;
    background-blend-mode: hard-light;
    /*animation: hue-rotate 3s linear infinite;*/
}

@keyframes hue-rotate {
  from {
    -webkit-filter: hue-rotate(0);
    -moz-filter: hue-rotate(0);
    -ms-filter: hue-rotate(0);
    filter: hue-rotate(0);
  }
  to {
    -webkit-filter: hue-rotate(360deg);
    -moz-filter: hue-rotate(360deg);
    -ms-filter: hue-rotate(360deg);
    filter: hue-rotate(360deg);
  }
}
</style>
