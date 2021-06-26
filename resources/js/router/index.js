import Vue from 'vue';
import Router from 'vue-router';
import { mapState } from 'vuex';
import store from '../store/index';

Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: 'home',
      meta: {
        title: "Home",
      },
      component: () => import('../views/Home')
    },
    {
      path: "/login",
      name: 'login',
      meta: {
        title: "Login",
        guard: 'guest'
      },
      component: () => import('../views/Login')
    },
    {
      path: "/regiter",
      name: 'register',
      meta: {
        title: "Register",
        guard: 'guest'
      },
      component: () => import('../views/Register')
    },
    {
      path: "/user",
      name: 'user',
      meta: {
        title: "User",
        guard: 'auth'
      },
      component: () => import('../views/User')
    }

  ]
});

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('user')) {
    if (to.matched.some(route => route.meta.guard === 'guest')) next({ name: 'user' })
    else next();
  } else {
    if (to.matched.some(route => route.meta.guard === 'auth')) next({ name: 'login' });
    else next();
  }
});

export default router;