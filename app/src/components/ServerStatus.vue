<template>
    <div :class="'server ' + addclass">
        <div :class="'server__box server-' + (s.data.status != 'online' ? s.data.status : 'online') + ' server-' + game + ' ' + (s.data.info ? 'toggle' : '') + ' ' + (isActive ? 'toggle--active' : '')"
            @click="isActive = !isActive">

            <div v-if="s.data.info || name == 'B:Horde'" class="icon icon-dropdown"></div>

            <div class="stitches">
                <div class="server__grid">

                    <!-- ICONS & LOADER -->
                    <div class="server__grid--left">
                        <div v-if="(s.data.status == 'loading')" class="server__loader">
                            <div class="server__loader__div server__loader__div-1"></div>
                            <div class="server__loader__div server__loader__div-2"></div>
                            <div class="server__loader__div server__loader__div-3"></div>
                            <div class="server__loader__div server__loader__div-4"></div>
                        </div>
                        
                        <div v-if="(s.data.status == 'horde')" :class="'server__loader icon icon-horde'" />

                        <div v-else :class="'server__loader icon icon-' + (s.data.icon?'custom':game)">
                            <img v-if="s.data.icon" :src="'data:image/png;base64, '+s.data.icon" class="icon-custom">
                        </div>
                        
                        <!-- <div v-else class="server__loader icon icon-error"></div> -->
                    </div>

                    <!-- TEXT -->
                    <div class="server__grid--right">
                        <strong class="server__url opa75 dark small">{{ url }}</strong>

                        <h3 class="server__name">
                            {{ name }} <span v-if="s.data.status == 'offline'" :class="'opa25 heavy' + (game == 'beehive' ? ' color-white' : ' color-black')">Offline</span>
                        </h3>

                        <h4 class="server__mode"> {{ (s.data.model ? s.data.model : (s.data.status == 'loading' ? 'loading' : s.data.motd)) }}</h4>

                        <!-- ####### NOTIFICATIONS ######################################################################################################### -->
                        <div class="server__text--online smaller" v-if="s.data.status == 'online'">

                            <span v-if="game != 'beehive'"
                                :class="'notification ' + calulatePercentage(s.data.players, s.data.maxplayers)">
                                <!-- ### GAMESERVER PLAYER / MAXPLAYER ###################### -->
                                <span class="opa">Player <strong>{{ s.data.players }}/{{ s.data.maxplayers }} Online</strong></span>
                            </span>

                            <span v-if="game != 'beehive' && s.data.version"
                                :class="'notification ' + checkVersion(s.data.version.replace('.',''), mineCraftVersion.replace('.',''))">
                                <!-- ### GAMESERVER GAME VERSION ###################### -->
                                <span class="gameVersion">v.<strong>{{ s.data.version }}</strong></span>
                                <span class="gameVersion--latest">New Version <strong>{{ mineCraftVersion }}</strong></span>
                            </span>

                            <span v-if="game == 'beehive' && name != 'B:Keeper' && name != 'B:Horde'"
                                :class="'server__cpu  notification ' + calulatePercentage(s.data.motd, '100')">
                                <!-- ### BEHIVE CPU ###################### -->
                                CPU: {{ s.data.motd }}%
                            </span>

                            <span v-if="game == 'beehive' && name != 'B:Keeper' && name != 'B:Horde'"
                                :class="'server__memory notification ' + calulatePercentage(s.data.players, s.data.maxplayers)">
                                <!-- ### BEHIVE MEMORY ###################### -->
                                Mem.: {{ s.data.players }} <span class="opa75">({{
                                        s.data.maxplayers
                                }})</span>
                            </span>

                        </div>

                        <div v-else class="smaller opa">
                            Request restart <a href="https://c.im/@borkee" target="_blank">@borkee</a>
                        </div>

                    </div>
                </div>
                <div class="infobox">

                    <div v-if="s.data.info" class="infobox__content" v-html="replaceTags(s.data.info)"></div>

                    <div v-if="game == 'beehive' && name == 'B:Horde'" class="infobox__content infobox__content--horde">
                        <!-- ### HORDE SPECIAL ###################### -->
                        <span v-for="n in s.data.notifications" :key="n.index"
                            :class="'server__memory smaller color-white notification notification--horde ' + (n.value == 'false' ? 'notification--horde-offline' : '')">
                            {{ n.name }}
                        </span>
                    </div>


                </div>
            </div>
            <div v-if="ribbon" class="ribbon"><span class="ribbon__content">{{ ribbon }}</span></div>

        </div>
    </div>
</template>

<script>
import ServerStatusAPI from '../api/resources/ServerStatus.js';
import { ref } from 'vue';

export default {
    name: 'BeeHive',
    props: {
        name: String,
        url: String,
        game: String,
        ip: String,
        port: String,
        player: String,
        ribbon: String,
        addclass: String,
        mineCraftVersion: String,
    },
    data() {
        return {
            isActive: false,
        }
    },
    setup(props) {
        //setup() { // for loading test
        const s = ref({ data: { status: 'loading' } });
        const loadServerStatus = async () => {
            s.value = await ServerStatusAPI.server(props.ip, props.port);
        };

        return {
            s,
            loadServerStatus
        }
    },
    created() {
        this.loadServerStatus()
    },
    methods: {
        calulatePercentage(value, max) {
            // remove non-numerics
            let intvalue = value.replace(/[^\d.-]/g, ''),
                intmax = max.replace(/[^\d.-]/g, '');

            let per = (100 * intvalue) / intmax;
            if (per > 80)
                return 'notification--red --' + per + '%';
            if (per > 60)
                return 'notification--orange --' + per + '%';

            return 'notification--green --' + per + '%';
        },
        checkVersion(value1, value2) {
            // remove non-numerics
            
            if (value1 != value2)
                return 'notification--orange --' + value1 + ' --'+value2;

            return 'notification--green --' + value1 + ' --'+value2;
        },
        replaceTags(msg) {
            let newMsg = msg.replace("[h]", "<h4>");
            newMsg = newMsg.replace("[/h]", "</h4>");
            newMsg = newMsg.replace("[h4]", "<h4>");
            newMsg = newMsg.replace("[/h4]", "</h4>");
            newMsg = newMsg.replace("[b]", "<strong>");
            newMsg = newMsg.replace("[/b]", "</strong>");
            newMsg = newMsg.replace("[br]", "<br />");
            return newMsg;
        }
    }
}
</script>
