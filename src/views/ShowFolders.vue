<template>

  <template v-if="authenticated">
    <div id='sidebarDiv'>    
      <button class="styled-button" @click="toggleSidebar">{{ collapsed ? 'open' : 'close' }} sidebar</button>
    </div>
    <br>
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

<style>
    #sidebarDiv{
        margin-left: 16px;

    }

  .styled-button {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 14px;
    transition-duration: 0.4s;
  }

  .styled-button:hover {
    background-color: white; 
    color: black; 
    border: 2px solid #4CAF50;
  }
</style>