<template>
  <div class="home">
          <CVView />
      <router-view />
  </div>
</template>

<script>
// https://fontawesome.com/v4/icons/
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
