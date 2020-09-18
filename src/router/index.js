import Vue from 'vue'
import VueRouter from 'vue-router'

//index页面和他的组件
import Index from '../views/Index'
import Welcome from '../components/index/Welcome'
import Login from '../components/index/Login'
import StudentRegister from '../components/index/StudentRegister'

//book页面和他的组件
import Booking from '../views/Booking'
import BookingWelcome from '../components/booking/BookingWelcome'
import BookBorrows from '../components/booking/BookBorrows'
import BookReserve from '../components/booking/BookReserve'
import BookReturns from '../components/booking/BookReturns'
import BookExborrow from '../components/booking/BookExborrow'
import BookReview from '../components/booking/BookExborrow'

//searchbook页面和他的组件
import SearchBook from '../views/SearchBook'
import SearchBox from '../components/searchbook/SearchBox'
import AllBook from '../components/searchbook/AllBook'

//room页面和他的组件
import Room from '../views/Room'
import RoomList from '../components/room/RoomList'
import RoomReserve from '../components/room/RoomReserve'
//admin页面和他的组件
import Admin from '../views/Admin'

import adminInformation from '../components/admin/AdminInformation'


//studentHome页面和他的组件
import StudentHome from '../views/StudentHome'
import StudentInformation from '../components/studentHome/StudentInformation'
import StudentWelcome from '../components/studentHome/StudentWelcome'
import StudentCorporations from '../components/studentHome/StudentCorporations'
import JoinCorporations from '../components/studentHome/JoinCorporations'
import JoinActivity from '../components/studentHome/JoinActivity'

import PrincipalHome from '../views/PrincipalHome'
import PrincipleWelcome from '../components/principalHome/PrincipleWelcome'
import PrincipalActivity from '../components/principalHome/PrincipalActivity'
import PrincipalChange from '../components/principalHome/PrincipalChange'
import PrincipalNotice from '../components/principalHome/PrincipalNotice'
import PrincipalMember from '../components/principalHome/PrincipalMember'
import PrincipalCheckJoin from '../components/principalHome/PrincipalCheckJoin'
import PrincipalCheckActivity from '../components/principalHome/PrincipalCheckActivity'
import PrincipalSponsor from '../components/principalHome/PrincipalSponsor'

import AdminHome from '../views/AdminHome'
import AdminWelcome from '../components/adminHome/AdminWelcome'
import AdminSystem from '../components/adminHome/AdminSystem'
import AdminStudent from '../components/adminHome/AdminStudent'
import AdminInformation from '../components/adminHome/AdminInformation'
import AdminCheckActivity from '../components/adminHome/AdminCheckActivity'
import AdminCheckSponsor from '../components/adminHome/AdminCheckSponsor'
import JoinNewCorporation from "../components/studentHome/JoinNewCorporation";



Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Index
    },
    {
        path: '/index',
        component: Index,
        //当访问index,自动重定向到welcome页面
        redirect: '/welcome',
        //index页面的一些子路由
        children: [
            {path: '/welcome', component: Welcome},
            {path: '/login', component: Login},
            { path: '/studentRegister', component: StudentRegister },
            ]
    },
    {
        path: '/booking',
        component: Booking,
        //当访问booking,自动重定向到BookingWelcome页面
        redirect: '/BookingWelcome',
        //booking页面的一些子路由
        children: [
            { path: '/BookingWelcome', component: BookingWelcome },
            { path: '/BookBorrows', component: BookBorrows },
            { path: '/BookReserve', component: BookReserve },
            { path: '/BookReturns', component: BookReturns },
            { path: '/BookExborrow', component: BookExborrow },
        ]
    },
    {
        path: '/searchbook',
        component: SearchBook,
        //当访问searchbook,自动重定向到BookingWelcome页面
        redirect: '/SearchBox',
        //searchbook页面的一些子路由
        children: [
            { path: '/SearchBox', component: SearchBox },
            { path: '/AllBook', component: AllBook },
        ]
    },
    {
        path: '/room',
        component: Room,
        //当访问booking,自动重定向到BookingWelcome页面
        redirect: '/RoomList',
        //booking页面的一些子路由
        children: [
            { path: '/RoomList', component: RoomList },
            { path: '/RoomReserve', component: RoomReserve },
        ]
    },
    {
        path: '/admin',
        component: Admin,
        //当访问booking,自动重定向到BookingWelcome页面
        redirect: '/AdminInformation',
        //booking页面的一些子路由
        children: [
            { path: '/AdminInformation', component: adminInformation },
        ]
    },

    {
        path: '/studentHome',
        component: StudentHome,
        redirect:'/studentWelcome',
        children:[
            {path: '/studentInformation', component: StudentInformation},
            {path: '/studentWelcome', component: StudentWelcome},
            {path: '/studentCorporations', component: StudentCorporations},
            {path: '/joinCorporations', component: JoinCorporations},
            {path: '/joinActivity', component: JoinActivity},
            {path: '/joinNewCorporation', component: JoinNewCorporation}
        ]
    },
    {
        path: '/principalHome',
        component: PrincipalHome,
        redirect:'/principleWelcome',
        children:[
            {path: '/principleWelcome', component: PrincipleWelcome},
            {path: '/principalActivity', component: PrincipalActivity},
            {path: '/principalChange', component: PrincipalChange},
            {path: '/principalNotice', component: PrincipalNotice},
            {path: '/principalMember', component: PrincipalMember},
            {path: '/principalCheckJoin', component: PrincipalCheckJoin},
            {path: '/principalCheckActivity', component: PrincipalCheckActivity},
            {path: '/principalSponsor', component: PrincipalSponsor}
        ]

    },
    {
        path: '/adminHome',
        component: AdminHome,
        redirect:'/adminWelcome',
        children:[
            {path: '/adminWelcome', component: AdminWelcome},
            {path: '/adminSystem', component: AdminSystem},
            {path: '/adminStudent', component: AdminStudent},
            {path: '/adminInformation', component: AdminInformation},
            {path: '/adminCheckActivity', component: AdminCheckActivity},
            {path: '/adminCheckSponsor', component: AdminCheckSponsor}

        ]
    },
]

const router = new VueRouter({
    routes
});

// 挂载路由导航守卫
router.beforeEach((to, from, next) =>
{
    // to:要访问的路径
    // from从哪个路径来的
    // next代表放行
    if (to.path === '/login' || to.path === '/studentRegister' || to.path === '/welcome' || to.path === '/returns' || to.path === '/borrows')
    {
        return next();
    }
    else
    {
//    获取token
        let token = window.sessionStorage.getItem("token");
        if (!token) return next("/login");
        else return next();
    }
});

export default router
