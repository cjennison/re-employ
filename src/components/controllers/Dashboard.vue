<template lang="pug">
    .dashboard DASHBOARD
      #dashboardSubtitle {{ currentDate }}
</template>

<script>

import moment from 'moment';

export default {
  name: 'dashboard',
  created() {
    this.currentDate = moment().format('l');
  },
  data(){
    return {
      currentDate: null
    }
  }
}
</script>

