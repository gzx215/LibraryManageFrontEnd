<template>
  <div class="all-container">
    <el-form :model="ruleForm"
             status-icon
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="Äã"
                    prop="name">
        <el-input v-model.number="ruleForm.name"
                  style="width:300px;" placeholder="Enter true name"></el-input>
      </el-form-item>
      <el-form-item label="Contact"
                    prop="contact">
        <el-input v-model.number="ruleForm.contact"
                  style="width:300px;" placeholder="Enter phone number"></el-input>
      </el-form-item>
      <el-form-item label="Password"
                    prop="pass">
        <el-input v-model.number="ruleForm.pass"
                  style="width:300px;" placeholder="Enter password"></el-input>
      </el-form-item>
	  <el-form-item label="ConfirmPassword"
	                prop="checkPass">
	    <el-input v-model.number="ruleForm.checkPass"
	              style="width:300px;" placeholder="Check password"></el-input>
	  </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('ruleForm')">Submit</el-button>
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter password'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter the same password'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('Password does not match'))
      } else {
        callback()
      }
    }
    var checknum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Contact can not be empty'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('Please enter number'))
        } else {
          if (value.toString().length !== 11) {
            callback(new Error('The number must be legal'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    var check = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter contents'))
      } else { callback() }
    }
    return {
      ruleForm: {
        name: '',
        contact: '',
		pass: '',
        checkPass: '',
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        name: [
          { validator: check, trigger: 'blur' }
        ],
        contact: [
          { validator: checknum, trigger: 'blur' }
        ]

      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs.ruleForm.validate(async valid => {
        if (!valid) return;
        let Token = window.sessionStorage.getItem('token');
        let msg = "";
        let status = 200;
        let names = this.ruleForm.name;
        let contacts = this.ruleForm.contact;
        let pass = this.ruleForm.pass;
        names = encodeURI(encodeURI(names));
        let result = await this.$http.post('/apip/api/AdminOp/CreateAdminAccount?name=' + names + '&password=' + pass +'&contact=' + contacts ,
          {
            hearders: {
              'Authorization': Token,
            }
          })
          .catch(function (error) {
            if (error.response) {
              status = error.response.status;
              msg = error.response.data.msg;
            }
          });
		let idkey = result.data.id;
        let inf = result.data.error;
        if (inf === undefined) {
          inf = 'ID of new big brother is '+idkey;
          this.$message.info(inf);
		  alert(inf);
        }
        else {
          this.$message.info(inf);
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
</style>
