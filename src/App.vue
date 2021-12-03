<template>
  <nav class="navbar navbar-expand navbar-dark bg-info bg-gradient ps-5 pe-5">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><h1>Shop-It</h1></a>
      <div class="navbar-collapse justify-content-end" id="main_nav">
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
              <i class="bi bi-cart2" style="font-size: 2rem"></i>
            </a>
            <div class="dropdown-menu dropdown-large dropdown-menu-end">
              <Cartbox :cart="cart" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="row m-5 gy-3">
    <div class="col-sm-4 g-3" v-for="item in res" :key="item.id">
      <div
        class="eachCard card mb-3"
        style="max-width: 18rem; min-height: 36rem"
      >
        <img :src="item.image" class="card-img-top mt-3" alt="bild" />
        <div class="card-body">
          <h5 class="card-title">{{ item.title }}</h5>

          <p class="card-text" v-text="parsePrice(item.price)"></p>
          <p class="card-text" v-text="item.category"></p>
          <div
            class="overflow-scroll"
            style="max-width: 15.5rem; height: 10rem"
          >
            <p class="card-text" v-text="item.description"></p>
          </div>
          <br />

          <div class="card-footer">
            <a
              href="#"
              class="cart-btn btn"
              @click="addToCart(item)"
              :id="item.id"
              >Add to cart</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cartbox from "@/components/Cartbox.vue";
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
    Cartbox,
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
          this.cart.push({ item: item, amount: 1 });
          //else: item is already in the cart, increase amount
        } else {
          itemInCart[0].amount++;
        }
        //if cart is empty, push first item to cart-array
      } else {
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
  margin: 3rem 0;
}

.card-img-top {
  width: 100%;
  height: 15vw;
  object-fit: contain;
}

.card-text {
  margin-right: 0.5rem;
}

.card-title {
  height: 3ex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-title:hover {
  height: auto;
  white-space: pre-wrap;
  overflow: visible;
  text-overflow: overlay;
}

.cart-btn {
  background-color: rgba(107, 181, 213, 0.687);
  color: white;
}
</style>
