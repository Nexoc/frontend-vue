 <script>
    /* eslint-disable */
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
                    requestStatus: 'folder/requestStatus',
                    folderId: 'folder/folderId',
                    folderTitle: 'folder/title',
                    contents: "folder/contents",
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
                        this.$router.push('/') 
                        this.showUpdateField = false
                        this.showContentsField = false
                        }
                    })
                },    
                updateFolder(folderId) {
                    console.log("FolderView.vue method update -> " + folderId) 
                    // TODO UPDATE title
                    console.log("methods ->updateFolder -> title: " + this.title)
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
                            this.$router.push('/')                             
                        }
                    })
                },                 
                updateVariable(folderIdToBeUpdated){
                    this.$store.dispatch('folder/updateFolderId', folderIdToBeUpdated) 
                    this.showUpdateField = true
                    this.showContentsField = false
                    console.log("this.folderId = " + this.folderId + " and folderIdToBeUpdated = " + folderIdToBeUpdated 
                    + "showUpdateField -> " + this.showUpdateField)
                },
                getFolderById(folderId) {
                    // http://localhost:8001/api/v1/users/'+folder.userId+'/folders/'+folder.folderId
                    console.log("FolderView.vue 85 method get f by id -> " + folderId)   
                    var data = {
                        "folderId": folderId,
                        "userId": this.userId
                    }
                    this.$store.dispatch('folder/findFolderById', data)                    
                    .then(() => {  
                        this.showContentsField = false                     
                        if (this.requestStatus == 200) {
                            this.showUpdateField = false
                            this.$router.push('/dashboard') 
                        }
                    })
                }, 

                getAllFoldersByUser() {
                    // send to folder.js actions findFolderById  
                    console.log("FolderView.vue 96 method get All")                 
                    this.$store.dispatch('folder/findAllFolders', this.userId)
                    .then(() => {  
                        this.showContentsField = false                      
                        if (this.requestStatus == 200) {
                            this.showUpdateField = false
                            this.$router.push('/') 
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
                            // console.log("DoldersView.vue -> methods -> delete folder -> if response 200 -> check userId: " + this.userId)
                            this.$store.dispatch('folder/findAllFolders', this.userId)
                            this.showUpdateField = false
                            this.showContentsField = false
                            this.$router.push('/') 
                        }
                    })  
                },  
                showContents(folderId) {
                    // console.log("Folder vue -> show content ->folder id " + folderId)
                    var data = {
                        "folderId": folderId,
                        "userId": this.userId
                    }
                    this.$store.dispatch('folder/getContents', data)  
                    //this.$store.dispatch('folder/findFolderById', data)   
                    .then(() => {     
                    // console.log("folderVuew .> method show contents -> response status -> " + this.requestStatus) 
                    this.contentsToShow = {}
                    for( let i in this.contents) {
                            let content = {
                                "id": this.contents[i].contentId,
                                "title": this.contents[i].title,
                                "content": this.contents[i].content,
                                "file": this.contents[i].file,
                                "path": this.contents[i].filePath,
                                "published": this.contents[i].publishedOn
                            }                          
                            this.contentsToShow[i] = content                            
                        }
                    if (this.requestStatus <= 200) {
                        // console.log("FoldersView.vue -> methods -> show content folder -> if response 200 -> check contents length: " + this.contents.length)
                        // this.$store.dispatch('folder/findAllFolders', this.userId)
                        this.showUpdateField = false
                        this.showContentsField = true
                        this.$router.push('/') 
                        }
                    })  
                },       
                deleteContent(contentId){
                    // console.log("Folder vue -> delete content ->content id " + contentId)
                    this.$store.dispatch('content/deleteContent', contentId)  
                    .then(() => {   
                        console.log("FoldersView.vue -> methods -> delete content  -> response status: " + this.requestStatus)
                        if (this.requestStatus <= 200) {
                            this.$store.dispatch('folder/findAllFolders', this.userId)
                            this.showUpdateField = false
                            // console.log("Folder vue -> delete content ->folder id " + this.folderId)
                            this.showContents(this.folderId)
                            this.$router.push('/') 
                        }
                    })
                },  
                showContent(contentId) {
                    console.log("Folder vue -> delete content ->content id " + contentId)
                    this.$store.dispatch('content/findContentById', contentId)  
                    this.$router.push('/content/') 
                }         
        },
    }
      
</script>


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
                            <th>Show contents</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="folder in folders" :key="folder.id">
                            <td>
                                <form @submit.prevent="getFolderById(folder.folderId)">
                                    <button id='showFolder'>{{ folder.title }} and id {{ folder.folderId }}</button>
                                </form>
                            </td>
                            <td>
                            <template v-if=!showUpdateField>  
                                    <form @submit.prevent="updateVariable(folder.folderId)">
                                        <button id='updateVariable'>Update</button>
                                    </form>
                            </template>
                            <template v-if=showUpdateField>   
                                <template v-if="folder.folderId == this.folderId">                    
                                    <form @submit.prevent="updateFolder(this.folderId)">                                   
                                        <input type="text" name="title" placeholder="you new title" v-model="title"/>
                                        <button id='updateFolder'>Update</button>
                                    </form>  
                                </template>                                                     
                            </template>
                            </td>
                            <td>
                                <form @submit.prevent="deleteFolder(folder.folderId)">
                                    <button id='deleteFolder'>Delete</button>
                                </form>
                            </td>
                            <td>
                                <form @submit.prevent="showContents(folder.folderId)">
                                    <button id='showContent'>show contents</button>
                                </form>
                            </td>
                        </tr>
                    </tbody>
                </table>
             </template>  
    
             <template v-if="showContentsField">
                <div v-for="content in contentsToShow" :key="content.id">
                    <div class="table">
                    <p>Id {{ content.id }}</p>
                    <p>file {{  content.file }}</p>
                    <p>content {{ content.content }}</p>
                    <p>file path {{  content.path }}</p>
                    <p>Title {{  content.title }}</p>
                    <p>published: {{  content.published }}</p>
                    <div>
                        <form @submit.prevent="deleteContent(content.id)">
                                    <button id='deleteContent'>Delete: {{ content.title }}</button>
                        </form>   
                        <form @submit.prevent="showContent(content.id)">
                                    <button id='showContent'>show: {{ content.title }}</button>
                        </form>                       
                    </div>
                </div>
                </div>    
             </template>  
           
        </div>
      </div>
      </template>

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
  
  