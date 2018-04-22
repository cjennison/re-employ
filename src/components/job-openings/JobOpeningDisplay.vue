<template lang="pug">
    .job-opening-display
      .name {{ jobOpening.name }}
      .company {{ jobOpening.company }}
      .description {{ jobOpening.description }}
      a(:href='getApplicationUrl()', target='_blank') 
        el-button.url Apply
</template>

<script>
import { httpAdapter } from '../../services/HttpService';

export default {
  name: 'job_opening_display',
  props: {
    jobOpening: {
      type: Object,
      required: true
    }
  },
  methods: {
    getShortUrlHash() {
      const shortUrl = this.jobOpening.JobOpeningShortUrls;
      if (shortURL && shortUrl.length > 0) {
        const hash = this.jobOpening.JobOpeningShortUrls[0].hash;
        return hash
      }
    },
    getApplicationUrl() {
      const basePath = httpAdapter.basePath;
      const hash = this.getShortUrlHash();

      if (!hash) {
        return null;
      }
      return basePath + '/apply/' + hash
    }
  }
}

</script>
