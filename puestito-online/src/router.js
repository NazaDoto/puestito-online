import { createRouter, createWebHistory } from 'vue-router';
import InicioNegocioComponent from './components/InicioNegocioComponent.vue';
import InicioComponent from './components/InicioComponent.vue';
import LoginComponent from './components/LoginComponent.vue';
import RegistrarComponent from './components/RegistrarComponent.vue';
import ListarNegociosComponent from './components/ListarNegociosComponent.vue';
import NuevoProductoComponent from './components/NuevoProductoComponent.vue';
import ListarProductosComponent from './components/ListarProductosComponent.vue';
import NegocioComponent from './components/NegocioComponent.vue';
import ModificarNegocioComponent from './components/ModificarNegocioComponent.vue';
import PlanesComponent from './components/PlanesComponent.vue';
import SuccessComponent from './components/SuccessComponent.vue';
import CalcularComponent from './components/CalcularComponent.vue';
import CrearQRComponent from './components/CrearQRComponent.vue';
import NuevaPublicacionComponent from './components/NuevaPublicacionComponent.vue';
import PublicacionesComponent from './components/PublicacionesComponent.vue';


const routes = [{
        path: '/',
        component: InicioComponent,
    },
    {
        path: '/u/calcular',
        component: CalcularComponent,
        meta: { requiresAuth: false },
    },
    {
        path: '/u/publicaciones',
        component: PublicacionesComponent,
        meta: { requiresAuth: true },
    },
    {
        path: '/u/nuevapublicacion',
        component: NuevaPublicacionComponent,
        meta: { requiresAuth: true },
    },
    {
        path: '/u/home',
        component: InicioNegocioComponent,
        meta: { requiresAuth: true },
    },
    {
        path: '/u/crearqr',
        component: CrearQRComponent,
        meta: { requiresAuth: true },
    },

    {
        path: '/u/login',
        component: LoginComponent,
        meta: { requiresAuth: false },
    },
    {
        path: '/u/registrar',
        component: RegistrarComponent,
        meta: { requiresAuth: false },

    },
    {
        path: '/u/planes',
        component: PlanesComponent,
        meta: { requiresAuth: false },

    },
    {
        path: '/u/registrar/return', // Utiliza un comodín para capturar todos los datos después de /u/registrar/return
        component: SuccessComponent,
        meta: { requiresAuth: false },
    },
    {
        path: '/u/negocios',
        component: ListarNegociosComponent,
        meta: { requiresAuth: true },
    },
    {
        path: '/u/modificar',
        component: ModificarNegocioComponent,
        meta: { requiresAuth: true },
    },
    {
        path: '/u/nuevoProducto',
        component: NuevoProductoComponent,
        meta: { requiresAuth: true },
    },
    {
        path: '/u/productos',
        component: ListarProductosComponent,
        meta: { requiresAuth: true },
    },
    {
        path: '/:nombreNegocio', // :nombreUsuario es un parámetro dinámico
        component: NegocioComponent,
        meta: { requiresAuth: false }, // Esta ruta no requiere autenticación
    },
];

const router = createRouter({
    history: createWebHistory('/puestito-online/'), // 👈 este parámetro es fundamental
    routes,
    linkActiveClass: "active",
    linkExactActiveClass: "active",
});


router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // Verifica si la ruta requiere autenticación
        if (!token) {
            // Si no hay token y la ruta requiere autenticación, redirige a /login
            next('/');
        } else {
            // Si hay token, permite que el usuario continúe navegando
            next();
        }
    } else {
        // Si la ruta no requiere autenticación, permite que el usuario continúe navegando
        next();
    }
});


export default router;