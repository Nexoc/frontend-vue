<script>
import SidebarLink from './SidebarLink'
import { collapsed, toggleSidebar, sidebarWidth } from './state'
import { mapGetters } from 'vuex';

export default {
  props: {},
  components: { SidebarLink },
  setup() {
      return { 
        collapsed, 
        toggleSidebar, 
        sidebarWidth 
      }
  },

  methods: {  
      logOut() {
            this.$store.dispatch('auth/logOut')
            .then(() => {
                this.$router.replace({
                    name: 'signin'
                })
            })
      },
  },

  computed: {  
      ...mapGetters({
            authenticated: 'auth/authenticated',
            username: 'auth/username',
            userId: 'auth/userId',
      })
  },
}
</script>

<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <i class="fas fa-angle-double-left" />
    </span>
    <br>

    <template v-if="authenticated">
        <h2>
          <span v-if="collapsed">
            <div>{{ username.charAt(0).toUpperCase() }}</div>
            <div>{{ username.charAt(1).toUpperCase() }}</div>          
          </span>
          <span v-else>{{ username }}</span>
        </h2>

        <SidebarLink to="/" icon="fas fa-home">Home</SidebarLink>
        <SidebarLink to="/show" icon="fas fa-chart-bar">show folders</SidebarLink>

        <SidebarLink to="/show-folder" icon="fas fa-columns">folder</SidebarLink>
        <SidebarLink to="/draw" icon="fas fa-users">draw</SidebarLink>
        <SidebarLink @click="logOut" to=""  icon="fas fa-image">Logout</SidebarLink>
        
    </template>

    <template v-else>
        <h2>
          <span v-if="collapsed">
            <div>N</div>
            <div>A</div>
          </span>
          <span v-else>Please Auth</span>
        </h2>

        <SidebarLink to="/" icon="fas fa-home">Home</SidebarLink>
        <SidebarLink to="/signin" icon="fas fa-user">Sign in</SidebarLink>
        <SidebarLink to="/registration" icon="fas fa-home">Registration</SidebarLink>             
    </template>
  </div>
</template>
