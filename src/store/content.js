import axios from 'axios'
/* eslint-disable */ 
const state = {
        contentId: null, 
        contentAsHTML: null,
        title: null,  
        file: null,            
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
            console.log('content.js -> mutation ->  find')
        },

        updated(state, contentData) {
            //console.log('content.js -> mutation ->  update')
        },
        deleteContent(state, contentData){
            //console.log('content.js -> mutation ->  delete')
        },

        insertContentData(state, contentData){
            console.log("-> content.js func insert content")
            console.log(contentData)
            state.contentId = contentData.contentId
        }
};
  
const actions = {
        // get content's data from DB per ID
        async findAllContents({ commit }, content) {},

        async findContentById ({ commit }, content) {},

        async updateContent ({ commit }, content) {},

        async deleteContent ({ commit }, content) {},

        async getTextAsHTML ({ commit }, text) {
            console.log("content.js -> actions -> saveTextAsHTML -> line 65")
            console.log(text)
        },

        async insertContentData ({ commit }, title) {
            console.log("content.js -> actions -> insertContentData -> line 69")
            // Initialize your form data object with required data
            const contentDto = {
                contentId: null,
                title: title,
                contentId: 1
            };            
            // Create a new FormData object to send
            const formData = new FormData();
            // key is 'folderDto' value is {}
            formData.append('contentDto', JSON.stringify(contentDto));
                
            let http = "http://localhost:8001/api/v1/users/1/folders/add-folder"
            let response = await axios.post(http, formData)
                .catch(error => {
                        console.error('Error during inserting the new Content: ', error);
                                })

            let responseData = response.data;
            if (response.status == 201) {    
                let contentData = {
                        "contentId": responseData.contentId,
                        "title": responseData.title,
                        "status": response.status
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
  

export default {
        namespaced: true,
        state,
        mutations,
        actions,
        getters,
};
  