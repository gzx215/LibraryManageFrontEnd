<template>
    <el-container class="index-container">
        <!--        上边框-->
        <el-header class='elheader'>
            <!--            开启了路由模式-->
            <el-menu router
                     class="elmenu" mode="horizontal">

                <el-menu-item index="/login">登录</el-menu-item>
                <el-menu-item index="/studentRegister">学生注册</el-menu-item>
            </el-menu>
        </el-header>
        <!--        主体区域-->
        <el-main class='elmain'>
            <!--            路由占位符-->
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script></script>

<style scoped>
    .index-container {
        height: 100%;
    }
	.elheader{
		padding:0px;
	}

    .elmenu {
        border-radius: 2px;
        list-style: none;
        position: relative;
        margin: 0;
        padding-left: 0;
        background-color: #eef1f6;
    }
    /* .el-header {
        background-color: #fff;

        display: flex;
        justify-content: space-between;
    } */

    .elmain {
        background-color: rgb(255,255,255);
		padding:0px;
    }
</style>
