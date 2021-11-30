<template>
  <header>
    <div class="row">
      <div class="col-sm-4 bg-warning">
        <Cart :cart="cart" />
      </div>
    </div>
  </header>
  <div class="row">
    <div class="col-sm-4 g-3" v-for="item in res" :key="item.id">
      <div class="card" style="width: 18rem; height: 40rem">
        <img :src="item.image" class="card-img-top" alt="bild" />
        <div class="card-body">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text">{{ item.price }}</p>
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
            >In den Warenkorb</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cart from "@/components/Cart.vue";
import _ from "lodash";
export default {
  name: "App",
  data() {
    return {
      res: {},
      cart: [],
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
    },
    cartQuantity(item) {
      let quantity = _.filter(this.cart, ["item.id", item.id]);
      if (quantity[0]) return quantity[0].amount;
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
</style>
