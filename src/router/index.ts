import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import LoginView from '@/views/Login.vue';
import Order from '@/views/Order.vue';
import Food from '@/views/Food.vue';
import Checkout from '@/views/Checkout.vue';
import OrderSubmitted from '@/views/OrderSubmitted.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
  },
  {
    path: '/food/:id',
    name: 'Food',
    component: Food,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/submitted',
    name: 'OrderSubmitted',
    component: OrderSubmitted
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
