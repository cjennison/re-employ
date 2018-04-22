<template lang="pug">
  .left-navigation-bar Left nav
    router-link(to="/" tag="button" id='home-button') Home
    router-link(to="/jobs" tag="button" id='jobs-button') Jobs
    router-link(v-if='authenticated', to="/opportunities" tag="button" id='opportunities-button') Opportunities
</template>

<script>
export default {
  name: 'left_navigation_bar',
  props: {
    authenticated: {
      type: Boolean,
      required: true
    }
  },
  
}
</script>

