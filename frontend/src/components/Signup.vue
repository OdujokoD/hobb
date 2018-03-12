<template>
  <div class="signup">
    <div class="row">
        <div class="col s10 offset-s1 m8 offset-m2 l6 offset-l3">
          <div class="card">
            <div class="card-content">
              <span class="card-title signup-title">Create An Account</span>
              <div class="alert" v-if="status">
                <span>{{message}}</span>
              </div>
              <div class="row">
                <form class="col s12">
                  <div class="row">
                    <div class="input-field col s12">
                      <input id="username" type="text" v-model="username">
                      <label for="username">Username</label>
                    </div>
                    <div class="input-field col s12">
                      <input id="mobileNo" type="tel" class="validate" v-model="mobileNo">
                      <label for="mobileNo" data-error="wrong">Mobile Number</label>
                    </div>
                    <div class="input-field col s12">
                      <input id="email" type="email" class="validate" v-model="email">
                      <label for="email" data-error="Please enter a valid email">Email</label>
                    </div>
                    <div class="input-field col s12">
                      <input id="password" type="password" v-model="password">
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
                      <button class="btn waves-effect waves-light" :class="isDisabled" @click="register" v-else>Create</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="card-action">
              <span>I have an account.</span>
              <router-link to="/" class="action">Log in</router-link>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      username: '',
      email: '',
      mobileNo: '',
      password: '',
      status: false,
      message: '',
      authenticating: false
    }
  },
  methods: {
    register(){
      this.authenticating = true;
      var self = this

      this.$http.post('https://hobbyapi.herokuapp.com/api/user', {
        username: self.username,
        email: self.email,
        mobileNumber: self.mobileNo,
        password: self.password
      })
      .then(function (response) {
        if(response.data.status){
          self.email = ''
          self.password = ''
          self.mobileNo = ''
          self.password = ''
          self.status = false
          self.message = ''
          self.$router.push('/')
        }else{
          self.status = true
          self.message = response.data.message
          this.authenticating = false
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
    }
  },
  computed: {
    isDisabled(){
      if (this.username != '' && this.mobileNo != '' && this.email != '' && this.password != ''){
        return 'enabled'
      }else{
        return 'disabled'
      }
    }
  }
}
</script>

<style src='@/assets/css/auth.css' scoped/>
