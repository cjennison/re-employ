<template lang="pug">
    .admin
      .page-title Admin Controls
      .nav-title Navigation
      router-link(to='/admin/roles') Roles Associator
      router-link(to='/admin/jobs') Job Viewer

      hr
      router-view
</template>

<script>
export default {
  name: 'home',
  created() {

  }
}
</script>

