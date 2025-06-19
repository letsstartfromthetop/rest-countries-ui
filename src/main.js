import './assets/main.css'
import {createRouter, createWebHistory} from "vue-router"
import { createApp } from 'vue'
import CountriesList from "@/components/CountriesList.vue"
import CountryPage from "@/components/CountryPage.vue"

let routes = createRouter({
  mode: 'history',
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'Home',
      component: CountriesList
    },
    {
      path: '/country/:name',
      name: 'CountryPage',
      component: CountryPage,
      props: true, // Allows passing `name` as a prop
    },
  ]
})
import App from './App.vue'


createApp(App).use(routes).mount('#app')
