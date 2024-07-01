 <script>
    /* eslint-disable */
    //<img src="@/assets/logo.png" alt="">
    import { mapGetters } from "vuex";
  
    export default {
        namespaced: true,
        name: 'folder',

        data() {
            return {   
                title: null,
                contentsToShow: {},
                showUpdateField: false,
                showContentsField: false,
                }
        },

        computed: {  
            ...mapGetters({
                    authenticated: 'auth/authenticated',
                    username: 'auth/username',
                    userId: 'auth/userId',
                    folders: 'auth/folders',
                    userRole: 'auth/userRole',
                    requestStatus: 'folder/requestStatus',
                    folderId: 'folder/folderId',
                    folderTitle: 'folder/title',
                    contents: "folder/contents",
                    toBeUpdated: 'content/toBeUpdated',                     
            })
        },

        methods: { 
                insertFolder() {
                    const data = {title: this.title, userId: this.userId}
                    // send to folder.js actions insertFolderdata                    
                    this.$store.dispatch('folder/insertFolderData', data)
                    .then(() => {                        
                    if (this.requestStatus == 201) {
                        this.$store.dispatch('folder/findAllFolders', this.userId)
                        this.$router.push('/show') 
                        this.showUpdateField = false
                        this.showContentsField = false
                        }
                    })
                },    
                updateFolder(folderId) {
                    var data = {
                        "folderId": folderId,
                        "title": this.title,
                        "userId": this.userId
                    }  
                    this.$store.dispatch('folder/updateFolder', data)                    
                    .then(() => {     
                        console.log("status " + this.requestStatus)                  
                        if (this.requestStatus == 200) {
                            this.showUpdateField = false
                            this.showContentsField = false
                            this.$store.dispatch('folder/findAllFolders', this.userId)
                            this.$router.push('/show')                             
                        }
                    })
                },                 
                updateVariable(folderIdToBeUpdated){
                    this.$store.dispatch('folder/updateFolderId', folderIdToBeUpdated) 
                    this.showUpdateField = true
                    this.showContentsField = false
                },

                createContent(folderId) {  
                    var data = {
                        "folderId": folderId,
                        "userId": this.userId
                    }
                    this.$store.dispatch('folder/findFolderById', data)                    
                    .then(() => {  
                        this.showContentsField = false                     
                        if (this.requestStatus == 200) {
                            this.showUpdateField = false  
                            this.$store.dispatch('content/toBeUpdated', false)                             
                            
                            this.$router.push('/create') 
                        }
                    })
                }, 

                getAllFoldersByUser() {
                    // send to folder.js actions findFolderById                  
                    this.$store.dispatch('folder/findAllFolders', this.userId)
                    .then(() => {  
                        this.showContentsField = false                      
                        if (this.requestStatus == 200) {
                            this.showUpdateField = false
                            this.$router.push('/show') 
                        }
                    })
                
                },   
                deleteFolder(folderId) {                    
                    var data = {
                        "folderId": folderId,
                        "userId": this.userId
                    }
                    this.$store.dispatch('folder/deleteFolder', data)                    
                    .then(() => {     
                        console.log("folderVuew .> methods delete -> response status -> " + this.requestStatus)    
                        if (this.requestStatus == 200) {
                            this.$store.dispatch('folder/findAllFolders', this.userId)
                            this.showUpdateField = false
                            this.showContentsField = false
                            this.$router.push('/show') 
                        }
                    })  
                },  
                showContents(folderId) {
                    var data = {
                        "folderId": folderId,
                        "userId": this.userId
                    }
                    this.$store.dispatch('folder/getContents', data)  
                    .then(() => {   
                        if (this.requestStatus == 200) {
                            this.showUpdateField = false
                            this.showContentsField = true
                            this.$router.push('/show') 
                            }
                    })  
                },    

                showContentsInNewWindow(folderId) {
                    var data = {
                        "folderId": folderId,
                        "userId": this.userId
                    }
                    this.$store.dispatch('folder/getContents', data)  
                    .then(() => {   
                        console.log("requestStatus: " + this.requestStatus)
                        if (this.requestStatus == 200) { 
                            this.$router.push('/show-folder') 
                        }
                    })
   
                },   

                deleteContent(contentId){
                    this.$store.dispatch('content/deleteContent', contentId)  
                    .then(() => {   
                        if (this.requestStatus <= 200) {
                            this.$store.dispatch('folder/findAllFolders', this.userId)
                            this.showUpdateField = false
                            this.showContents(this.folderId)
                            this.$router.push('/show') 
                        }
                    })
                },  

                showContent(contentId) {
                    this.$store.dispatch('content/findContentById', contentId)  
                    this.$router.push('/content') 
                },
        },
    }      
</script>

<template>
    <div class="body">
        <div id="app" class="main">    
            <div id='insertFolder'>
                <form @submit.prevent="insertFolder">
                    <input 
                        type="text" 
                        name="title" 
                        placeholder="your title of new folder" 
                        v-model="title" 
                        class="input-field" 
                        />
                    <button class="styled-button">insert new folder</button>
                </form>
            </div>
        
            <div id='showFoldersButton'  class="styled-button">
                <form @submit.prevent="getAllFoldersByUser">
                    <button  class="styled-button">show all folders</button>
                </form>
            </div>
    
            <template v-if="folders.length > 0">
                <table class="table">
                    <thead>
                        <tr>
                            <th>title</th>
                            <th>create new content</th>
                            <th>Update</th>
                            <th>Delete</th>
                            <th>Show contents</th>
                            <th>Show contents in new window</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="folder in folders" :key="folder.id">
                            <td>
                                {{ folder.title }} and id {{ folder.folderId }}
                            </td>
                            <td>
                                <form @submit.prevent="createContent(folder.folderId)">
                                    <button  class="styled-button" >create new content in this folder</button>
                                </form>
                            </td>
                            <td>
                            <template v-if=!showUpdateField>  
                                    <form @submit.prevent="updateVariable(folder.folderId)">
                                        <button  class="styled-button" >Update folder title</button>
                                    </form>
                            </template>
                            <template v-if=showUpdateField>   
                                <template v-if="folder.folderId == this.folderId">                    
                                    <form @submit.prevent="updateFolder(this.folderId)">                                   
                                        <input 
                                            type="text" 
                                            name="title" 
                                            placeholder="you new title" 
                                            v-model="title"
                                            class="input-field"
                                        />
                                        <button class="styled-button">Update folder title</button>
                                    </form>  
                                </template>                                                     
                            </template>
                            </td>
                            <td>
                                <form @submit.prevent="deleteFolder(folder.folderId)">
                                    <button class="styled-button">Delete folder</button>
                                </form>
                            </td>
                            <td>
                                <form @submit.prevent="showContents(folder.folderId)">
                                    <button class="styled-button">show contents</button>
                                </form>
                            </td>
                            <td>
                                <form @submit.prevent="showContentsInNewWindow(folder.folderId)">
                                    <button class="styled-button">show contents in new window</button>
                                </form>
                            </td>
                        </tr>
                    </tbody>
                </table>
             </template>  

             <template v-if="showContentsField">
                <div v-for="content in contents" :key="content.id">
                    <div class="table">  
                        <p>{{  content.title }}</p>
                        <img :src="content.path" :alt="content.title" width="75" height="50">
                    <div class="content-actions">
                        <form @submit.prevent="deleteContent(content.id)">
                                <button class="styled-button">Delete: {{ content.title }}</button>
                        </form>   
                        <form @submit.prevent="showContent(content.id)">
                                <button class="styled-button">show: {{ content.title }}</button>
                        </form>                       
                    </div>
                </div>
                </div>    
             </template>             
        </div>
      </div>
      </template>



<style scoped>
.body {
  font-family: Arial, sans-serif;
}

.main {
  padding: 20px;
}

#insertFolder,
#showFoldersButton {
  margin-bottom: 20px;
}

.input-field {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 10px;
  width: 300px;
}

.styled-button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
  transition-duration: 0.4s;
}

.styled-button:hover {
  background-color: white;
  color: black;
  border: 2px solid #4caf50;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.table th {
  background-color: #4caf50;
  color: white;
  text-align: left;
}

.content-item {
  margin-bottom: 20px;
}

.content-actions {
  display: flex;
  gap: 10px;
}

img {
  border-radius: 5px;
  margin-right: 10px;
}
</style>

  
  