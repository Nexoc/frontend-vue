<template>
  
  <table>
  <tr>
    <th>  <Bar />   </th>
    <th>  <Draw />  </th>
  </tr>
</table>   
  
</template>
    
  <script>
    import Bar from '@/components/Bar/toolbar-menu/ToolBar.vue'
    import Draw from '@/components/draw/DrawCanvas.vue'
    
    export default {
      setup() {
        return {  }
      },
      components: { Bar, Draw }
    }
</script>
<style>

</style>

