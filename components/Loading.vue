<template>
<div></div>
</template>

<script>
export default {
methods: {
    start() {
      this.$store.commit('ui/SHOW_LOADER');
      this.loading = true;
      console.log('UI',this.$store);
    },
    finish() {
      setTimeout(() => {
        this.loading = false;
        this.$store.commit('ui/HIDE_LOADER');
      }, 3000);
      // 
    },
},
}
</script>

<style>

</style>
