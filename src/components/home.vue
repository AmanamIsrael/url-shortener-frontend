<template>
  <div>
    <div class="container mt-4">
      <h1 class="mb-4">Url Shortener</h1>
      <form class="form-inline">
      <div class="form-group mx-sm-3 mb-2">
        <label for="longUrl" class="sr-only">Long url</label>
        <input type="url" v-model="longUrl" class="form-control" id="longUrl" placeholder="long url goes here">
      </div>
      <button @click.prevent="sendNewUrl()" class="btn btn-primary mb-2">Shrink</button>
    </form>
    <table class="mt-5 table table-striped">
  <thead>
    <tr>
      <th scope="col">Long Url</th>
      <th scope="col">Short Url</th>
      <th scope="col">clicks</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(url, index) of items" v-bind:key="index">
      <td><a v-bind:href="url.longUrl">{{url.longUrl}}</a></td>
      <td><a v-bind:href="url.shortUrl">{{url.shortUrl}}</a></td>
      <td>{{url.clicks}}</td>
    </tr>
  </tbody>
</table>
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
      items: [],
      form: {}
    }
  },
    methods: {
       async getAllUrls(){
         const allUrls =[];
         try {
           const res = await this.$http.get(this.baseUrl);
           const data = res.data;
            data.forEach(data => {
             const url = {
               longUrl: data.full,
               shortUrl: data.short,
               clicks: data.clicks,
             }
             allUrls.unshift(url);
           })
            this.items = allUrls;
         }
          catch(err) {
            console.log(err)
          }
        },
        async sendNewUrl(){
          const payload = {
            full: this.longUrl
          }
            try{
              const res =  await this.$http.post(`${this.baseUrl}/shortUrls`, payload);
              const data = res.data;
              console.log(data);
              this.getAllUrls();
            }
            catch(err){
              console.log(err);
            }
        }
    },
    created() {
        this.getAllUrls();
    },
}
</script>

<style scoped>

</style>
