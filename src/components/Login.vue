<template>
  <div>
      <h2>Log In</h2>
      <div class="alert-danger" v-if="errorState">
        <p>{{ errorState }}</p>
      </div>
      <form @submit="onSubmit">
          <input placeholder="Enter your ID" v-model="uid">
          <input placeholder="Enter your password" v-model="password">
          <button type="submit">Login</button>
      </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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
        if (loginResult) this.goToPages()
      } catch (err) {
        console.error(err)
      }
    },
    goToPages () {
      this.$router.push({
        name: 'HelloWorld'
      })
    }
  },
  computed: {
    ...mapGetters({
      errorState: 'getErrorState'
    })
  }
}
</script>

<style scoped>
.alert-danger p{
  color: red;
}
</style>
