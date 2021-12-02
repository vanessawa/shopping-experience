<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-info bg-gradient m-0">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Shop-It</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#main_nav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="main_nav">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle cartView"
              href="#"
              data-bs-toggle="dropdown"
            >
              <span
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                {{ totalItems }}
              </span>
              <i class="bi bi-cart2"></i>
            </a>
            <div class="dropdown-menu dropdown-large dropdown-menu-end">
              <Cart :cart="cart" />
            </div>
            <!-- dropdown-large.// -->
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <br />
  <div class="row">
    <div class="col-sm-4 g-3" v-for="item in res" :key="item.id">
      <div class="card" style="width: 18rem; height: 40rem">
        <img :src="item.image" class="card-img-top" alt="bild" />
        <div class="card-body">
          <h5 class="card-title">{{ item.title }}</h5>

          <p class="card-text" v-text="parsePrice(item.price)"></p>
          <p class="card-text" v-text="item.category"></p>
          <div class="overflow-scroll" style="width: 15.5rem; height: 10rem">
            <p class="card-text" v-text="item.description"></p>
          </div>
          <br />
        </div>
        <div class="card-footer">
          <a
            href="#"
            class="cart-btn btn btn-primary"
            @click="addToCart(item)"
            :id="item.id"
            >Add to cart</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cart from "@/components/Cart.vue";
//lodash library zum erweiterten Filtern von Arrays für Warenkorb
import _ from "lodash";

export default {
  name: "App",
  data() {
    return {
      res: {},
      cart: [],
      totalAmount: "",
    };
  },
  components: {
    Cart,
  },
  mounted() {
    console.log("start loading procuts...");
    fetch("https://fakestoreapi.com/products?limit=9")
      .then((res) => res.json())
      .then((data) => (this.res = data));
    console.log("finished loading.");
    //stop propagation
    document.querySelectorAll(".dropdown-menu").forEach(function (element) {
      element.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    });
  },

  computed: {
    totalItems() {
      let total = 0;
      this.cart.forEach((cartItem) => (total += cartItem.amount));
      return total;
    },
  },

  methods: {
    addToCart(item) {
      //check if cart has 1 or more items in it
      if (this.cart && this.cart.length >= 1) {
        //check if item is in the cart
        let itemInCart = _.filter(this.cart, ["item.id", item.id]);
        //if item is not in the cart, push it to the cart-array
        if (itemInCart == 0) {
          console.log("not found in cart");
          this.cart.push({ item: item, amount: 1 });
          //else: item is already in the cart, increase amount
        } else {
          console.log("found in cart, adding one");
          itemInCart[0].amount++;
          console.log(itemInCart);
        }
        //if cart is empty, push first item to cart-array
      } else {
        console.log("cart empty, adding first item");
        this.cart.push({ item: item, amount: 1 });
      }
      this.totalAmount++;
    },

    parsePrice(price) {
      var formatter = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      });
      return formatter.format(price);
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 3rem;
}

.card-img-top {
  width: 100%;
  height: 20vw;
  object-fit: contain;
}

.card-text {
  margin-right: 0.5rem;
}

// .cartView {
//   display: flex;
//   position: relative;
//   justify-self: flex-end;
// }

// aside {
//   position: absolute;
//   text-align: right;
// }
</style>
