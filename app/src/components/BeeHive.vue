<template>
    <div class="area area__hive">
        <h1 class="area__hive__h1 shadow--beehive">
            <span class="area__hive__icon"></span>
            <span class="area__hive__h1__bee">Bee</span>Hive
        </h1>
        <h2 class="area__hive__h2">it's good <span class="opa">to b0rk</span></h2>
        <div class="server-status grid">
            <ServerStatus name="B:Brian"    game="beehive" ip="b.brian"     url="brian.lafamilia.rocks"     ribbon="💪💪💪"     addclass="" />
            <ServerStatus name="B:Boss"     game="beehive" ip="b.boss"      url="boss.lafamilia.rocks"      ribbon="🚀🚀🚀"     addclass="" />
            <ServerStatus name="B:Keeper"   game="beehive" ip="b.keeper"    url="keeper.lafamilia.rocks"    ribbon="🧯🧯🧯"       addclass="" />
            <!-- <ServerStatus name="B:Mu-th-ur" game="beehive" ip="b.muthur"    url="queen.lafamilia.rocks"     ribbon="⚙️⚙️⚙️"     addclass="" /> -->
            <ServerStatus name="Mr. Peter"   game="beehive" ip="oracle"      url="mrpeter.lafamilia.rocks"   ribbon="⚙️⚙️⚙️"     addclass="" />
            <ServerStatus name="B:Horde"    game="beehive" ip="b.horde"     url="horde.lafamilia.rocks"     ribbon="🐻🐻🐻"     addclass="fullwidth" />
        </div>
    </div>
</template>


<script>
import ServerStatus from '../components/ServerStatus.vue'
export default {
    name: "BeeHiveList",
    components: {
        ServerStatus,
    },
}
</script>
