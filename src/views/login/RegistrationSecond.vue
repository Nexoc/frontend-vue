<template>
    <div class="signup">    
        <form @submit.prevent="insertUser">  

            <div id='createUser'>
                <input type="text" name="name" placeholder="Name" v-model="data.name" />
                <input type="email" name="email" placeholder="email" v-model="data.email" />
                <input type="text" name="username" placeholder="Username" v-model="data.username" />
                <input type="password" name="password" placeholder="password" v-model="data.password" />
            </div>
            <button id='createUser'>Registration</button>
        </form> 
    </div>    
</template>
    
    <script>
        import { mapGetters } from 'vuex';
    
        export default {            
            name: 'registration',
            components: {
                //
            },    
            data() {
                return {
                    data: {
                        name: '',
                        email: '',
                        username: '',
                        password: '',
                    }
                }
            },
    
            computed: {
                // get from auth.js getters:
                ...mapGetters('auth', ['authenticated', 'username'])
            },
    
            methods: {   
                insertUser() {
                    // To create a new User -> send to index.js actions insertUser()     
                     this.$store.dispatch('insertUser', this.data)
                     .then(() => {
                        if (this.authenticated) {
                            this.$router.push('/') 
                        }
                    })
    
                    
                },
            },
        }
    </script>
    
    