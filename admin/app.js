const Dashboard = Vue.component('dashboard', {
    template: '#dashboard',
});

const ViewUser = Vue.component('view-profile', {
    template: '#view-profile',
});

const router = new VueRouter({
    routes: [
        { path: '/', component: Dashboard },
        { path: '/view-profile', component: ViewUser },
    ]
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

