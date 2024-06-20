import axios from 'axios'

const state = {
        folderId: null, 
        title: null,              
        userId: null,
        contents : {},
        
        errorFolderId: null,
        folderStatus : null,
        requestStatus: null,
        errorStatus: null
};
  
const mutations = {
        findFolderById (state, folderData) {
            //console.log('mutation get Folder')   
            state.folderStatus = null
            state.errorFolderId = null
        },
        folderStatus(state, folderID){
            state.folderStatus = "No folder with ID number: " + folderID
            state.errorFolderId = null
        },
        requestStatus(state, status) {
            state.requestStatus = status
        },
        errorFolderId(state, errorStatus, folderId){
            //console.log('mutation error folder id')
            state.errorFolderId = "Please use digits. Folder ID: " + folderId + " Request status: " + errorStatus
            state.folderStatus = null
        },
        findAllFolders(state, folderData) {},

        updated(state, folderData) {
            //
        },
        deleteFolder(state, folderData){},

        insertFolderData(state, folderData){
            console.log("-> folder.js func insert folder")
            console.log(folderData)

            state.folderId = folderData.folderId
            state.title = folderData.title       
            state.userId = folderData.userId
            state.contents = folderData.contents
            state.requestStatus = folderData.status
        }
};
  
const actions = {
        // get folder's data from DB per ID
        async findAllFolders({ commit }, folder) {},

        async findFolderById ({ commit }, folder) {},

        async updateFolder ({ commit }, folder) {},

        async deleteFolder ({ commit }, folder) {},

        async insertFolderData ({ commit }, title) {
            // Initialize your form data object with required data
            const folderDto = {
                folderId: null,
                title: title,
                userId: 1
            };            
            // Create a new FormData object
            const formData = new FormData();
            formData.append('folderDto', JSON.stringify(folderDto));
                
            let http = "http://localhost:8001/api/v1/users/1/folders/add-folder"
            let response = await axios.post(http, formData)
                .catch(error => {
                        console.error('Error during inserting the new FOLDER: ', error);
                                })

            let responseData = response.data;
            if (response.status == 201) {    
                let folderData = {
                        "folderId": responseData.folderId,
                        "title": responseData.title,
                        "userId": responseData.userId,
                        "contents": responseData.contents,
                        "status": response.status
                    }       
                commit('insertFolderData', folderData)     
            }
        },
};
  
const getters = {
    getFolderId (state) {
        if(state.folderId != null) {
            return state.folderId
        }               
    },
};
  

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
  