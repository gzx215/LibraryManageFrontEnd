<template>
    <div class="room_reserves">
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <header class="form_header">自习室预约</header>
                <el-form ref="roomFormRef" :model="roomForm" :rules="roomFormRules" label-width="110px" class="demo-now_Data">
                    <el-form-item label="自习室ID" prop="room_id">
                        <el-input v-model="roomForm.room_id" placeholder="自习室ID"></el-input>
                    </el-form-item>
                    <el-form-item label="座位ID" prop="seat_id">
                        <el-input v-model="roomForm.seat_id" placeholder="座位ID"></el-input>
                    </el-form-item>
                    <el-form-item label="日期" prop="date">
                        <el-date-picker v-model="roomForm.date"
                                        align="right"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择日期"
                                        :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-button type="primary" @click="roomreserve" class="submit_btn">提交申请</el-button>
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
                pickerOptions: {},
                roomForm: {
                    room_id: '',
                    reader_id: '',
                    date:'',
                },
                //表单的验证规则
                roomFormRules: {
                    //    验证用户名是否合法
                    room_id: [
                        { required: true, message: "请输入自习室id", trigger: "blur" },
                    ],
                    seat_id: [
                        { required: true, message: "请输入座位id", trigger: "blur" },
                    ],
                    date: [
                        { required: true, message: "请输入特定日期", trigger: "blur" },
                    ],
                }
            }
        },
        methods: {
            //异步操作
            roomreserve() {
                this.$refs.roomFormRef.validate(async valid => {
                    if (!valid) return;
                    let msg = "";
                    let status = 200; 
                    let key = this.roomForm.room_id; 
                    let Token = window.sessionStorage.getItem('token'); 
                    let result = await this.$http.get('/apip/api/studyroom/reserveforrooms', {
                        hearders: {
                            'Authorization': Token
                        },
                        params: {
                            'roomId': this.roomForm.room_id,
                            'seatId': this.roomForm.seat_id,
                            'date': this.roomForm.date,
                        }
                    })
                        .catch(function (error) {
                            if (error.response) {
                                status = error.response.status;
                                msg = error.response.data.msg;
                                
                            }
                        });
                    if (status === 400) {
                        this.$message.info(msg);
                    }
                    else {
                        let inf = result.data.error;

                        //this.$message.info("The database isn't ready.");
                        //if (inf == "No such user information " + key + " found" || inf == false) {
                        if (inf == "No such user information " + key + " found" ) {
                            this.$message.info("Operation failed : No such room found !");
                        }
                        else {
                            this.$message.info("Succeed!");
                        }

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
