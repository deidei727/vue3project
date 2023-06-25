
export default [
    {
        path:'/login',
        component:()=> import ('@/views/login/index.vue'),
        name: 'login',
    },
    {
        path:'/',
        component:()=> import ('@/layout/index.vue'),
        name: 'home'
    },
    {
        path:'/:pathMatch(.*)*',
        component:()=> import ('@/views/404/index.vue'),
        name: 'Any'
    }
]