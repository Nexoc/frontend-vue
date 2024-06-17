<template>
<div class="body">
<div id="app" class="main">

    <img src="@/assets/logo.png" alt="">
    <div class="signup">
        <div id='signup'>

        <form @submit.prevent="insertUser">
        
            <div id='createUser'>
                <input type="text" name="name" placeholder="Name" v-model="data.name" />
                <input type="email" name="email" placeholder="email" v-model="data.email" />
                <input type="text" name="username" placeholder="Username" v-model="data.username" />
                <input type="password" name="password" placeholder="password" v-model="data.password" />
            </div>

            <button id='createUser'>Registration</button>
        </form>

        <template v-if="newUser.user">
        <div class="zeigen">
            <h2>User: {{ newUser.accessToken }}</h2>
            <h2>Password: {{ newUser.refreshToken }}</h2>
        </div>
        </template>

        </div>
    </div>
</div>
</div>
</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        // eslint-disable-next-line
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
            // get from index.js getters:
            ...mapGetters({
                newUser: 'newUser',
            }),
        },

        methods: {   
            insertUser() {
                // To create a new User -> send to index.js actions insertUser()                
  
                 this.$store.dispatch('insertUser', this.data)
                 .then(() => {
                    if (this.authenticated) {
                        this.$router.replace({name: 'home'})
                    }
                })

            },
        },
    }
</script>

