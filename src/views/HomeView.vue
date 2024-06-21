<template>
  <div class="home">
    <template v-if="authenticated">
      <FoldersView />
    </template>
      <router-view />
  </div>

</template>

<script>
// @ is an alias to /src
import FoldersView from '@/components/FoldersView.vue'
import { mapGetters } from "vuex";

export default {
  name: 'HomeView',
  components: {
    FoldersView
  },
  computed: {  
      ...mapGetters({
            authenticated: 'auth/authenticated',
      })
  },
}
</script>
