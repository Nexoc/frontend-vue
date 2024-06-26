import axios from 'axios'
/* eslint-disable */ 
const state = {
        contentId: null, 
        contentAsHTML: null,
        title: null,  
        file: null,    
        fileUrl: null,        
        folderId: null,        
        
        errorContentId: null,
        contentStatus : null,
        requestStatus: null,
        errorStatus: null
};
  
const mutations = {
        findContentById (state, contentData) {
            //console.log('content.js -> mutation ->  findContentById')
            state.contentStatus = null
            state.errorContentId = null
        },
        contentStatus(state, contentId){
            //console.log('content.js -> mutation ->  contentStatus')
            state.contentStatus = "No content with ID number: " + contentId
            state.errorContentId = null
        },
        requestStatus(state, status) {
            //console.log('content.js -> mutation ->  requestStatus')
            state.requestStatus = status
        },
        errorContentId(state, errorStatus, contentId){
            //console.log('folder.js -> mutation ->  error folder id')
            state.errorContentId = "Please use digits. content ID: " + contentId + " Request status: " + errorStatus
            state.contentStatus = null
        },
        findAllContents(state, contentData) {
            // console.log('content.js -> mutation ->  find')
        },

        updated(state, contentData) {
            //console.log('content.js -> mutation ->  update')
        },
        deleteContent(state, contentData){
            //console.log('content.js -> mutation ->  delete')
        },

        insertContentData(state, contentData){
            //console.log("-> content.js mutation insert content")
            //console.log(contentData)
            state.contentId = contentData.contentId
            state.contentAsHTML = contentData.content
            state.title = contentData.title
            state.file = contentData.file
            state.fileUrl = contentData.fileUrl
            state.folderId = contentData.folderId 
        }
};
  
const actions = {
        // get content's data from DB per ID
        async findAllContents({ commit }, content) {},

        async findContentById ({ commit }, content) {},

        async updateContent ({ commit }, content) {},

        async deleteContent ({ commit }, content) {},

        async getTextAsHTML ({ commit }, text) {
            //console.log("content.js -> actions -> saveTextAsHTML -> line 65")
            //console.log(text)
        },

        async insertContentData ({ commit }, data) {
            //console.log("content.js -> actions -> insertContentData -> line 81")
            // Initialize your form data object with required data

            // let canvasUrl = canvas.toDataURL("image/png", 0.5);
 
            //console.log("insertContentData TEXT -> " + data.text)
            //console.log("title -> " + data.title)
            //console.log("folder id -> " + data.folderId)
            //console.log("image " + data.image)

            // base64 image data
            const base64Image = data.image; 
            // Convert base64 to Blob
            const mimeType = base64Image.match(/([^;]+);/)[1];
            const imageBlob = base64ToBlob(base64Image, mimeType);

            const contentDto = {
                contentId: null,
                title: data.title,                
                content: data.text,
                folderId: data.folderId
            };            

            //console.log("content.js -> actions -> insertContentData -> line 96")
            // let canvasUrl = data.image.toDataURL("image/png", 1);
            
            // Create a new FormData object to send
            const formData = new FormData();
            // key is 'contentDto' value is {}
            formData.append('file', imageBlob, 'image.png');
            formData.append('contentDto', JSON.stringify(contentDto));
            
            //console.log("content.js -> actions -> insertContentData -> line 102")
                // api/v1/users/{userId}/folders/{folderId}/contents
            let http = "http://localhost:8001/api/v1/contents/add-content"
            //let http = "http://localhost:8001/api/v1/users/" + 1 + "/folders/" + 1 + "/contents/add-content"
            let response = await axios.post(http, formData)
                .catch(error => {
                        console.error('Error during inserting the new Content: ', error);
                                })

            let responseData = response.data;
            
            //console.log("rmyarr 115" + responseData.ArrayBuffer)
            if (response.status == 201) {    
                let contentData = {
                        "contentId": responseData.contentId,
                        "title": responseData.title,
                        "content": responseData.content,
                        "publishedOn": responseData.publishedOn,
                        "file": responseData.file,
                        "fileUrl": responseData.filePath,
                        "folderId": responseData.folderId,
                        "status": response.status,                        
                    }       
                commit('insertContentData', contentData)     
            }
        },
};
  
const getters = {
        contentId (state) {
            return state.contentId                     
        },
        title(state) {
            return state.title
        },
        contentAsHTML(state) {
            return state.contentAsHTML
        },
        file(state) {
            return state.file
        },
        fileUrl(state) {
            return state.fileUrl
        },
        errorContentId(state) {
            return state.errorContentId
        },
        contentStatus(state) {
            return state.contentStatus
        },
        requestStatus(state) {
            return state.requestStatus
        },
        errorStatus(state) {
            return state.errorStatus
        },
};
  
// base64ToBlob outside the actions
function base64ToBlob(base64, mime) {    
    const byteString = atob(base64.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mime });
}

export default {
        namespaced: true,
        state,
        mutations,
        actions,
        getters,
};
  