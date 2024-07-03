<template v-if="authenticated">
        <div class="main">
        <div id='sidebarDiv'>    
            <button class="styled-button" @click="toggleSidebar">{{ collapsed ? 'open' : 'close' }} sidebar</button>
        </div>

        <div id='sidebarDiv'>   
        <form @submit.prevent="createContent(this.folderId)">
            <button class="styled-button">create new content</button>
        </form>   
        </div>
        <div v-for="content in contents" :key="content.id">
            <div class="table">  
                    <div class="show-folder-title"> 
                        <h2>{{ content.title }} </h2>
                        published on: {{ content.published }} <br>
                    </div>
                    <div class="v-html" v-html="content.content"></div>
                    <img :src="content.path" :alt="content.title" width="600" height="400">

                    <div class="content-actions">
                        <form @submit.prevent="deleteContent(content.id)">
                                <button class="styled-button">Delete: {{ content.title }}</button>
                        </form>   
                        <form @submit.prevent="showContent(content.id)">
                                <button class="styled-button">show: {{ content.title }}</button>
                        </form>     
                        <form @submit.prevent="updateContent()">
                                <button class="styled-button">update: {{ content.title }}</button>
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
            },

            updateContent() {
                this.$store.dispatch('content/toBeUpdated', true)
                this.$router.push('/create') 
        }   
        }
}
</script>


