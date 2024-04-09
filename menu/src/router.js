import { createRouter, createWebHistory } from 'vue-router';
import InicioNegocioComponent from './components/InicioNegocioComponent.vue';
import InicioComponent from './components/InicioComponent.vue';
import LoginComponent from './components/LoginComponent.vue';
import FacturarComponent from './components/FacturarComponent.vue';
import RegistrarComponent from './components/RegistrarComponent.vue';
import ListarNegociosComponent from './components/ListarNegociosComponent.vue';
import NuevoProductoComponent from './components/NuevoProductoComponent.vue';
import ListarProductosComponent from './components/ListarProductosComponent.vue';
import NuevaCategoriaComponent from './components/NuevaCategoriaComponent.vue';
import ListarCategoriasComponent from './components/ListarCategoriasComponent.vue';
import NegocioComponent from './components/NegocioComponent.vue';
import ModificarNegocioComponent from './components/ModificarNegocioComponent.vue';
import PlanesComponent from './components/PlanesComponent.vue';


const routes = [{
        path: '/',
        component: InicioComponent,
        meta: { requiresAuth: false },
    },
    {
        path: '/home',
        component: InicioNegocioComponent,
        meta: { requiresAuth: true },
    },

    {
        path: '/login',
        component: LoginComponent,
    },
    {
        path: '/facturar',
        component: FacturarComponent,
        meta: { requiresAuth: false },

    },
    {
        path: '/registrar',
        component: RegistrarComponent,
        meta: { requiresAuth: false },

    },
    {
        path: '/planes',
        component: PlanesComponent,
        meta: { requiresAuth: false },

    },
    {
        path: '/negocios',
        component: ListarNegociosComponent,
        meta: { requiresAuth: true },
    },
    {
        path: '/modificar',
        component: ModificarNegocioComponent,
        meta: { requiresAuth: true },
    },
    {
        path: '/nuevoProducto',
        component: NuevoProductoComponent,
        meta: { requiresAuth: true },
    },
    {
        path: '/productos',
        component: ListarProductosComponent,
        meta: { requiresAuth: true },
    },
    {
        path: '/nuevaCategoria',
        component: NuevaCategoriaComponent,
        meta: { requiresAuth: true },
    },
    {
        path: '/categorias',
        component: ListarCategoriasComponent,
        meta: { requiresAuth: true },
    },
    {
        path: '/:nombreNegocio', // :nombreUsuario es un parámetro dinámico
        component: NegocioComponent,
        meta: { requiresAuth: false }, // Esta ruta no requiere autenticación
    },
];

const router = createRouter({
    history: createWebHistory(),
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
            next('/login');
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