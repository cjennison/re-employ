<template lang="pug">
  .job_openings Job Opening
    .job-openings-container(v-loading="loading")
      #job-openings-error.error-banner(v-if="!jobOpenings.length && !loading") Sorry no jobs
      #job-openings-count(v-if="jobOpenings.length") We have found {{jobOpenings.length }} jobs
      
      .row
        .col-xs-4
          .job-openings-list 
          .job-opening-model(v-for="jobOpening in jobOpenings", v-on:click="selectJobOpening(jobOpening)")
            job-opening-card(:jobOpening="jobOpening", :active="selectedJobOpening.id === jobOpening.id")
        .col-xs-8
          .job-openings-display
            job-opening-display(:jobOpening="selectedJobOpening")
</template>

<script>

const JobOpenings = [
  {
    id: 1,
    name: 'Dog Catcher',
    applicationURL: 'http://hulu.com',
    company: 'City of Boston',
    description: 'Catch puppies'
  },
  {
    id: 2,
    name: 'Lab Assistant',
    applicationURL: 'http://reddit.com',
    company: 'Butts',
    description: 'Slave to the brain'
  },
  {
    id: 3,  
    name: 'President of the USA',
    applicationURL: 'http://whitehouse.gov',
    company: 'More butts',
    description: "Don't press the nuclear button. Get paid"
  }
]

import { store , httpAdapter } from '../../services/HttpService';
import scopeObject from '../../services/scope';
import JobOpeningCard from '../job-openings/JobOpeningCard.vue';
import JobOpeningDisplay from '../job-openings/JobOpeningDisplay.vue';

export default {
  name: 'job_openings',
  components: {
    JobOpeningCard,
    JobOpeningDisplay
  },
  created(){
    this.getJobOpenings()
  },
  data() {
    return {
      loading: false,
      selectedJobOpening: {},
      jobOpenings: []
    }
  },
  computed: {
    user () {
      return scopeObject.current_user
    }
  },
  methods: {
    selectJobOpening(jobOpening){
      this.selectedJobOpening = jobOpening;
    },
    getJobOpenings () {
      this.loading = true;
      store.findAll('jobOpening', {}, {
        basePath: httpAdapter.resourceBasePath('users', this.user.id)
      }).then((jobOpenings) => {
        this.jobOpenings = jobOpenings;
        this.selectedJobOpening = jobOpenings[0];
      }).catch((err) => {
        this.error = err;
      }).then (() => {
        this.loading = false;
      })
    }
  }
}
</script>

<style lang='scss'>

  .job_openings {
    .job-openings-container {
      .job-openings-list {
        display: inline-block;
        .job-opening-model {
          width: 250px;
          border: solid 1px;
        }
      }

      .job-openings-display {
        display: inline-block;
        border: solid 1px;
      }
    }
  }

</style>
