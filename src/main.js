import Vue from 'vue';
//import routes from './routes'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. Определяем несколько маршрутов
// Каждый маршрут должен указывать на компонент.
// "Компонентом" может быть как конструктор компонента, созданный
// через `Vue.extend()`, так и просто объект с опциями компонента.
// Мы поговорим о вложенных маршрутах позднее.
const routes = [
  { path: '/dist/', component: Foo },
  { path: '/bar', component: Bar }
]

const router = new VueRouter({
    routes,
})

new Vue({
    router,
}).$mount('#app')