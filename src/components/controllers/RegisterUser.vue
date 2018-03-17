<template lang='pug'>
  .register-user-controller(v-loading="processing")
    el-card
      .info Welcome! Please input your login information.
      el-row
        el-col(:span="16", :offset="4")
          el-form(ref="formData", :model="formData", :rules="rules")
            el-form-item(label="First Name", prop="emailAddress")
              el-input(v-model="formData.firstName", type='text', name="first-name-input" required="true")
            el-form-item(label="Last Name", prop="emailAddress")
              el-input(v-model="formData.lastName", type='text', name="first-name-input" required="true")
            el-form-item(label="Email Address", prop="emailAddress")
              el-input(v-model="formData.email", type='email', name="email-input" required="true")
            el-form-item(label="Password", prop="emailAddress")
              el-input(v-model="formData.password", type='password', name="password-input" required="true")
            el-form-item
              el-button(@click="onSubmit", :disabled="disableFormSubmit()" @keyup.enter.native="onSubmit") Submit
</template>

<script>
import { validateEmail } from '../../services/FormValidationHelper';
import { store } from '../../services/HttpService';

export default {
  name: 'register_user_controller',
  data () {
    return {
      processing: false,
      formData: {
        firstName: null,
        lastName: null,
        email: null,
        password: null
      },
      rules: {
        email: [
          { required: true, validator: validateEmail, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    disableFormSubmit () {
      return !this.formData.email || !this.formData.password
    },
    onSubmit () {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.processing = true
          console.log("Form is valid", this.formData)
          store.create('user', this.formData).then((response) => {
            if (response.status)
              this.processing = false;
              this.onSuccess();
            })
            .catch((err) => {
              console.warn(err);
              this.processing = false;
              this.onError();
            })
        }
      })
    },
    onSuccess () {
      this.$message({
        message: 'Created User!',
        type: 'success'
      });

      this.$auth.loginRedirect()
    },
    onError () {
      this.$message({
        message: 'There was an issue registering you. Please try again.',
        type: 'error'
      });
    }
  }
}
</script>