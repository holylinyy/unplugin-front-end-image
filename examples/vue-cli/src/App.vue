<script>
import Logo from 'virtual_image/logo.png'
// import SvgIcon from 'virtual_image/jpeg.svg';
import SvgIcon from 'virtual_image/svg/jpeg.svg';
import SvgIconaa from 'virtual_image/logo1.png';

export default {
  name: 'App',
  components: {
    Logo,
    SvgIcon,
    SvgIconaa,
  },
  methods: {
    alert() {
      alert(1)
    },
  },
}
</script>

<template>
  <div id="app">
    <!-- <Logo width="100px" height="53px" @click="alert" />
    <SvgIcon width="100px" height="53px" @click="alert" /> -->
    <SvgIconaa width="100px" height="53px" @click="alert" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
