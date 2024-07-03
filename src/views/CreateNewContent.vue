<template>

<div class="container">
    <div class="header">
        <div class="toolbar">
            <Bar ref="toolbar" />
        </div>
        <div class="draw">
            <Draw ref="draw" />
        </div>
    </div>
    <div id="save">
        <form @submit.prevent="handleInsertContentData">
            <button id="saveButton" class="styled-button">Save</button>
        </form>
    </div>
</div>

</template>
    
<script>
  import Bar from '@/components/Bar/toolbar-menu/ToolBar.vue'
  import Draw from '@/components/draw/DrawCanvas.vue'
  import { mapActions, mapGetters } from 'vuex';

    export default {
      setup() {
        return {  }
      },
      components: { Bar, Draw },

      computed: {  
            ...mapGetters({
                    requestStatus: 'folder/requestStatus', 
                    contentRequestStatus: 'content/requestStatus',                   
            }),
            
        },

      methods: {         
          
        ...mapActions('content', ['insertContentData', 'updateContentData']),

          async handleInsertContentData() {
              const data = this.$refs.toolbar.textSave();
              const canvas = this.$refs.draw.saveImage(); 

              const dataAll = {                                            
                "text": data.text,
                "title": data.title,
                "folderId": data.folderId,
                "image": canvas.image,
                "contentId": canvas.contentId,  
              }

              if(canvas.toBeUpdated) {                  
                  await this.updateContentData(dataAll);
              } else {
                  await this.insertContentData(dataAll);
              }               
              if (this.contentRequestStatus == 201) {                
                  // this.$store.dispatch('folder/getContents', userIdAndFolderIdData)
                  this.$router.push('/show') 
              }          
          },
      },
}
</script>

<style>
    @import '@/assets/css/index.css';
</style>
  
