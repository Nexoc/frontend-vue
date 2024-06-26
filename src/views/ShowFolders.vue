<template>
  <h1>The sidebar is {{ collapsed ? 'closed' : 'open' }}</h1>
  <button @click="toggleSidebar">Toggle Sidebar</button>


</template>

<script>
import { collapsed, toggleSidebar } from '@/components/sidebar/state'
    /* eslint-disable */
import { mapGetters } from "vuex";

export default {
  namespaced: true,
  name: 'showFolders',


  data() {
            return {   
                collapsed, toggleSidebar,
                title: null,
                }
        },

        computed: {  
            ...mapGetters({
                    authenticated: 'auth/authenticated',
                    username: 'auth/username',
                    userId: 'auth/userId',
                    requestStatus: 'folder/requestStatus',
                    folderId: 'folder/folderId',
                    folderTitle: 'folder/title',
                    folders: 'auth/folders',
            })
        },
        methods: {  

        }


}
</script>