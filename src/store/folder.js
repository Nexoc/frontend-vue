import axios from 'axios'

/* eslint-disable */ 
const state = {
        folderId: null, 
        title: null,              
        userId: null,
        contents : {},
        
        errorFolderId: null,
        folderStatus : null,
        requestStatus: null,
        errorStatus: null,

};
  
const mutations = {
        findFolderById (state, folderData) {
            //console.log('folder.js -> mutation ->  findFolderById')
            state.folderStatus = null
            state.errorFolderId = null
        },
        folderStatus(state, folderID){
            //console.log('folder.js -> mutation ->  folderStatus')
            state.folderStatus = "No folder with ID number: " + folderID
            state.errorFolderId = null
        },
        requestStatus(state, status) {
            //console.log('folder.js -> mutation ->  requestStatus')
            state.requestStatus = status
        },
        errorFolderId(state, errorStatus, folderId){
            //console.log('folder.js -> mutation ->  error folder id')
            state.errorFolderId = "Please use digits. Folder ID: " + folderId + " Request status: " + errorStatus
            state.folderStatus = null
        },
        updated(state, folderData) {
            //console.log('folder.js -> mutation ->  update')
        },
        deleteFolder(state, folderData){
            //console.log('folder.js -> mutation ->  delete')
        },

        insertFolderData(state, folderData){
            console.log("-> folder.js func insert folder")
            console.log(folderData)

            state.folderId = folderData.folderId
            state.title = folderData.title       
            state.userId = folderData.userId
            state.contents = folderData.contents
            state.requestStatus = folderData.status
            console.log("folder.js -> 55 requestStatus: " + folderData.status)
        }
};
  
const actions = {
        // get folder's data from DB per ID
        async findAllFolders({ dispatch }, userId) {
            // console.log("folder.js -> actions -> findAllFolders") 

            let http = "http://localhost:8001/api/v1/users/" + userId + "/folders/all"
            let response = await axios.get(http)
                .catch(error => {
                        console.error('Error to show all folders: ', error);
                                })
            if (response.status == 200) {   
                //console.log("folder.js -> actions -> findAllFolders 73")                
                dispatch('auth/allFoldersData', response.data, { root: true })       
            }
        },

        async findFolderById ({ commit }, folder) {},

        async updateFolder ({ commit }, folder) {},

        async deleteFolder ({ commit }, folder) {},

        async insertFolderData ({ commit }, data) {
            // Initialize your form data object with required data
            const folderDto = {
                folderId: null,
                title: data.title,
                userId: data.userId
            };            
            // Create a new FormData object to send
            const formData = new FormData();
            // key is 'folderDto' value is {}
            formData.append('folderDto', JSON.stringify(folderDto));
                
            let http = "http://localhost:8001/api/v1/users/" + data.userId + "/folders/add-folder"
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
        folderId (state) {
                return state.folderId                     
        },
        title(state) {
            return state.title
        },
        userId(state) {
            return state.userId
        },
        contents(state) {
            return state.contents
        },
        errorFolderId(state) {
            return state.errorFolderId
        },
        folderStatus(state) {
            return state.folderStatus
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
  