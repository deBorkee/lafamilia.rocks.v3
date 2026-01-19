<template>
  <div class="app">

    <NavigationMain />

    <div class="area area__server">

      <h1 class="area__server__h1">
        <span class="area__server__icon"></span>
        <span class="lightblue">La</span>Familia
      </h1>
      <h2 class="area__server__h2">Gameserver <span class="opa">Cluster</span></h2>
      <h3 class="version"><span class="opa">V</span> {{ appVersion }} &nbsp;&nbsp;|&nbsp;&nbsp; <span class="opa">MINECRAFT</span> {{ minecraftVersion.latest.release }}</h3>

      <router-view :mineCraftVersion="minecraftVersion.latest.release"/>

    </div>

    <BeeHive />

    <div class="area area__bottom">
      <span>
        &copy; 2023 borkee.de <strong class="color-white">//</strong> made with <span class="heart">♥️</span> in
        Goldbach<br />
        <a class="opa" href="https://www.flaticon.com/de/kostenlose-icons/honig" title="honig Icons">Honig Icons
          erstellt von Freepik - Flaticon</a> &nbsp;|&nbsp;
        <a class="opa" href="https://www.flaticon.com/de/kostenlose-icons/biene" title="biene Icons">Biene Icons
          erstellt von Freepik - Flaticon</a>
      </span>
    </div>

  </div>
</template>

<script>
import BeeHive from "./components/BeeHive.vue";
import { version } from '../package'
import NavigationMain from './components/NavigationMain.vue'
import ServerStatusAPI from './api/resources/ServerStatus.js';
import { ref } from 'vue';

export default {
  name: 'App',
  components: {
    BeeHive,
    NavigationMain,
  },
  setup() {
    const appVersion = version;
    const minecraftVersion = ref({ latest: {"release": "fetching..."}});
    const loadMinecraftVersion = async () => {
          minecraftVersion.value = await ServerStatusAPI.minecraftAPI();
        };

    return {
      appVersion,
      minecraftVersion,
      loadMinecraftVersion
    }
  },
  mounted() {
    document.title = "LaFamilia Gameserver";
  },
  created() {
    this.loadMinecraftVersion()
  },
}
</script>

<style lang="scss">
@use 'assets/scss/app.scss';
</style>
