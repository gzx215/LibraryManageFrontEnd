<template>
  <div class="book_search">
    <el-row style="margin-top: 20px;">
      <el-col :span="14" :offset="4">
        <header class="form_header"></header>
        <el-form
          ref="bookFormRef"
          :model="bookForm"
          :rules="bookFormRules"
          label-width="110px"
          class="demo-now_Data"
        >
          <!-- <el-form-item label="读者ID" prop="reader_id">
            <el-input v-model="bookForm.reader_id" placeholder="读者ID"></el-input>
          </el-form-item> -->
          <el-button type="primary" @click="search" class="submit_btn">点击获得所有图书信息</el-button>
        </el-form>
      </el-col>
    </el-row>
    <el-dialog title="所有图书" :visible.sync="searchdialogvisible" width="50%">
        <el-table :data="searchlist" style="width: 100%" border :stripe="true">
            <el-table-column prop="book_name" label="书名" width="120"></el-table-column>
            <el-table-column prop="id" label="馆藏ID"></el-table-column>
            <el-table-column prop="place_id" label="位置ID"></el-table-column>
            <el-table-column prop="publishing_house" label="出版社"></el-table-column>
            <el-table-column prop="introduction" label="简介"></el-table-column>
            <el-table-column prop="publication_date" label="出版时间"></el-table-column>
            <el-table-column prop="isbn" label="ISBN"></el-table-column>
            <el-table-column prop="author" label="作者"></el-table-column>
            <el-table-column prop="state" label="借还状态"></el-table-column>   
        </el-table>
        <!-- 底部按钮区域 -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="searchdialogvisible=false">确定</el-button>

        </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                searchlist:[],
                searchdialogvisible:false,
                //图书表单数据绑定
                bookForm: {
                    reader_id: '',
                },
                //表单的验证规则
                bookFormRules: {
                    //    验证书名是否合法
                    reader_id: [
                        { required: true, message: "请输入读者ID", trigger: "blur" },
                    ],
                }
            }
        },
        methods: {
            //异步操作
            search() {
                this.$refs.bookFormRef.validate(async valid => {
                    if (!valid) return;
                    let msg = "";
                    let status = 200; 
                    let key = this.bookForm.reader_id; 
                    let Token = window.sessionStorage.getItem('token'); //this.$message.info("The database isn't ready.");
                    let result = await this.$http.get('/apip/api/books', {
                        hearders: {
                            'Authorization': Token
                        },
                    })
                        .catch(function (error) {
                            if (error.response) {
                                status = error.response.status;
                                msg = error.response.data.msg;
                            }
                        });
                        this.searchlist=result.data
                    if (status === 400) {
                        this.$message.info("该人不存在 !");
                    }
                });

                this.searchdialogvisible=true


            }
        }
    }
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