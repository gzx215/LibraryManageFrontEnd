<template>

    <!--    页面布局-->
    <el-container class="home-container">
        <!--        头部区域-->
        <el-header>
            <div>
                <img src="../assets/img/tj_logo.png" height=40/>
            </div>
<!--            <div class="header-name">-->
<!--                {{username}}-->
<!--            </div>-->
            <div class="out-button">
                <el-button @click="logout" size="medium">  退出</el-button>
            </div>
        </el-header>
        <!--        页面主体-->
        <el-container>
            <!--            侧边栏-->
            <el-aside width="200px">
                <el-menu router
                         background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <el-menu-item index="/AllBook">所有图书</el-menu-item>
                    <el-menu-item index="/SearchBox">按书名搜索</el-menu-item>
                </el-menu>
            </el-aside>
            <!--            右侧内容主体-->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        data(){
            return{
                username: window.sessionStorage.getItem('token'),
            }
        },
        methods: {
            //退出按钮
            logout()
            {
                window.sessionStorage.clear();
                this.$router.push("index")
            },
        }
    };
</script>

<style scoped>
    .home-container {
        height: 100%;
    }

    .el-header {
        background-color: rgb(64,158,255);
        display: flex;
        justify-content: space-between;
        margin-left: 0;
        padding-left: 0;

    }

    .el-aside {
        /*background-color: gray;*/
    }

    .el-main {
        /*background-color: lightgoldenrodyellow;*/
    }

    .out-button{
        display: flex;
        justify-content: center;
        align-items: center;
    }


    .header-name{
        display: flex;
        justify-content: center;
        align-items: center;

    }

</style>
