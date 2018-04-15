<template lang="pug">
    .job-opening-card(:class="activeClass()")
      .name {{ jobOpening.name }}
      .company {{ jobOpening.company }}
      .description {{ jobOpening.description }}
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
