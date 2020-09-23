<template>
  <div>
    <div class="container mt-4">
      <h1 class="mb-4 text-center">Url Shortener</h1>
      <form>
      <div class="form-group mx-sm-3 mb-2">
        <label for="longUrl" class="sr-only">Long url</label>
        <textarea type="url" v-model="longUrl" class="form-control" id="longUrl" placeholder="long url goes here"></textarea>
      </div>
      <button @click.prevent="sendNewUrl()" class="d-block mx-auto btn btn-primary mb-2">Shrink</button>
    </form>
    <h6 v-if="shortUrl !== ''">Your Short Url:</h6><a v-bind:href="shortUrl">{{shortUrl}}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  props: {
  },
  data(){
    return {
      baseUrl: 'https://urlshortenerbackend.herokuapp.com',
      longUrl: '',
      shortUrl: '',
      form: {}
    }
  },
    methods: {
        async sendNewUrl(){
          const payload = {
            full: this.longUrl
          }
            try{
              const res =  await this.$http.post(`${this.baseUrl}/shortUrls`, payload);
              const data = res.data;
              this.shortUrl = data.short;
            }
            catch(err){
              console.log(err);
            }
        },
        async goToUrl(url){
          const res = await this.$http.get(`${this.baseUrl}/${url}`);
          console.log(res.data);
          window.location.href = res.data;
        }
    },
    created() {
        const currUrl = window.location.pathname.split('/');
        if(currUrl[1] === '' && currUrl[3]){
          this.goToUrl(currUrl[3]);
        }
        else if(currUrl[1] !== ''){
            this.goToUrl(currUrl[1])
        }
    },
}
</script>

<style scoped>
  .shorturl:hover{
    cursor: pointer;
    text-decoration: underline;
  }
</style>
