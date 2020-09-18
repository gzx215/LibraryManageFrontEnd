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
                    <el-menu-item index="/BookBorrows">借阅书籍</el-menu-item>
                    <el-menu-item index="/BookExborrow">续借书籍</el-menu-item>
                    <el-menu-item index="/BookReserve">预约书籍</el-menu-item>
                    <el-menu-item index="/BookReturns">归还书籍</el-menu-item>
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
                booklist:
                {
                    book_id: '',
                }
            }
        },
        mounted: function () {
            this.warnings();
            this.bookcategory();
           
        },
        methods: {
            warnings() {
                let Token = window.sessionStorage.getItem('token');
                let result1 = this.$http.get('/apip/api/reader/ifcanborrow/', {
                    hearders: {
                        'Authorization': Token,
                    },
                })
                if (result1.data == 'false') {
                    window.sessionStorage.setItem('bookable', 'false')
                }
                let result2 = this.$http.get('/apip/api/reader/tip/', {
                    hearders: {
                        'Authorization': Token,
                    },
                })
                if (result2.data=='true')
                {
                    alert("你有超期书籍未归还！");
                }

            },
            bookcategory() {
                let status = 200;
                let Token = window.sessionStorage.getItem('token');
                this.$http.get('/apip/api/books/', {
                    hearders: {
                        'Authorization': Token,
                    },
                })
                    .then(function (response) {
                        var data = JSON.stringify(response.data);
                        alert(data);
                        window.sessionStorage.setItem('book', data);
                    }).catch(function (response) {
                        console.log(response);
                    });
            },
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
