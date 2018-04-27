<template>
  <div>
      <h2>Log In</h2>
      <form @submit="onSubmit">
          <input placeholder="Enter your ID" v-model="uid">
          <input placeholder="Enter your password" v-model="password">
          <button type="submit">Login</button>
      </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    uid: '',
    password: ''
  }),
  methods: {
    ...mapActions(['login']),
    async onSubmit () {
      try {
        let loginResult = await this.login({uid: this.uid, password: this.password})
        console.log(loginResult)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style>

</style>
