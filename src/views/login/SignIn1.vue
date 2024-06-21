<template>
    <div class="body">
    <div id="app" class="main">
    
        <img src="@/assets/logo.png" alt="">
        <form @submit.prevent="signIn">
            <h2>{{ signInError }}</h2>
            <div class="signin">
                <div id='signin'>
                    <input 
                    type="text" 
                    name="email" 
                    placeholder="Email"
                    v-model="data.email"       
                    />
                </div>
    
                <div id='login'>
                    <input 
                    type="password" 
                    name="password"
                    placeholder="Password"
                    v-model="data.password"        
                    />
                </div>
            </div>
    
            <button id='login'>Sign in</button>
        </form>
    
    </div>
    </div>
    </template>
    
    <script>
        import { mapGetters } from 'vuex';
    
        export default {
            name: 'signIn',
            components: {
                //
            },
            data() {
                return {
                    data: {
                        email: '',
                        password: ''
                    }
                }
            },
    
    
            methods: {   
                async signIn() {
                    this.$store.dispatch('signIn', this.data)
                    .then(() => {
                        if (this.authenticated) {
                            this.$router.push('/')                             
                        }
                    })
                },
            },
            computed: {
                ...mapGetters({
                    authenticated: "authenticated",
                    username: "username",
                    signInError: "signInError"
                })
            }
        }
    </script>
    