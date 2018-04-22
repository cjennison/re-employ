<template lang="pug">
    .job-opening-card(:class="activeClass()")
      .name {{ jobOpening.name | truncate(100) }}
      .company {{ jobOpening.company | truncate(100) }}
      .description {{ jobOpening.description | truncate(100, '...') }}
</template>

<script>


export default {
  name: 'job_opening_card',
  props: {
    active: {
      type: Boolean
    },
    jobOpening: {
      type: Object,
      required: true
    }
  },
  methods: {
    activeClass() {
      if (this.active) {
        return 'active'
       }
    }
  }
}

</script>

<style lang="scss">
  .job-opening-card {
    &.active {
    background: lightgray;
  }
}
</style>
