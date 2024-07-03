<template>

  <template v-if="authenticated">
    <div id='sidebarDiv'>    
      <button class="styled-button" @click="toggleSidebar">{{ collapsed ? 'open' : 'close' }} sidebar</button>
    </div>    
      <FoldersView />
    </template>


</template>

<script>
    /* eslint-disable */
import { collapsed, toggleSidebar } from '@/components/sidebar/state'
import FoldersView from '@/components/FoldersView.vue'

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
        components: {
              FoldersView
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
