<template>
  <div id='content'>
      <br><br><br><br><br>
      <div><h1>title: {{ title }} </h1></div>
      <div>
          {{ username }}<br>     
          HERE Content.vue line 7 BUG! -> {{ publishedOn }} toBeUpdated: {{ toBeUpdated }}<br>        
      </div>
      <div>
        <img :src="fileUrl" :alt="title" width="600" height="400">
      </div>      
      <div v-html="contentAsHTML"></div>
      <div>
            <form @submit.prevent="updateContent()">
                <button id='updateContent'>update {{ title }}</button>
            </form>                      
      </div>
  </div> 
</template>
  
  <script>
  /* eslint-disable */
  import { mapActions, mapGetters } from 'vuex';
  
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
          console.log("ContentView -> updateContent -> fileUrl -> " + this.fileUrl + " -> this.toBeUpdated is: " + this.toBeUpdated) 
          this.$router.push('/create') 
        }

    },
    }
  </script>


<style>
#content{
    margin-left: 50px;
}
</style>