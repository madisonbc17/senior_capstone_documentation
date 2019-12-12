var app = new Vue({
  el: '#app',
  data: {
    data:{},
    bundle:"",
    action:"install",
  },
  computed: {
    claims() {
      return Object.keys(this.data).reduce((acc,key) => {
        acc.push(this.data[key]);
        return acc;
      },[])
    }
  },
  methods: {
    doForm() {
      let url = `/api/${this.bundle}/${this.action}`
      console.log({url})
      fetch(url, {method:"POST"})
    }
  },
  async created() {
    setInterval(async () => {
      const data = await fetch(`/api?_nocache=${Date.now()}`).then(resp=> resp.json());
      // console.log(data);
      this.data = data;
    }, 1500)
    const data = await fetch(`/api?_nocache=${Date.now()}`).then(resp=> resp.json());
    this.data = data;
  }
})