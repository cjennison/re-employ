<template lang="pug">
  .job_openings Job Opening
    .job-openings-container(v-loading="loading")
      #job-openings-error.error-banner(v-if="!jobOpenings.length && !loading") Sorry no jobs
      #job-openings-count(v-if="jobOpenings.length") We have found {{jobOpenings.length }} jobs
      .job-openings-list 
        .job-opening-model(v-for="jobOpening in jobOpenings", v-on:click="selectJobOpening(jobOpening)")
          job-opening-card(:jobOpening="jobOpening", :active="selectedJobOpening.id === jobOpening.id")
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
    .then((jobOpenings) => {
      this.jobOpenings = jobOpenings;
      this.loading = false;
      this.selectedJobOpening = jobOpenings[0];
    })
    .catch(() => {});
  },
  data() {
    return {
      loading: false,
      selectedJobOpening: {},
      jobOpenings: []
    }
  },
  methods: {
    selectJobOpening(jobOpening){
      this.selectedJobOpening = jobOpening;
    },
    getJobOpenings () {
      this.loading = true;
      const promise = new Promise((resolve, reject) => {
        //Simulate getting data
        setTimeout(() => {
          resolve(JobOpenings)
        }, 1500);
      })

      return promise;
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
