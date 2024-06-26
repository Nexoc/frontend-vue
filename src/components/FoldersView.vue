

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
                        <th>title</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="folder in folders" :key="folder.id">
                        <td>
                            <form @submit.prevent="getFolderById(folder.folderId)">
                                <button id='showFolder'>{{ folder.title }}</button>
                            </form>
                        </td>
                        <td>
                            <form @submit.prevent="updateFolder(folder.folderId)">
                                <button id='updateFolder'>Update</button>
                            </form>
                        </td>
                        <td>
                            <form @submit.prevent="deleteFolder(folder.folderId)">
                                <button id='deleteFolder'>Delete</button>
                            </form>
                        </td>
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
                getFolderById(folderId) {
                    // http://localhost:8001/api/v1/users/'+folder.userId+'/folders/'+folder.folderId
                    console.log("FolderView.vue 85 method get f by id -> " + folderId)   
                    var data = {
                        "folderId": folderId,
                        "userId": this.userId
                    }
                    this.$store.dispatch('folder/findFolderById', data)                    
                    .then(() => {                       
                        if (this.requestStatus == 200) {
                            this.$router.push('/dashboard') 
                        }
                    })
                }, 

                getAllFoldersByUser() {
                    // send to folder.js actions findFolderById  
                    console.log("FolderView.vue 96 method get All")                 
                    this.$store.dispatch('folder/findAllFolders', this.userId)
                    .then(() => {                        
                        if (this.requestStatus == 200) {
                            this.$router.push('/') 
                        }
                    })
                
                },  
                updateFolder(folderId) {
                    console.log("FolderView.vue method update -> " + folderId) 
                    var data = {
                        "folderId": folderId,
                        "title": "MY updated TITLE",
                        "userId": this.userId
                    }  
                    this.$store.dispatch('folder/updateFolder', data)                    
                    .then(() => {    
                        console.log("status " + this.requestStatus)                      
                        if (this.requestStatus == 200) {
                            this.$router.push('/') 
                        }
                    })
                },  
                deleteFolder(folderId) {
                    console.log("FolderView.vue  method delete -> " + folderId) 
                    var data = {
                        "folderId": folderId,
                        "userId": this.userId
                    }
                    this.$store.dispatch('folder/deleteFolder', data)                    
                    .then(() => {      
                        console.log("status " + this.requestStatus)             
                        if (this.requestStatus == 200) {
                            this.$router.push('/') 
                        }
                    })  
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
  
  