<template>
    <div class="signup">
      <form @submit.prevent="insertUser">
        <div id="createUser">
          <div class="form-group">
            <label>Username:</label>
            <input type="text" placeholder="username" v-model="data.username" />
            <span class="error" v-if="errors.username">{{ errors.username }}</span>
          </div>
  
          <div class="form-group">
            <label>Name:</label>
            <input type="text" placeholder="Name" v-model="data.name" />
            <span class="error" v-if="errors.name">{{ errors.name }}</span>
          </div>
  
          <div class="form-group">
            <label>Email:</label>
            <input type="email" placeholder="email" v-model="data.email" />
            <span class="error" v-if="errors.email">{{ errors.email }}</span>
          </div>
  
          <div class="form-group">
            <label>Password:</label>
            <input type="password" placeholder="password" v-model="data.password" />
            <span class="error" v-if="errors.password">{{ errors.password }}</span>
          </div>
        </div>
        <button id="createUser" class="btn-submit">Registration</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'registrationView',
    data() {
      return {
        data: {
          name: '',
          email: '',
          username: '',
          password: '',
        },
        errors: {
          name: '',
          email: '',
          username: '',
          password: '',
        },
      };
    },
    methods: {
      validateForm() {
        let valid = true;
        this.errors = {
          name: '',
          email: '',
          username: '',
          password: '',
        };
  
        if (!this.data.name) {
          this.errors.name = 'Name is required.';
          valid = false;
        }
        if (this.data.name.length < 5) {
          this.errors.name = 'Name must be at least 5 characters.';
          valid = false;
        }
        if (this.data.name.length > 50) {
          this.errors.name = 'Name must be less then 50 characters.';
          valid = false;
        }
        if (!this.data.email) {
          this.errors.email = 'Email is required.';
          valid = false;
        } else if (!/\S+@\S+\.\S+/.test(this.data.email)) {
          this.errors.email = 'Email must be valid.';
          valid = false;
        }
        if (!this.data.username) {
          this.errors.username = 'Username is required.';
          valid = false;
        }
        if (this.data.username.length < 4) {
          this.errors.username = 'Username must be at least 4 characters.';
          valid = false;
        }
        if (this.data.username.length > 20) {
          this.errors.username = 'Username must be less then 20 characters.';
          valid = false;
        }
        if (!this.data.password) {
          this.errors.password = 'Password is required.';
          valid = false;
        } else if (this.data.password.length < 8) {
          this.errors.password = 'Password must be at least 8 characters.';
          valid = false;
        }
        return valid;
      },

      insertUser() {
        if (this.validateForm()) {
          this.$store.dispatch('auth/insertUser', this.data)
            .then(() => {
              if (this.authenticated) {
                this.$router.push('/');
              }
            });
        }
      },
      
    },
  };
  </script>
  
<style>
  @import '@/assets/css/index.css';
</style>
  