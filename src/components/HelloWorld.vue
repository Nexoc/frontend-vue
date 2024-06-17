

<template>
  <div class="body">
    <div id="app" class="main">
      <img src="@/assets/logo.png" alt="">
      <template v-if="true">

      </template>
      </div>
  </div>
  </template>
  
  
  <script>
  /* eslint-disable */
      import { mapGetters, createStore } from "vuex";
      import axios from 'axios'
      import store from '@/store/index'
  
  
      const reporterStore = createStore({
  
          namespaced: true,
  
          state: {
              reporterID: null, 
              errorReporterId: null,

          },
  
          getters: {
              getData (state){
                  let data = {
                      "reporterId": state.reporterID,
                      "first_name": state.first_name,
                      "last_name": state.last_name,
                      "username": state.username,
                      "language_code": state.language_code,
                      "phone_number": state.phone_number,
                      "email": state.email,
                  }
                  return data                   
              }, 
  
              requestStatus (state){
                  return state.requestStatus
              },
              errorReporterId(state) {
                  return state.errorReporterId
              }
          },
  
          mutations: {
              getReporter (state, userData) {
                  //console.log('mutation get Reporter')     

                  state.reporterStatus = null
                  state.errorReporterId = null
              },
              reporterStatus(state, reporterID){
                  state.reporterStatus = "No reporter with ID number: " + reporterID
                  state.errorReporterId = null

              },
              requestStatus(state, status) {
                  state.requestStatus = status
              },
              errorReporterId(state, errorStatus, reporterId){
                  //console.log('mutation error rep id')
                  state.errorReporterId = "Please use digits. Reporter ID: " + reporterId + " Request status: " + errorStatus
                  state.reporterStatus = null
              }
          },
  
          actions: {
  
              // get reporter's data from DB per ID
              async getReporter({ commit }, user) {
                  //
              },
  
              async newReporterData ({ commit }, user) {
                  //
              },
          },
      })
  
  
      export default {
          namespaced: true,
          username: 'homeTor',
  
          data() {
                  return {
                      data: { 
                          data: reporterStore.state,                   
                      }
                  }
          },
  
          computed: {
                  ...mapGetters({
                          authenticated: "authenticated",
                          access_token: "access_token",
                          refresh_token: "refresh_token",
                          user: "user",                                                                        
                  }), 
   
          },
  
          methods: {   
                  getReporter() {
                    //
                  },
  
                  newReporterData() {
                      //console.log("method new rep data")
                      reporterStore.dispatch('newReporterData', reporterStore.state).then(() => {           
                          })
                  },                               
          },
      }
      
  </script>
  
  
  
  <style scoped>
  .body{
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: left;
    align-items: left;
    min-height: 100vh;
    font-family: 'Jost', sans-serif;
    background: linear-gradient(to bottom, #ffffff, #ffffff, #b3eeb3);
  }
  .main{
    background: rgb(255, 255, 255);
    overflow: hidden;
      border-radius: 10px;
    box-shadow: 5px 20px 50px #000;
      margin: 300px;
      padding: 20px;
  }
  img{
    width: 325px;
      margin: 30px auto;
      display: flex;
    justify-content: center;
  }
  .signup{
    position: relative;
    width:100%;
    height: 100%;
  }
  input{
    width: 60%;
    height: 20px;
    background: #e0dede;
    justify-content: center;
    display: flex;
    margin: 5px auto;
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 5px;
  }
  button{
    width: 60%;
    height: 40px;
    margin: 10px auto;
    justify-content: center;
    display: block;
    color: #fff;
    background: #60aa7f;
    font-size: 1em;
    font-weight: bold;
    margin-top: 20px;
    outline: none;
    border: none;
    border-radius: 5px;
    transition: .2s ease-in;
    cursor: pointer;
  }
  button:hover{
    background: #025706;
  }
  img{
    width: 325px;
      margin: 30px auto;
      display: flex;
    justify-content: center;
  }
  .links{
      width: 350px;
    height: 300px;
      display: flex;
    justify-content: center;
  }
  label{
      margin: 5px auto;
    padding: 10px;
      color: rgb(0, 0, 0);
      display: flex;
    justify-content: center;
  }
  h2{
      color: rgb(0, 0, 0);
      display: flex;
      justify-content: center;
      margin: 30px auto;
  }
  h3{
      color: rgb(233, 1, 1);
      display: flex;
      justify-content: center;
      margin: 30px auto;
  }
  </style>