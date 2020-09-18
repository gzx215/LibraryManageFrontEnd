<template>
    <div class="book_borrows">
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <header class="form_header">管理员罚单界面</header>
                <el-form ref="bookFormRef" :model="bookForm" :rules="bookFormRules"  label-width="110px" class="demo-now_Data">
                    <el-form-item label="图书ID" prop="book_id">
                        <el-input v-model="bookForm.book_id" placeholder="书籍ID"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="booking" class="submit_btn">解除罚单</el-button>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //登录表单数据绑定
                bookForm: {
                    book_id: '',
                },
                //表单的验证规则
                bookFormRules: {
                    //    验证用户名是否合法
                    book_id: [
                        { required: true, message: "请输入违规事件ID", trigger: "blur" },
                    ],
                }
            }
        },
        methods: {
            //异步操作
            booking() {
                this.$refs.bookFormRef.validate(async valid => {
                    if (!valid) return;
                    }
                    let msg = "";
                    let status = 200; 
                    let key = this.bookForm.book_id; 
                    let Token = window.sessionStorage.getItem('token'); //this.$message.info("The database isn't ready.");
                    let result = await this.$http.get('/apip/api/books/borrow/' + this.bookForm.book_id, {
                        hearders: {
                            'Authorization':Token
                        },
                    })
                        .catch(function (error) {
                            if (error.response) {
                                status = error.response.status;
                                msg = error.response.data.msg;
                            }
                        });
                    if (status === 400) {
                        this.$message.info("该书ID不存在 !");
                    }
                    else {
                        let borrow_id = "" + result.data[0].borrow_id;
                        let book_id = "" + result.data[0].book_id;
                       // let bookid=inf.book_id
                       // console.log(inf);
                        this.$message.info(borrow_id);
                       // this.$message.info(book_id);
                        //this.$message.info(result.data.reader_id);
                       // this.$message.info(result.data.time_slot_id);
                        //this.$message.info(result.data.renew);
                        //this.$message.info(result.data.state);
                        //this.$message.info(result.data.return_Time);
                    }
                });
            }
        }
    }
</script>

<style lang="less">

    @import '../style/mixin';

    .button_submit {
        text-align: center;
    }

    .form_header {
        text-align: center;
        margin-bottom: 30px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

        .avatar-uploader .el-upload:hover {
            border-color: #20a0ff;
        }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }

    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }

    .el-table .info-row {
        background: #c9e5f5;
    }

    .el-table .positive-row {
        background: #e2f0e4;
    }
</style>
