<template>
  <div class="home">
    <FoldersView />
    <router-view />
  </div>

</template>

<script>
// @ is an alias to /src
import FoldersView from '@/components/FoldersView.vue'

export default {
  name: 'HomeView',
  components: {
    FoldersView
  }
}
</script>
