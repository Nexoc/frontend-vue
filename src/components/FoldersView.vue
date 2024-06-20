

<template>
  <div class="body">
    <div id="app" class="main">
      <img src="@/assets/logo.png" alt="">

        <form @submit.prevent="insertFolder">
        
            <div id='insertFolder'>
                <input type="text" name="title" placeholder="your title of new folder" v-model="title" />
            </div>

            <button id='insertFolder'>insert new folder</button>
        </form>

        <template v-if="authenticated">
            
        </template>

      </div>
  </div>
  </template>
  
  
  <script>
    /* eslint-disable */
    import { mapGetters } from "vuex";
    import store from '@/store/index'
    import folderStore from '@/store/folder'
  
    export default {
        namespaced: true,
        name: 'folder',

        data() {
            return {   
                title: null,
                }
        },

        computed: {
            ...mapGetters({
                    authenticated: "authenticated",
                    username: "username",   
                    userId: "userId",
                    //folderData: "folder/getData"                                                                                  
            }),    
        },

        methods: {   
                getFolderById() {
                //
                },  

                getAllFolderByUser() {
                //
                },  
                updateFolder() {
                //
                },  
                deleteFolder() {
                //
                },  
                insertFolder() {
                    // send to folder.js actions insertFolderdata
                    folderStore.dispatch('insertFolderData', this.title).then(() => {                        

                    if (folderStore) {
                        this.$router.push('/') 
                    }
                    })
                },                               
        },
    }
      
</script>

<style>
    #insertFolder{
        margin: 50px;
    }
</style>
  
  