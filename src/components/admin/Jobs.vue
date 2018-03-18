<template lang="pug">
  .admin-jobs JOBS
    .new-job Add a new job
      el-row
        el-col(:span="8", :offset="4")
          el-form(ref="jobForm", :model="jobForm", :rules="jobFormRules")
            el-form-item(label="Job name", prop="name")
              el-input(v-model="jobForm.name", type='input', name="name-input" required="true")
            el-form-item(label="Job description", prop="description")
              el-input(v-model="jobForm.description", type='input', name="description-input" required="true")
            el-form-item
              el-button(@click="createJob", @keyup.enter.native="onSubmit") Create
    .current-jobs
      ul
        li(v-for='job in jobs')
          .job-name {{job.name}}
          el-button(type='danger', v-on:click='deleteJob(job)') Delete Job
    
</template>

<script>
import { store } from '../../services/HttpService';

export default {
  name: 'admin_jobs',
  data () {
    return {
      jobs: null,
      jobForm: {
        name: null,
        description: null
      },
      jobFormRules: {
        name: [
          { required: true, trigger: 'blur' }
        ],
        description: [
          { required: true, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getJobs()
  },
  methods: {
    createJob() {
      store.create('job', this.jobForm, {
        force: true
      }).then((job) => {
        this.$notify({
          message: 'Created Job',
          type: 'success'
        });
        this.getJobs()
      }).catch((err) => {
        console.warn(err)
        this.$notify({
          message: 'Failed to create Job',
          type: 'error'
        });
      })
    },
    deleteJob(job) {
      store.destroy('job', job.id, {
        force: true
      }).then((job) => {
        this.$notify({
          message: 'Deleted Job',
          type: 'success'
        });
        this.getJobs()
      }).catch((err) => {
        this.$notify({
          message: 'Failed to delete Job',
          type: 'error'
        });
      })
    },
    getJobs() {
      this.loading = store.findAll('job').then((jobs) => {
        this.jobs = jobs;
      }).catch((err) => {
        console.warn(err)
      }).then(() => {
        this.loading = false;
      })
    },
  }
}
</script>

<style lang="scss">
  .admin-jobs {
    .job-name {
      display:inline;
      padding-right: 20px;
    }
  }
</style>
