import { createRouter, createWebHistory } from 'vue-router';
import Notes from '../views/NotesPage/index.vue';
import Todo from '../views/TodosPage/index.vue';

const routes = [
  {
    path: '/',
    name: 'Notes',
    component: Notes,
  },
  {
    path: '/todo/:id',
    name: 'Todo',
    component: Todo,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
