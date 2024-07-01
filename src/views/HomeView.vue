<template>
  <div class="home">
    <template v-if="authenticated">
      HERE wird my CV
    </template>
      <router-view />
  </div>

</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";

export default {
  name: 'HomeView',
  components: {      
  },
  computed: {  
      ...mapGetters({
            authenticated: 'auth/authenticated',
      })
  },
}
</script>
