import { createRouter,createWebHashHistory } from "vue-router";
import route from "./routes";
const router=createRouter({
    history: createWebHashHistory(),
    routes: route
})
export default router