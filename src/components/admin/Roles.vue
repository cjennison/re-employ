<template lang="pug">
  .roles ROLES
    el-row
      el-col(:span="8", :offset="4")
        el-form(ref="userFormData", :model="userFormData", :rules="userFormRules")
          el-form-item(label="Email Address", prop="emailAddress")
            el-input(v-model="userFormData.email", type='email', name="email-input" required="true")
          el-form-item
            el-button(@click="onSubmit", @keyup.enter.native="onSubmit") Find
    el-row(v-if='searchUser', v-loading='loading')
      el-col(:span="8", :offset="4")
        b.name {{ searchUser.firstName }} {{ searchUser.lastName }}
        br
        i.email {{ searchUser.email }}
        p.add-roleName
          h5 Add Role
          el-select(v-model="newRole" placeholder="Select")
            el-option(
              v-for="roleName in addableRoles"
              :key="roleName"
              :label="roleName"
              :value="roleName")
          el-button(v-if='newRole', @click='addRole') Add Role
        .roles Current Roles
          .no-role(v-if='!searchUser.Roles.length') No Roles
          ul
            li(v-for='role in searchUser.Roles')
              .role-name {{ role.name }}
              el-button(v-on:click='removeRole(role)') Remove Role
</template>

<script>
import { validateEmail } from '../../services/FormValidationHelper';
import { store } from '../../services/HttpService';
import scopeObject from '../../services/scope';

export default {
  name: 'admin_roles',
  data () {
    return {
      searchUser: null,
      newRole: null,
      addableRoles: ['admin', 'internal'],
      loading: false,
      userFormData: {
        email: null
      },
      userFormRules: {
        email: [
          { required: true, validator: validateEmail, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    admin_user () {
      return scopeObject.current_user
    }
  },
  methods: {
    addRole() {
      this.loading = store.create('user', null, {
        endpoint: `users/${this.searchUser.id}/roles/${this.newRole}`,
        force: true
      }).then(() => {
        this.onSubmit().then(() => {
          this.$notify({
            message: 'Updated User',
            type: 'success'
          });
        })
      }).catch((err) => {
        console.warn(err);
      }).then(() => {
        this.loading = false
      })
    },
    
    removeRole(role) {
      this.loading = store.destroy('user', null, {
        endpoint: `users/${this.searchUser.id}/roles/${role.id}`,
        force: true
      }).then(() => {
        this.onSubmit().then(() => {
          this.$notify({
            message: 'Updated User',
            type: 'success'
          });
        })
      }).catch((err) => {
        console.warn(err);
      }).then(() => {
        this.loading = false
      })
    },
    
    onSubmit() {
      return store.find('user', null, {
        endpoint: 'users/search',
        params: {
          email: this.userFormData.email,
          fields: ['Role']
        },
        force: true
      }).then((user) => {
        this.searchUser = user
        this.newRole = null
      }).catch((err) => {
        console.warn(err)
      }).then(() => {
        this.loading = false;
      })
    }
  }
}
</script>

