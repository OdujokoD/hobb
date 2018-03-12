<template>
  <div id="hobbies">
    <div class="row">
        <div class="col s12 m4 l5 section-1 top-left">
          <span class="header-title">Hobb</span>
          <span @click="logout" class="header-logout">
            <i class="fas fa-power-off"></i>
            <span class="logout-prompt">Logout</span>
          </span>
          <span class="side-icon">
            <i class="fas fa-clipboard-list"></i>
          </span>
        </div>
        <div class="col s12 m8 l7 bottom-right">
          <div class="row" v-if="hobbies[0] === undefined">
            <div class="empty">
              <div class="icon">
                <i class="fas fa-cart-plus"></i>
              </div>
              <h4>Empty Hobby List</h4>
              <p>You are yet to add (+) a hobby</p>
            </div>
          </div>
          <div class="row" v-else>
            <div class="col s12 m6 l6" v-for="(hobby, index) in hobbies" :key="hobby.id">
              <div class="card horizontal">
                <div class="hobb-alpha valign-wrapper" :class="colors[Math.floor(Math.random() * (colors.length - 1) + 0)]">
                  <h5>{{hobby.name.charAt(0)}}</h5>
                </div>
                <div class="card-content">
                  <span class="hobby">{{hobby.name}}</span>
                  <span class="date">{{new Date(hobby.updatedAt.substring(0, 10).split('-')).toDateString()}}</span>
                  <span class="action">
                    <span @click="editHobby($event)"><i class="fas fa-edit" :id="index"></i></span>
                    <span @click="deleteHobby($event)"><i class="fas fa-trash-alt" :id="index"></i></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="new-hobby">
            <div class="row">
              <div class="col s10">
                <div class="new-hobby-form">
                  <input type="text" placeholder="Add a hobby" v-model="newHobby">
                </div>
              </div>
              <div class="col s2">
                <button class="btn waves-effect waves-light" @click="createHobby" v-if="isShowing"><i class="fas fa-plus"></i></button>
                <button class="btn waves-effect waves-light" @click="updateHobby" v-else><i class="far fa-save"></i></button>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hobbies",
  data() {
    return {
      isShowing: true,
      newHobby: '',
      index: 0,
      hobbies: {},
      colors:['grad-1', 'grad-2', 'grad-3', 'grad-4', 'grad-5', 'grad-6', 'grad-7', 'grad-8']
    };
  },
  methods: {
    createHobby(){
      let self = this;
      var userId = this.$session.get('id')
      this.$http.post('https://hobbyapi.herokuapp.com/api/hobby/' + userId, {
        name: self.newHobby
      })
      .then(function (response) {
        self.hobbies.push(response.data.hobby)
        self.newHobby = ''
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    editHobby(event){
      this.index = event.target.id
      this.newHobby = this.hobbies[this.index].name
      this.isShowing = false
    },

    updateHobby(){
      var hobbyId = this.hobbies[this.index].id
      var self = this
      
      this.$http.put('https://hobbyapi.herokuapp.com/api/hobby/'+ hobbyId, {
        name: self.newHobby
      })
      .then(function (response) {
        if(response.data.status){
          self.hobbies[self.index].name = self.newHobby
          self.newHobby = ''
          self.isShowing = true
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    deleteHobby(){
      this.index = event.target.id
      var hobbyId = this.hobbies[this.index].id
      var self = this
      
      this.$http.delete('https://hobbyapi.herokuapp.com/api/hobby/'+ hobbyId)
      .then(function (response) {
        if(response.data.status){
          self.hobbies.splice(self.index, 1)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    logout(){
      this.$session.destroy()
      this.$router.push('/')
    }
  },
  beforeCreate() {
    if (!this.$session.exists()) {
      this.$router.push('/')
    }
  },

  created(){
    var userId = this.$session.get('id')
    var self = this;

    this.$http.get('https://hobbyapi.herokuapp.com/api/hobby/'+ userId)
    .then(function (response) {
      self.hobbies = response.data.hobbies
    })
    .catch(function (error) {
      console.log(error);
    });
  }
};
</script>

<style src='@/assets/css/hobbies.css' scoped />
