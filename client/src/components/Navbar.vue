<template>
  <nav class="navbar is-fixed-top container" role="navigation" aria-label="main navigation"
       :style="{'background-color': $parent.bgNavbar}">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">{{webname}}
      </router-link>
      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
         data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item has-dropdown is-hoverable" v-if="false">
          <a class="navbar-link is-arrowless">
            Category
            <span class="icon"> <i class="fas fa-list-ul"/></span>
          </a>

          <div class="navbar-dropdown">
            <router-link
              class="navbar-item"
              v-for="(category, i) in categories"
              :to="'/c/'+category.slug"
              :key="i"
            >
              {{category.title}}
            </router-link>
          </div>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item" v-if="false">
          <form class="is-full">
            <div class="field">
              <div class="control has-icons-left">
                <input type="text" class="input is-rounded" placeholder="Search...">
                <span class="icon is-small is-left">
                  <i class="fas fa-search" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </form>
        </div>
        <div class="navbar-item has-dropdown is-hoverable" v-if="isLogin && false">
          <a class="navbar-link is-arrowless">
            <i class="fa fa-shopping-cart"></i>
          </a>
          <div class="navbar-dropdown is-right">
            <div class="carts">
              <div class="carts-body">
                <div class="cart-item" v-for="(cart, i) in carts" :key="i">
                  <div class="cart-item-image">
                    <img src="../assets/images/header.jpg">
                  </div>
                  <div class="cart-item-title">
                    {{cart.title}}
                  </div>
                  <div class="cart-item-detail">
                    <div class="price">
                      {{cart.price}}
                    </div>
                    <div class="quantity">
                      {{cart.quantity}} item
                    </div>
                  </div>
                </div>
              </div>
              <div class="carts-footer">
                <div class="quantity">9 Jumlah</div>
                <router-link to="/carts">View Cart</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable" v-if="isLogin">
          <a class="navbar-link is-arrowless">
            <img class="image is-rounded" src="https://bulma.io/images/placeholders/128x128.png">
            <span style="padding-left: 10px;">{{user.fullname.split(' ')[0]}}</span>
          </a>

          <div class="navbar-dropdown is-right">
            <a class="navbar-item">
              {{user.fullname}}
            </a>
            <a class="navbar-item" v-if="false">
              Setting
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item" @click="logout()">
              Logout
            </a>
          </div>
        </div>
        <div class="navbar-item" v-if="!isLogin">
          <div class="buttons">
            <router-link to="/register" class="button is-primary">
              <strong>Register</strong>
            </router-link>
          </div>
        </div>
        <div class="navbar-item" v-if="!isLogin">
          <div class="buttons">
            <router-link to="/login" class="button is-primary is-outlined">
              <strong>Login</strong>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      categories: [
        {
          title: 'Handphone',
          slug: 'handphone',
        },
        {
          title: 'Computer',
          slug: 'computer',
        },
        {
          title: 'Mobil',
          slug: 'mobil',
        },
        {
          title: 'Motor',
          slug: 'motor',
        },
        {
          title: 'Dipan',
          slug: 'dipan',
        },
        {
          title: 'Games',
          slug: 'games',
        },
        {
          title: 'Fashion',
          slug: 'fashion',
        },
      ],
      carts: [
        {
          images: '',
          title: 'Lorem Ipsum, Lorem Ipsum, Lorem Ipsum.',
          price: 'Rp.100000',
          quantity: '3',
        },
        {
          images: '',
          title: 'Lorem Ipsum, Lorem Ipsum, Lorem Ipsum.',
          price: 'Rp.100000',
          quantity: '3',
        },
        {
          images: '',
          title: 'Lorem Ipsum, Lorem Ipsum, Lorem Ipsum, Lorem Ipsum, Lorem Ipsum.',
          price: 'Rp.100000',
          quantity: '3',
        },
        {
          images: '',
          title: 'Lorem Ipsum, Lorem Ipsum, Lorem Ipsum.',
          price: 'Rp.10000000',
          quantity: '3',
        },
        {
          images: '',
          title: 'Lorem Ipsum, Lorem Ipsum, Lorem Ipsum.',
          price: 'Rp.10000000',
          quantity: '3',
        },
      ],
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    logout() {
      try {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut()
          .finally(() => {
            localStorage.clear();
          });
      } catch (e) {
        console.log(e);
      }
      localStorage.clear();
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login');
        });
    },
  },
};
</script>

<style scoped lang="scss">
  @import "../assets/stylesheet/config";

  .navbar {
    .navbar-dropdown {
      border: none;
    }

    .carts {
      width: 480px;
      padding-left: 8px;
      padding-right: 8px;

      .cart-item {
        display: flex;

        * {
          font-size: small;
          word-break: break-all;
        }

        .cart-item-image {
          width: 15%;
          display: inline-block;
        }

        .cart-item-title {
          width: 65%;
          display: inline-block;
        }

        .cart-item-detail {
          text-align: right;
          width: 20%;
          display: inline-block;

          .price {
            color: $color-primary;
          }
        }
      }

      .carts-footer {
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;
      }
    }

    .navbar-brand {
      margin-left: 30px;
      margin-right: 30px;
      background-color: $color-primary;

      > .navbar-item {
        color: white;
        font-size: large;
      }
    }

    .navbar-menu {
      .navbar-start {
        background-color: white;

        .navbar-link {
          .icon {
            padding-left: 10px;
          }
        }
      }

      .navbar-end {
        background-color: white;

        .navbar-link {
          .icon {
            padding-right: 10px;
          }
        }
      }
    }
  }
</style>
