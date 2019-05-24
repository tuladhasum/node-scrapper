<template>
   <div id="app">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
         <a class="navbar-brand" href="#">Vue.js Application</a>
         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                 aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
         </button>
         <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
               <li class="nav-item active">
                  <router-link to="/" class="nav-link">Home</router-link>
               </li>
               <li class="nav-item">
                  <router-link to="/about" class="nav-link">About</router-link>
               </li>

            </ul>
         </div>
      </nav>
      <router-view class="container mt-4"/>
   </div>
</template>

<style>
   #app {
      /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
      /*-webkit-font-smoothing: antialiased;*/
      /*-moz-osx-font-smoothing: grayscale;*/
      /*text-align: center;*/
      /*color: #2c3e50;*/
      /*margin-top: 60px;*/
   }
</style>
