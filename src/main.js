import Vue from 'vue'
import Controllers from './controllers';

import ElementUI from 'element-ui'
import enLocale from 'element-ui/lib/locale/lang/en'
import Auth from '@okta/okta-vue'

import VueAxios from 'vue-axios';
import VueRouter from 'vue-router'
import axios from 'axios';

import authConfig from '../config/auth.json'

Vue.config.productionTip = false
Vue.use(VueAxios, axios);
Vue.use(ElementUI, {locale: enLocale})
Vue.use(VueRouter)

Vue.use(Auth, {
  issuer: authConfig.issuer,
  client_id: authConfig.client_id,
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile email'
})

import scopeObject from './services/scope'
import { store } from './services/HttpService';

function defineScope(req, res, next) {
  Vue.prototype.$auth.isAuthenticated().then((result) => {
    if (result) {
      const token = localStorage.getItem("okta-token-storage");
      scopeObject.auth_token = token;
      store.find('user', scopeObject.auth_token.idToken.claims.sub, {
        params: {
          fields: ['Job']
        }  
      })
        .then((user) => {
          scopeObject.current_user = user
          next()
        })
        .catch((err) => {
          console.warn(err)
        })
    } else {
      next()
    }
  })
}

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Controllers.Home,
      beforeEnter: defineScope
    },
    {
      path: '/register',
      component: Controllers.RegisterUser,
      beforeEnter: defineScope
    },
    {
      path: '/dashboard',
      component: Controllers.Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/jobs',
      component: Controllers.Jobs,
      beforeEnter: defineScope,
      meta: {
        requiresAuth: true
      }
    },
    { 
      path: '/implicit/callback', 
      component: Auth.handleCallback() 
    },
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

new Vue({
  el: '#app',
  router,
  render: h => h(Controllers.App),
  components: { App: Controllers }
}).$mount('#app');

