<template>
   <section>
      <h1>Craigslist - Search</h1>

      <form @submit.prevent="addTerm" class="">
         <fieldset class="form-group">
            <label for="term">Search for</label>
            <input v-model="term" autocomplete="off" type="search" id="term" placeholder="Enter a search term"
                   class="form-control">
         </fieldset>
         <button type="submit" class="btn btn-info">Search</button>
      </form>

      <div v-if="term">
         Searching for <strong>{{term}}</strong>
      </div>
      <div v-if="terms">

         <ul class="nav nav-tabs">
            <li class="nav-item" v-if="activeTerm">
               <a href="" @click="removeTerm(activeTerm)" class="nav-link bg-danger text-white">Remove {{activeTerm}}</a>
            </li>
            <li @click="setActiveTerm(term)" v-for="term in terms" class="nav-item">
               <a :class="{active: activeTerm == term}"
                  href="#" class="nav-link ">{{term}}</a>
            </li>
         </ul>
         <div class="spinner-border" role="status" v-if="loading">
            <span class="sr-only">Loading...</span>
         </div>
         <section class="row" v-if="activeResults" v-show="!loading">
            <div v-for="result in activeResults" class="col-4" v-if="!hiddenResults[result.url]">
               <div class="card">
                  <div class="card-header">
                     <small><em>{{result.hood}}</em></small>
                     <a style="cursor: pointer" @click="hideResult(result)" class="float-right">❌</a>

                     <h5 class="card-title">
                        <a :href="result.url" target="_blank">{{result.title}}</a>
                     </h5>
                  </div>
                  <img v-if="result.images.length > 0"
                       class="card-img-bottom" :src="result.images[0]" :alt="result.title">
                  <img v-else class="card-img-bottom"
                       src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAOVBMVEXz9Pa5vsq2u8jN0dnV2N/o6u7w8fTi5OnFydO+ws3f4ee6v8vY2+H29/jy9Pbu7/LJztbCx9HR1ty/NMEIAAAC8ElEQVR4nO3b67ZrMBiFYaSh1HHd/8XuFap1SFolXb7s8T4/18EwOyNCiSIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACryrezAy2kulR+lVl6dqip7Jr412Zyeizj7yjODjYqvhRQTMQm/1rC/OxsvapIht3xehDeN1lIOBSrtt+ZW+t1Kh02GrciEvaDNLl4Ph1e+hqvEk4Z94SZ580WchJGJNyHhH/JlrDR+uC+iU6Yqf7c2JXNga0KTlj/xOP5ujuwdpabML0mz1VXUu7eqtyEP5OAvysdvXerYhMWs4C/a+e9uyg1YXVdXh7sXTtLTagXFcaJ2rlVqQmXgzSOu5f76J5shSasylXC/NVJUbknW6kJLx8lNPNu6WhRaMKPRmmtzB+7WpSasNk+09TjmdPeotSEVbfs0HW7LFXjh2FvUWrC1Z1F1yCt1aRtW4tiE0ZqPk4dp4NUzYaypUW5CaNuGtExjdSLz8HSouCEjRqvnuLcceE/b9D+UQhOGFWZys093e7S2IfoqkFbi5ITRv1NDN24ds7SoKVF4QlfsTa4bjHchOmPI+AiYrgJXQ0uB2qoCWt3g4sWQ034qsF5i4EkbBY3ol43OGsxjIT6luvp7NG+DfhsMYSElc7jpHteAL85BhcthpBQ38zPny1uadD8x3C9JT+habD/RXdfu21rsP822fy5/IR9g/GjxXpjg+ZSKoiEY4OPFrc2GEzCR4O9XL87D4aWcNrgEHFzvkASzhv8UAAJVw3+dwkPNRhAwoMNBpDwYIPiEx5uUHzCww1KT1htX7qEmnD9/SEJSXhutgEJSUjC8/lOKPs+jfla7ajh/qPUhP6Q8C+RcJdKUML7W0HK75vA9+/hrmenM8bHgr/y7pqS8O7a43nEb7x/6Pvo3iddPa3njYx3SKMoO37rwu4mo8LIPJB4fLG2lggZoz3d5l6PQuPWahHTzEgXF79KQQUCAAAAAAAAAAAAAAAAAAAAAAAAAAAAp/gHLTI30QIHnooAAAAASUVORK5CYII="
                       alt="">
                  <div class="card-body">
                     <p v-if="result.price" class="card-text">{{result.price}}</p>
                     <p v-else class="card-text">No price</p>
                  </div>
               </div>

            </div>
         </section>
         <div v-else class="alert alert-info">No Result Found</div>
      </div>
   </section>
</template>

<script>
   const API_URL = 'http://localhost:5000/search/fargo/';
   export default {
      // name: "craigslist",
      data() {
         return {
            loading: false,
            term: '',
            terms: ['moog', 'synth', 'keyboard'],
            activeTerm: null,
            activeResults: [],
            hiddenResults: {}
         }
      },
      mounted() {
         if (localStorage.terms) {
            this.terms = JSON.parse(localStorage.terms);
         }
         if (localStorage.hiddenResults){
            this.hiddenResults = JSON.parse(localStorage.hiddenResults);
         }
      },
      methods: {
         removeTerm(term){
            const index = this.terms.indexOf(term);
            this.terms.splice(index,1);
            this.activeResults = [];
            this.activeTerm = '';
            localStorage.terms = JSON.stringify(this.terms);
         },
         hideResult(result) {
            this.$set(this.hiddenResults, result.url, true);
            localStorage.hiddenResults = JSON.stringify(this.hiddenResults);
         },
         addTerm() {
            if (this.term !== '') {
               this.terms.push(this.term);
               localStorage.terms = JSON.stringify(this.terms);
            }
            this.setActiveTerm(this.term);
            // this.term = '';
         },
         setActiveTerm(term) {
            this.loading = true;
            this.term = term;
            this.activeTerm = term;
            const url = `${API_URL}${term}`;
            fetch(url)
               .then(response => response.json())
               .then(json => {
                  this.activeResults = json.results;
                  this.loading = false;
               });
         }
      }
   }
</script>

<style scoped>

</style>
