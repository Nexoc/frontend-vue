<template>
  <div id='content'>
      <div class="show-folder-title"> 
          <h2>{{ title }}</h2>
          <h3>{{ username }}</h3>                        
          <p>published on: {{ publishedOn }}</p>
      </div>            
      <div>
        <img :src="fileUrl" :alt="title" width="600" height="400">
      </div>      
      <div v-html="contentAsHTML"></div>
      <div class="content-actions">
            <form @submit.prevent="updateContent()">
                <button class='styled-button,'>update {{ title }}</button>
            </form>                      
      </div>
  </div> 
</template>
  
<script>
  import { mapGetters } from 'vuex';
  
  export default {
    setup() {
      return {  }
    },
    computed: {  
        ...mapGetters({
            authenticated: 'auth/authenticated',
            username: 'auth/username',
            userId: 'auth/userId',

            // content.js
            contentId: 'content/contentId',                   
            title: 'content/title',   
            contentAsHTML: 'content/contentAsHTML',
            publishedOn: 'content/publishedOn',
            file: 'content/file',
            fileUrl: 'content/fileUrl',
            folderId: 'content/folderId',
            errorContentId: 'content/errorContentId',  
            toBeUpdated: 'content/toBeUpdated',          
        }),
    },
    components: { 
     },
     methods: {
        showContent(){
        },
        updateContent() {
          this.$store.dispatch('content/toBeUpdated', true)
          this.$router.push('/create') 
        }
      },
    }
</script>

