const Dashboard = Vue.component('dashboard', {
    template: '#dashboard',
});

const ViewUser = Vue.component('view-profile', {
    template: '#view-profile',
});

const router = new VueRouter({
    // mode: 'history', !#
    routes: [
        { path: '/dashboard', component: Dashboard },
        { path: '/view-profile', component: ViewUser },

        { path: '*', component: Dashboard },
    ],
    linkActiveClass: "active"
});

const vm = new Vue({
    el: '#app',
    router: router,
});

$('#toggler').on('click', function () {
    $('.wrapper').toggleClass('open-sidebar');
    $(this).toggleClass('collapsed');
    $('.sidebar .nav .nav-link, .sidebar .nav .profile').click(function () {
        $('.wrapper').removeClass('open-sidebar');
        $('#toggler').addClass('collapsed');
    });
});

