<template v-if="authenticated">
        <div class="main">
        <div id='sidebarDiv'>    
            <button class="styled-button" @click="toggleSidebar">{{ collapsed ? 'open' : 'close' }} sidebar</button>
        </div>

        <form @submit.prevent="createContent(this.folderId)">
            <button class="styled-button">create new content</button>
        </form>   
        <div v-for="content in contents" :key="content.id">
            <div class="table">  
                    <div>   
                        ID :{{ content.id }} <br>
                        TITLE: {{ content.title }} <br>
                        published: {{ content.published }} <br>
                    </div>
                    <div v-html="content.content"></div>
                    <img :src="content.path" :alt="content.title" width="600" height="400">
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
    </div>
</template>  
    


<script>
    /* eslint-disable */
import { collapsed, toggleSidebar } from '@/components/sidebar/state'
import { mapGetters } from "vuex";


export default {
  namespaced: true,
  name: 'showFolders',

  data() {
            return {   
                collapsed, toggleSidebar,
                title: null,
                contentsToShow: {},
                showContentsField: false,
                }
        },
        components: {},

        computed: {  
            ...mapGetters({
                    authenticated: 'auth/authenticated',
                    userId: 'auth/userId',
                    requestStatus: 'folder/requestStatus',
                    folderId: 'folder/folderId',
                    folderTitle: 'folder/title',
                    contents: "folder/contents",
            })
        },
        methods: {  
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

            deleteContent(contentId){
                this.$store.dispatch('content/deleteContent', contentId)                  
                .then(() => {   
                    console.log("ShowFolder.vue -> methods -> deleteContent !!! " + this.requestStatus)
                    if (this.requestStatus == 200) {
                        console.log("ShowFolder.vue -> methods -> deleteContent -> userId: "
                         + this.userId + " folderId: " + this.folderId)
                        var data = {
                            "userId": this.userId,
                            "folderId": this.folderId
                        }
                        this.$store.dispatch('folder/getContents', data)
                        this.$router.push('/show') 
                    }
                })
                },  

            showContent(contentId) {
                this.$store.dispatch('content/findContentById', contentId)  
                this.$router.push('/content/') 
            }   
        }
}
</script>


<style>
    #sidebarDiv{
        margin-left: 16px;
    }

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

