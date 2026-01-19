import { createRouter, createWebHistory} from "vue-router";
import GameServerList from "../views/GameServerList.vue";
import MediaList from "../views/MediaList.vue";

const routes = [
    {
        path:"/",
        name:"GameServerList",
        component: GameServerList,
    },
    {
        path:"/media",
        name:"MediaList",
        component: MediaList,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;