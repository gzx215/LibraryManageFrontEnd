<!--有前端验证注册信息是否合理-->

<template>
    <div class="login_container">
		<section class="formCon" v-show="1">
        <div class="h1">
        	<p>SIGN UP</p>
        </div>
            <el-form class="" ref="registerFormRef" :model="registerForm" :rules="registerFormRules" >
                <el-form-item  prop="name">
                    <el-input v-model="registerForm.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item  prop="username">
                    <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
                </el-form-item>
            	<el-form-item  prop="tel">
            	    <el-input v-model="registerForm.tel" placeholder="联系方式"></el-input>
            	</el-form-item>
                <el-form-item  prop="password">
                    <el-input type="password" v-model="registerForm.password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item  prop="confirmPassword">
                    <el-input type="password" v-model="registerForm.confirmPassword" placeholder="确认密码"></el-input>
                </el-form-item>
                <el-button  type="primary" @click="register" class="submit_btn">注册</el-button>
            	<!-- <a>Already Have One?</a> -->
            </el-form>
        
		</section>
    </div>
</template>

<script>
    export default {
        data()
        {
            let checkPassword = (rule, value, cb) =>
            {
                const regPassword = /^\w{6,15}$/;
                if (regPassword.test(value))
                {
                    //合法密码
                    return cb();
                }
                cb(new Error("密码必须在6-15个字符之间,只能由大小写字母数字下划线组成"));
            
            };
            let checkConfirmPassword = (rule, value, cb) =>
            {
                const regPassword = this.registerForm.password;
                if (regPassword === value)
                {
                    //合法密码
                    return cb();
                }
                cb(new Error("前后两次输入的密码必须一致!"));
            
            };
            
            let checkTel = (rule, value, cb) =>
            {
                const regTel = /^\d{11}$/;
                if (regTel.test(value))
                {
                    //合法密码
                    return cb();
                }
                cb(new Error("联系方式必须是11位电话号码!"));
            
            };

            return {
                //登录表单数据绑定
                registerForm: {
					name:'',
					username: '',
					tel: '',
					password: '',
					confirmPassword: ''
                },
                //表单的验证规则
                registerFormRules: {
                    name: [
                        {required: true, message: "请输入姓名", trigger: "blur"},
                        // {validator: checkName, trigger: "blur"},
                    	{min:3,max:7,message:"姓名必须是2-7位字符!", trigger: "blur"}
                    ],
                    tel: [
                        {required: true, message: "请输入联系方式", trigger: "blur"},
                        {validator: checkTel, trigger: "blur"}
                    ],
                    //    验证用户名是否合法
                    username: [
                        {required: true, message: "请输入用户名", trigger: "blur"},
                        {min: 3, max: 10, message: "用户名必须在3-10个字符之间", trigger: "blur"}
                    ],
                    //    验证密码是否合法
                    password: [
                        {required: true, message: "请输入密码", trigger: "blur"},
                        {validator: checkPassword, trigger: "blur"}
                    ],
                    confirmPassword: [
                        {required: true, message: "请再次确认密码", trigger: "blur"},
                        {validator: checkConfirmPassword, trigger: "blur"}
                    ],

                }
            }
        },
        methods: {
            //异步操作
            //根据status判断是否注册成功,成功跳转页面,失败显示msg在合适的地方
            register()
            {
                this.$refs.registerFormRef.validate(async valid =>
                {
                    if (!valid) return;

                    let msg="";
                    let status=200;

                    let result = await this.$http.get('/apip/api/register/submit',{
                        params:{
                            'name': this.registerForm.username,
                            'password': this.registerForm.password,
                            'contact': this.registerForm.tel}
                        }).catch(function (error)
                    {
                        if(error.response)
                        {
                            status = error.response.status;
                            msg = error.response.data.msg;
                        }
                    });

                    if (status === 400)
                    {
                        this.$message.info(msg);
                    } else
                    {
						let inf = result.data.error;
						let id = result.data.id;
						if(inf == "Handset Used" || inf == "Invalid phone number"){
							this.$message.info(inf);
						}
						else{
							window.sessionStorage.setItem('id', id);
							let tick = "your id is " + id;
							this.$message.info(tick);
							this.$router.push({path: '/login'}, onComplete =>
                        {
                        }, onAbort =>
                        {
                        })
						}
                        
                    }
                })
            }
        }
    }
</script>
<style scoped>
	.login_container{
		height: 100%;
		width: 100%;
		background-color: #c5f7d5;
		background-image: url(../../assets/img/bg1.jpg);
		background-size: 100%;
		background-attachment: fixed;
	}
	.formCon{
		width: 380px;
		height: 350px;
		position: absolute;
		top: 30%;
		left: 32%;
		
		/* margin-top: 160px;
		margin-left: 95px; */
		/* .wh(320px, 190px);
		.ctp(320px, 190px); */
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fdffff;
		
	}
	.h1{
		position: absolute;
		width: 100%;
		top: -100px;
		left: 0;
		font-weight: bold;
		color: #fff;
		font-size: 40px;
		font-family: "Microsoft Yahei", sans-serif;
	}
	.submit_btn{
			width: 100%;
			font-size: 16px;
		}
</style>
