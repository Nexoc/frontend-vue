

<template>
<div class="body">
    <div id="app" class="main">
        <img src="@/assets/logo.png" alt="">

        <div id='insertFolder'>
            <form @submit.prevent="insertFolder">
                <input type="text" name="title" placeholder="your title of new folder" v-model="title" />
                <button id='insertFolder'>insert new folder</button>
            </form>
        </div>

        <template v-if="requestStatus == 201">
            <div id='folderInfo'>
            {{ requestStatus }} <br>
            {{ folderId }} <br>
            {{ folderTitle }} <br>
            </div>                    
        </template>

        <div id='showFoldersButton'>
            <form @submit.prevent="getAllFoldersByUser">
                <button id='showFolders'>show all folders</button>
            </form>
        </div>

        <template v-if="true">
            <table class="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>title</th>
                        <th>owner</th>
                        <th>content {}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="folder in folders" :key="folder.id">
                        <td> Folder id {{folder.folderId}}</td>
                        <td>Folder title {{folder.title}}</td>
                        <td>Folder user owner {{folder.userId}}</td>
                        <td>content {{folder.contents}}</td>
                    </tr>
                </tbody>
            </table>
         </template>      
    </div>
  </div>
  </template>
  
  
  <script>
    /* eslint-disable */
    import { mapGetters } from "vuex";
  
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
                getFolderById() {
                //
                }, 

                getAllFoldersByUser() {
                    // send to folder.js actions findFolderById  
                    console.log("FolderView.vue 67 method get All")                 
                    this.$store.dispatch('folder/findAllFolders', this.userId)
                    .then(() => {                        
                        if (this.requestStatus == 200) {
                            this.$router.push('/') 
                        }
                    })
                //
                },  
                updateFolder() {
                //
                },  
                deleteFolder() {
                //
                },  
                insertFolder() {
                    const data = {title: this.title, userId: this.userId}
                    // send to folder.js actions insertFolderdata                    
                    this.$store.dispatch('folder/insertFolderData', data)
                    .then(() => {                        
                    if (this.requestStatus == 201) {
                        this.$store.dispatch('folder/findAllFolders', this.userId)
                        this.$router.push('/') 
                    }
                    })
                },                               
        },
    }
      
</script>

<style>
    #insertFolder{
        margin-left: 50px;
    }
    #folderInfo{
        margin-left: 50px;
    }
    #showFoldersButton{
        margin: 50px;
    }
    .table{
        margin: 50px;
        border: 10px solid red;
    }

</style>
  
  