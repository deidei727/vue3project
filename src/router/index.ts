import { createRouter,createWebHashHistory } from "vue-router";
import route from "./routes";
const router=createRouter({
    history: createWebHashHistory(),
    routes: route,
    scrollBehavior() {
        return {
            left: 0,
            top: 0
        }
    }
})
export default router