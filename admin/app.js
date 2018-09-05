const Dashboard = Vue.component('dashboard', {
    template: '#dashboard',
    data: function() {
        return {
            title: 'Dashboard'
        }
    },
    mounted() {
        this.$root.$data.title = this.title;
    }
});

const Projects = Vue.component('projects', {
    template: '#projects',
    data: function() {
        return {
            title: 'Projects'
        }
    },
    mounted() {
        this.$root.$data.title = this.title;
    }
});

const EditPtofile = Vue.component('edit-profile', {
    template: '#edit-profile',
    data: function() {
        return {
            title: 'Edit Profile'
        }
    },
    mounted() {
        this.$root.$data.title = this.title;
    }
});

const router = new VueRouter({
    // mode: 'history', !#
    routes: [
        { path: '/dashboard', component: Dashboard },
        { path: '/projects', component: Projects },
        { path: '/edit-profile', component: EditPtofile },

        { path: '*', component: Dashboard },
    ],
    linkActiveClass: "active"
});

const app = new Vue({
    el: '#app',
    router: router,
    data: function () {
        return {
            title: 'Dashboard'
        }
    }
});

$('#toggler').on('click', function () {
    $('.wrapper').toggleClass('open-sidebar');
    $(this).toggleClass('collapsed');
    $('.navbar').toggleClass('sticky-top');
    $('.sidebar .nav .nav-link, .sidebar .nav .profile').click(function () {
        $('.wrapper').removeClass('open-sidebar');
        $('#toggler').addClass('collapsed');
        $('.navbar').removeClass('sticky-top');
    });
});

