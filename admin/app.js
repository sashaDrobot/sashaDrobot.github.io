$('#toggler').on('click', function () {
    $('.wrapper').toggleClass('open-sidebar');
    $(this).toggleClass('collapsed');
});

const Dashboard = Vue.component('dashboard', {
    template: '#dashboard',
});

const ViewUser = Vue.component('view-profile', {
    template: '#view-profile',
});

let router = new VueRouter({
    routes: [
        { path: '/', component: Dashboard },
        { path: '/view-profile', component: ViewUser },
    ]
});

let vm = new Vue({
    el: '#app',
    router: router,
});
