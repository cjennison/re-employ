import Vue from 'vue'
import Controllers from './controllers';
import Components from './components';

import ElementUI from 'element-ui'
import enLocale from 'element-ui/lib/locale/lang/en'
import Auth from '@okta/okta-vue'

import VueAxios from 'vue-axios';
import VueRouter from 'vue-router'
import axios from 'axios';

import _ from 'lodash'
import UserUpdater from './services/UserUpdater'

console.log(process.env)

Vue.config.productionTip = false
Vue.use(VueAxios, axios);
Vue.use(ElementUI, {locale: enLocale})
Vue.use(VueRouter)

Vue.use(Auth, {
  issuer: process.env.VUE_APP_AUTH_ISSUER,
  client_id: process.env.VUE_APP_CLIENT_ID,
  redirect_uri: process.env.VUE_APP_REDIRECT_URI,
  scope: 'openid profile email'
})

import scopeObject from './services/scope'

function defineScope(to, from, next) {
  Vue.prototype.$auth.isAuthenticated().then((result) => {
    if (result) {
      UserUpdater.updateUser().then(() => {
        next();
      }).catch((err) => {
        console.warn("Could not update user", err)
        next({
          path: '/'
        })
      })
    } else {
      next();
    }
  })
}

function checkRole(to, from, next) {
  if (to.matched.some(record => record.meta.requiresRole != null)) {
    const roles = _.flatten(to.matched.map((record) => record.meta.requiresRole))
    const missingRoles = _.compact(_.map(roles, (role) => {
      const matchingRole = _.find(scopeObject.current_user.Roles, (userRole) => {
        return userRole.name == role
      })

      if (!matchingRole) {
        return role
      }

      return;
    }))

    //  If there are roles missing from the user, deny the routing
    if (missingRoles.length) {
      console.warn("User attempted to access route", to.path, "and was denied")
      next({
        path: '/'
      })
    } else {
      next()
    }
  }
  next()
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
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/opportunities',
      component: Controllers.JobOpenings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      component: Controllers.Admin,
      beforeEnter: defineScope,
      meta: {
        requiresAuth: true,
        requiresRole: 'admin'
      },
      children: [
        {
          path: 'roles',
          component: Components.AdminRoles
        },
        {
          path: 'jobs',
          component: Components.AdminJobs
        }
      ]
    },
    { 
      path: '/implicit/callback', 
      component: Auth.handleCallback() 
    },
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());
router.beforeEach(defineScope);
router.beforeEach(checkRole);

new Vue({
  el: '#app',
  router,
  render: h => h(Controllers.App),
  components: { App: Controllers }
}).$mount('#app');

