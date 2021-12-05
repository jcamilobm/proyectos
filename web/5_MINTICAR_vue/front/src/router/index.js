import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

// validación usuario
const routeGuard = (to, from, next) => {
  let isAuthenticated = false;
  if (sessionStorage.getItem("username")) {
    isAuthenticated = true;
  }

  if (isAuthenticated) {
    next();
  } else {
    next("/");
  }
};

// fin validación usuario

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  /*------------------------  todos los roles----------------------- */
  {
    path: "/registro",
    name: "Registro",
    component: () => import("@/views/Registro.vue"),
  },

  {
    path: "/faq",
    name: "faq",
    component: () => import("../views/FAQ.vue"),
  },
  {
    path: "/pqrs",
    name: "pqrs",
    component: () => import("@/views/PQRS.vue"),
  },

  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },

  {
    path: "/equipo",
    name: "equipo",
    component: () => import("../views/Equipo.vue"),
  },

  {
    path: "/catalogo",
    name: "Catalogo",
    component: () => import("../views/Catalogo.vue"),
  },

 

  /*---------------Usuario logueado ---------------- */

  {
    path: "/perfil",
    name: "perfil usuario",
    component: () => import("../views/Perfil.vue"),
  },

  {
    path: "/alquiler",
    name: "Alquiler",
    component: () => import("../views/clients/Alquiler.vue"),
  },

  {
    path: "/recibo",
    name: "Recibo",
    component: () => import("../views/clients/Recibo.vue"),
  },

  {
    path: "/consultarreserva",
    name: "Consultar Reserva",
    component: () => import("../views/clients/ConsultarReservas.vue"),
  },

  /* ----------------------Administrador---------------------------- */

  {
    path: "/admin/dashboard",
    name: "Dashboard",
    component: () => import("../views/admin/Dashboard.vue"),
    beforeEnter: routeGuard,
  },

  {
    path: "/admin/gestioncatalogo",
    name: "Gestion del catalogo",
    component: () => import("../views/admin/GestionarCatalogo.vue"),
    beforeEnter: routeGuard,
  },

  {
    path: "/admin/gestioncatalogo/agregarcarro",
    name: "Gestion del catalogo agregar",
    component: () => import("../views/admin/AgregarCarro.vue"),
    beforeEnter: routeGuard,
  },
  {
    path: "/cars/:id",
    name: "Gestion del catalogo editar",
    component: () => import("../views/admin/ActualizarCarro.vue"),
    beforeEnter: routeGuard,
  },

  {
    path: "/admin/gestionusuarios",
    name: "Gestion de usuarios",
    component: () => import("../views/admin/GestionUsuarios.vue"),
    beforeEnter: routeGuard,
  },

  {
    path: "/admin/gestionrecibos",
    name: "Gestion de recibos",
    component: () => import("../views/admin/GestionRecibos.vue"),
    beforeEnter: routeGuard,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
