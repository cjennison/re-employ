<template lang="pug">
    .job-opening-display
      .name {{ jobOpening.name }}
      .company {{ jobOpening.company }}
      .description {{ jobOpening.description }}
      a(:href='jobOpening.applicationURL', target='_blank') 
        el-button.url Apply
</template>

<script>


export default {
  name: 'job_opening_display',
  props: {
    jobOpening: {
      type: Object,
      required: true
    }
  }
}

</script>
