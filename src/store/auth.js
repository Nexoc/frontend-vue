import axios from 'axios'

const state = {
    access_token: null, 
    refresh_token: null,
    isAuthenticated: null,
    signInError: null,
    username: null,
    userId: null
  };
  
const mutations = {
    signInToken (state, userData) {
        state.access_token = userData.access_token
        state.refresh_token = userData.refresh_token
        state.signInError = null
        state.username = userData.username   
        state.userId = userData.userId         
    },
    logOut (state) {
            // console.log('mutation Log Out')
            state.access_token = null
            state.refresh_token = null
            state.username = null
            state.userId = null
    },
    insertUser (state, userData) {
            // console.log('mutation insert User')
            state.access_token = userData.accessToken
            state.refresh_token = userData.refreshToken
            state.username = userData.username
            state.userId = userData.userId            
    },
    signInError(state) {
            //console.log('mutation sign up Error') 
            state.signInError = 'Username or passwort are wrong'
    }
};
  
const actions = {
    async signIn ({ commit }, user) {  // { dispatch}
        //console.log('action signIn')
          const form = {
            "email": user.email,
            "password": user.password
          }
          try{           
              let response = await axios.post('/api/v1/auth/login', form, {
                headers: {
                  skipAuthorization: true  // Custom flag to skip the Authorization header
                }
              })

              if (response.status == 200) { 

                const userData = {
                  "access_token": response.data.accessToken,
                  "refresh_token": response.data.refreshToken,
                  "username": response.data.username,
                  "userId": response.data.userId,
                }
                localStorage.setItem("access_token", response.data.accessToken)
                localStorage.setItem("refresh_token", response.data.refreshToken)
                localStorage.setItem("username", response.data.username)
                localStorage.setItem("userId", response.data.userId)   
                commit('signInToken', userData)
              } 
          } catch(error) {
              //console.log('signIn in index.js catched an error')
              console.log('Error during signIn:', error)
              commit('signInError')
          }
    },


    logOut({ commit }) {
          commit('logOut')
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          localStorage.removeItem('username')
          localStorage.removeItem('userId')
    },

    // create | insert a new User
    async insertUser ({ commit }, user) {  // { dispatch, commit }          

            const form = {
                "name": user.name,
                "email": user.email,
                "username": user.username,
                "password": user.password,
            }
            
            let response = await axios.post('/api/v1/auth/register', form, {
                headers: {
                    skipAuthorization: true  // Custom flag to skip the Authorization header
                }
                })
                .catch(error => {
                console.error('Error during registration:', error);
                    })           

            if (response.status == 200) {           
                localStorage.setItem("access_token", response.data.accessToken)
                localStorage.setItem("refresh_token", response.data.refreshToken)
                localStorage.setItem("username", response.data.username) 
                localStorage.setItem("userId", response.data.userId)  
                
                const userData = {
                    "accessToken": response.data.accessToken,
                    "refreshToken": response.data.refreshToken,
                    "username": response.data.username,
                    "userId": response.data.userId
                }
                commit('insertUser', userData)
            }

    }
};

  

const getters = {
    authenticated (state){
        return state.access_token
    }, 
    newUser (state) {
        let newUser = {
          "access_token": state.access_token, 
          "refresh_token": state.refresh_token,                      
        }
        return newUser
    },
    access_token (state) {
        return state.access_token
    },
    refresh_token(state) {
        return state.refresh_token
    },
    signInError(state){
        return state.signInError
    },
    username(state){
        return state.username
    },
    userId(state){
        return state.userId
    },
};
  

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
  
