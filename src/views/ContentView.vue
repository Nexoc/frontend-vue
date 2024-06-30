<template>
  <div id='content'>
      <br><br><br><br><br>
      <div><h1>title: {{ title }} </h1></div>
      <div>
          {{ username }}<br>     
          HERE Content.vue line 7 -> {{ publishedOn.slice(8, 10) }} {{ publishedOn.slice(5, 7) }} {{ publishedOn.slice(0, 4) }}<br>        
      </div>
      <div>
        <h1>{{ title }}</h1>
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
    components: { 

     },
     methods: {
        showContent(){
        },
        updateContent() {
          console.log("ContentView -> updateContent -> fileUrl -> " + this.fileUrl) 
          this.$router.push('/dashboard') 
        }

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
            contentStatus: 'content/contentStatus',
            requestStatus: 'content/contentStatus',
            errorStatus: 'content/errorStatus',            
        }),
    },
    }
  </script>


<style>
#content{
    margin-left: 50px;
}
</style>