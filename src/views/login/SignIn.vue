<template>
    <div class="signin">
        <form @submit.prevent="signIn">

        <h2>{{ signInError }}</h2>

        <div id='loginEmail'>
            <input 
            type="text" 
            name="email" 
            placeholder="Email"
            v-model="data.email"       
            />
        </div>

        <div id='loginPass'>
            <input 
            type="password" 
            name="password"
            placeholder="Password"
            v-model="data.password"        
            />
        </div>
        <button id='login'>Sign in</button>

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
    .signin{
        margin: 50px;
    }
</style>