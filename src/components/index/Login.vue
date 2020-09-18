<template>
    <div class="login_container">
        <transition name="form-fade" mode="in-out">
			<section class='formCon'>
				<div class="libtip">
				     <p>图书馆管理系统</p>
				</div>
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px">
                <el-form-item  prop="username">
                    <el-input v-model="loginForm.username" placeholder="ID"></el-input>
                </el-form-item>
                <el-form-item  prop="password">
                    <el-input  type="password" v-model="loginForm.password" placeholder="密码"></el-input>
                </el-form-item>
                <el-button type="primary" @click="login" class="submit_btn">登录</el-button>
            </el-form>
			</section>
        </transition>
    </div>
</template>
<script>
    export default {
        data()
        {
            return {
                //登录表单数据绑定
                loginForm: {
                    username: '',
                    password: ''
                },
                //表单的验证规则
                loginFormRules: {
                    //    验证用户名是否合法
                    username: [
                        {required: true, message: "请输入ID", trigger: "blur"},
                        {min: 0, max: 100, message: "登录凭据必须为ID或11位手机号", trigger: "blur"}
                    ],
                    //    验证密码是否合法
                    password: [
                        {required: true, message: "请输入密码", trigger: "blur"},
                        {min: 6, max: 15, message: "密码必须在6-15个字符之间", trigger: "blur"}
                    ],

                }
            }
        },
        methods: {
            //异步操作
            login()
            {
                this.$refs.loginFormRef.validate(async valid =>
                {
                    if (!valid) return;

                    let msg = "";
                    let status = 200;
                    let key = this.loginForm.username;
                    let pass = this.loginForm.password;
                    // let result = await this.$http.get(this.$api.LoginUrl, this.loginForm)
                    let result = await this.$http.post('/apip/api/login/submit?id=' + key + '&password=' + pass)
                
                        .catch(function (error)
                    {
                        if (error.response)
                        {
                            status = error.response.status;
                            msg = error.response.data.msg;
                        }
                    });

                    if (status === 400)
                    {
                        this.$message.info(msg);
                    } 
					else
                    {
                        //let userType = result.data.userType;
						let inf = result.data.error;
                        let newToken = "bearer " + result.data.token;
                        //this.$message.info(result.data.userType);
                        window.sessionStorage.setItem('token', newToken);
						if (inf == "No such user information "+ key +" found"||inf == "Wrong password"||inf == "No such user registered with phone number "+key||inf == "Invalid input")
						{
							this.$message.info(inf);
						}
						else{
							if(key<10000)
                                await this.$router.push({ path: '/searchbook'});
							else
							    await this.$router.push({path: '/searchbook'});
						}

                        // if (newToken != "undefined")
                        // {
                        //     await this.$router.push({path: '/studentHome'});
                        // }
                        // else if (userType === 1)
                        // {
                        //     let result1 = await this.$http.post(this.$api.getClubNameUrl);
                        //     window.sessionStorage.setItem('name', result1.data.name);
                        //     await this.$router.push({path: '/principalHome'});
                        // }
                        // else
                        //     await this.$router.push({path: '/adminHome'});
                    }
                });


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
		width: 320px;
		height: 190px;
		position: absolute;
		top: 36%;
		left: 36%;
		
		/* margin-top: 160px;
		margin-left: 95px; */
		/* .wh(320px, 190px);
		.ctp(320px, 190px); */
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fdffff;
		
	}
	.libtip{
		position: absolute;
		width: 100%;
		top: -100px;
		left: 0;
		color: #fff;
		font-size: 40px;
	}
	.submit_btn{
			width: 100%;
			font-size: 16px;
		}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>
