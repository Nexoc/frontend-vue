<template>
    <div class="signin">
        <form @submit.prevent="signIn">
            <h2 class="error-message">{{ signInError }}</h2>
            <div class="form-group" id='loginEmail'>
            <input 
                type="text" 
                name="email" 
                placeholder="Email"
                v-model="data.email"  
                class="form-input"     
            />
        </div>
        <div  class="form-group" id='loginPass'>
            <input 
            type="password" 
            name="password"
            placeholder="Password"
            v-model="data.password"  
            class="form-input"      
            />
        </div>
        <button class="btn-submit" id='login'>Sign in</button>
        </form>
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
                this.$store.dispatch('auth/signIn', this.data)
                .then(() => {
                    if (this.authenticated) {
                        this.$router.push('/')                             
                    }
                })
            },
        },
        computed: {
            ...mapGetters('auth', ['authenticated', 'username', 'signInError']), 
        }
    }
</script>


<style>
  @import '@/assets/css/index.css';
</style>