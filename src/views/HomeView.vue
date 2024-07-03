<template>
  <div class="home">
          <CVView />
      <router-view />
  </div>

</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import CVView from '@/components/CV.vue'

export default {
  name: 'HomeView',
  components: {   
    CVView
  },
  computed: {  
      ...mapGetters({
            authenticated: 'auth/authenticated',
      })
  },
}
</script>
