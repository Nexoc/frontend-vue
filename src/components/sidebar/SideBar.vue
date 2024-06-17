<script>
import SidebarLink from './SidebarLink'
import { collapsed, toggleSidebar, sidebarWidth } from './state'
import { mapGetters } from 'vuex';

export default {
  props: {},
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth }
  },

  methods: {  
    logOut() {
                //console.log('log Out the navigation')
                this.$store.dispatch('logOut')
                .then(() => {
                    this.$router.replace({
                        name: 'signin'
                    })
                })
            },
   },

  computed: {
            ...mapGetters({
                authenticated: "authenticated",
                username: "username"
            })
        }
}
</script>

<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">

    <template v-if="authenticated">
      <h2>
        <span v-if="collapsed">
          <div>{{ username.charAt(0).toUpperCase() }}</div>
          <div>{{ username.charAt(1).toUpperCase() }}</div>
        </span>
        <span v-else>{{ username }}</span>
      </h2>

      <SidebarLink to="/" icon="fas fa-home">Home</SidebarLink>
      <SidebarLink to="/dashboard" icon="fas fa-columns">toolbar-menu</SidebarLink>
      <SidebarLink to="/about" icon="fas fa-chart-bar">Button</SidebarLink>
      <SidebarLink to="/draw" icon="fas fa-users">draw</SidebarLink>
      <SidebarLink to="/image" icon="fas fa-image">Log</SidebarLink>
      <form @submit.prevent="logOut"><button>Logout</button></form>
    </template>

    <template v-else>

      <h2>
        <span v-if="collapsed">
          <div>K</div>
          <div>A</div>
        </span>
        <span v-else>Please Auth</span>
      </h2>



      <SidebarLink to="/" icon="fas fa-home">Home</SidebarLink>
      <SidebarLink to="/signin" icon="fas fa-home">Sign in</SidebarLink>
      <SidebarLink to="/registration" icon="fas fa-home">Registration</SidebarLink>             
    </template>

    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <i class="fas fa-angle-double-left" />
    </span>
  </div>
</template>

<style>
:root {
  --sidebar-bg-color: #dcf8ea;
  --sidebar-item-hover: #38a169;
  --sidebar-item-active: #a2a8a5;
}
</style>

<style scoped>
.sidebar {
  color: rgb(0, 0, 0);
  background-color: var(--sidebar-bg-color);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.sidebar h1 {
  height: 2.5em;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;

  color: rgba(0, 0, 0, 0.7);

  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>