<template lang="pug">
  .jobs(v-loading="loading")
    h1 Jobs
    hr
    h5 {{user.firstName}}'s Jobs
    el-alert(v-if='!user.Jobs.length', type="warning", title="You have no jobs! Add one.")
    ul
      li(v-for='job in user.Jobs')
        .job-name {{job.name}}
        el-button(v-on:click='removeUserJob(job)') Remove Job
    
    .new-job
      h4 Add a New Job
      el-alert(v-if='!filterJobs().length', type="warning", title="There are no jobs for you at this time.")

      ul
        li.job(v-for="job in filterJobs()") 
          .job-name {{job.name}}
          el-button(v-on:click='addJobToUser(job)') Add Job
</template>

<script>
import { store , httpAdapter} from '../../services/HttpService';
import scopeObject from '../../services/scope';
import UserUpdater from '../../services/UserUpdater';
import _ from 'lodash';

export default {
  name: 'jobs',
  data() {
    return {
      jobs: [],
      loading: false
    }
  },
  computed: {
    user () {
      return scopeObject.current_user
    }
  },
  methods: {
    getJobs() {
      this.loading = store.findAll('job').then((jobs) => {
        this.jobs = jobs;
      }).catch((err) => {
        console.warn(err)
      }).then(() => {
        this.loading = false;
      })
    },

    filterJobs() {
      return _.reject(this.jobs, (job) => {
        return _.find(this.user.Jobs, (userjob) => {
          return userjob.id == job.id
        })
      })
    },

    addJobToUser(job) {
      this.loading = store.create('job', {}, {
        basePath: httpAdapter.resourceBasePath('users', this.user.id),
        endpoint: `jobs/${job.id}`
      }).then(() => {
        UserUpdater.updateUser().then(() => {
          this.loading = false;
          this.$notify({
            message: 'Successfully added job',
            type: 'success'
          });
        })
      }).catch((error) => {
        console.warn(error);

        this.$notify({
          message: 'There was an error adding your job',
          type: 'danger'
        });
      })
    },

    removeUserJob(job) {
      this.loading = store.destroy('job', job.id, {
        basePath: httpAdapter.resourceBasePath('users', this.user.id),
        endpoint: `jobs`
      }).then(() => {
        UserUpdater.updateUser().then(() => {
          this.loading = false;

          this.$notify({
            message: 'Successfully removed job',
            type: 'success'
          });
        })
      }).catch((error) => {
        console.warn(error);

        this.$notify({
          message: 'There was an error removing your job',
          type: 'danger'
        });
      })
    }
  },
  created() {
    this.getJobs()
  }
}
</script>

<style lang="scss">
  .jobs {
    .job-name {
      display: inline;
      padding-right: 30px;
    }
  }
</style>
