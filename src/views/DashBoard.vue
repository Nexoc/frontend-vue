<template>
  
  <table>
  <tr>
    <th>  <Bar ref="toolbar" />   </th>
    <th>  <Draw ref="draw"/>  </th>
  </tr>

    <div id="save">
        <form @submit.prevent="handleInsertContentData">

          <button id='saveButton'>Save</button>          

        </form>
      </div>

</table>   
  
</template>
    
<script>
import Bar from '@/components/Bar/toolbar-menu/ToolBar.vue'
import Draw from '@/components/draw/DrawCanvas.vue'
import { mapActions } from 'vuex';

    export default {
      setup() {
        return {  }
      },
      components: { Bar, Draw },

      methods: {
          ...mapActions('content', ['insertContentData', 'updateContentData']),
          
          async handleInsertContentData() {
              // console.log("dashBoard.vue -> methods -> handleInsertContentData 36")
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
                  console.log("if(data.toBeUpdated) ->  data.contentId;" + dataAll.contentId)
                  await this.updateContentData(dataAll);
              } else {
                  await this.insertContentData(dataAll);
              }
  
              
          },

      },
}
</script>

<style>
    #save{
        margin-left: 100px;
    }


</style>
