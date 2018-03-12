<template>
  <div class="login">
    <div class="row">
        <div class="col s10 offset-s1 m8 offset-m2 l6 offset-l3">
          <div class="card">
            <div class="card-content">
              <span class="card-title">Login</span>
              <div class="alert" v-if="status">
                <span>{{message}}</span>
              </div>
              <div class="row">
                <form class="col s12">
                  <div class="row">
                    <div class="input-field col s12">
                      <input id="email" type="email" class="validate" v-model="email">
                      <label for="email" data-error="Please enter a valid email">Email</label>
                    </div>
                    <div class="input-field col s12">
                      <input id="password" type="password" class="validate" v-model="password">
                      <label for="password">Password</label>
                    </div>
                    <div class="input-field col s12">
                      <div class="preloader-wrapper small active" v-if="authenticating">
                        <div class="spinner-layer spinner-blue-only">
                          <div class="circle-clipper left">
                            <div class="circle center-align"></div>
                          </div>
                          <div class="gap-patch">
                            <div class="circle center-align"></div>
                          </div>
                          <div class="circle-clipper right">
                            <div class="circle center-align"></div>
                          </div>
                        </div>
                      </div>
                      <button class="btn waves-effect waves-light" :class="isDisabled" @click="login" v-else>Log in</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="card-action">
              <span>No Account?</span>
              <router-link to="/signup" class="action">Sign Up</router-link>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return{
      email: '',
      password: '',
      status: false,
      message: '',
      authenticating: false
    }
  },
  methods: {
    login(){
      this.authenticating = true;
      let self = this;
      this.$http.post('https://hobbyapi.herokuapp.com/login', {
        email: self.email,
        password: self.password
      })
      .then(function (response) {

        if(response.data.status){
          self.email = ''
          self.password = ''
          self.status = false
          self.message = ''

          self.$session.start()
          self.$session.set('id', response.data.id)
          self.$router.push('/hobbies')
        }else{
          self.status = true
          self.message = response.data.message
          self.authenticating = false;
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
    }
  },
  computed: {
    isDisabled(){
      if (this.email != '' && this.password != ''){
        return 'enabled'
      }else{
        return 'disabled'
      }
    }
  }
}
</script>

<style src='@/assets/css/auth.css' scoped/>
