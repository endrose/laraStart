/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');


// VFORM
import {
    Form,
    HasError,
    AlertError
} from 'vform'

// SWEETALERT2
import swal from 'sweetalert2'
window.swal = swal;

const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
})
window.toast = toast;

// PROGRESS BAR
import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
    color: 'rgb(38, 117, 221)',
    failedColor: 'red',
    height: '2px'
})


window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

// VUE ROUTER
import VueRouter from 'vue-router'
Vue.use(VueRouter)


// MOMENTS
import moment from 'moment'

window.Fire = new Vue();


let routes = [{
    path: '/dashboard',
    component: require('./components/Dashboard.vue').default
}, {
    path: '/users',
    component: require('./components/Users.vue').default
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

// FILTER
Vue.filter('upText', function (text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
});

// FILTER MOMENT
Vue.filter('myDate', function (created) {
    return moment(created).format('MMMM Do YYYY');
});

// CUSTOM EVENT SEND HTTP REQUEST
window.Fire = new Vue();

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});
