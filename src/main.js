import { createApp } from 'vue'
import { Quasar } from 'quasar'
import { createPinia } from 'pinia'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import '@/styles/style.css';

import 'quasar/src/css/index.sass'

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'

import router from './router'

const app = createApp(App);

const pinia = createPinia();

app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
})

app.use(router);
app.use(pinia);

// Assumes you have a <div id="app"></div> in your index.html
app.mount('#app')