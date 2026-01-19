<template>
    <div class="server-status grid">
      <ServerStatus name="Minecraft Easy"       game="minecraft" :mineCraftVersion="mineCraftVersion"    ip="localhost" port="25565" url="disease-clay.craft.playit.gg" ribbon="KIDs" />
      <ServerStatus name="Minecraft Hard"       game="minecraft" :mineCraftVersion="mineCraftVersion"    ip="localhost" port="25566" url="first-gulf.craft.playit.gg" ribbon="💀" />
      <ServerStatus name="Minecraft Ladies"     game="minecraft" :mineCraftVersion="mineCraftVersion"    ip="localhost" port="25567" url="else-assured.craft.ply.gg" ribbon="Ja & Ju" />
      <ServerStatus name="Minecraft Gentlemen"  game="minecraft" :mineCraftVersion="mineCraftVersion"    ip="localhost" port="25568" url="weeks-videos.craft.ply.gg" ribbon="Si & Be" />
      <ServerStatus name="Minecraft Siblings"   game="minecraft" :mineCraftVersion="mineCraftVersion"    ip="lafamilia.rocks" port="25565" url="lafamilia.rocks:25565" ribbon="Bro & Sis" />
      <ServerStatus name="Valheim 1"            game="valheim"   ip="val.1" port="2345" url="147.185.221.223:58301" ribbon="" />
    </div>
</template>

<script>

import ServerStatus from '../components/ServerStatus.vue'
export default {
    name: "GameServerList",
    props: {
        mineCraftVersion: String,
    },
    components: {
        ServerStatus,
    },
}
</script>