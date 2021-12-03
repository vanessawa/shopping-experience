<template>
  <div class="row m-1">
    <div class="col-xs-4 col-md-6">
      <div
        class="cart-item"
        style="width: 15rem"
        v-for="cartItem in cart"
        :key="cartItem.item.id"
      >
        <h6 class="card-title">{{ cartItem.item.title }}</h6>
        <span class="card-text fw-lighter">{{ cartItem.amount }}x</span>
        <span
          class="card-text fw-lighter"
          v-text="parsePrice(cartItem.item.price * cartItem.amount)"
        ></span>

        <button class="trash float-end" @click="deleteItem(cartItem, cart)">
          <i class="bi bi-trash"></i>
        </button>
        <hr class="dropdown-divider" />
      </div>
      <div>
        <p>Total: {{ totalSum }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  props: ["cart"],
  methods: {
    parsePrice(price) {
      var formatter = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      });
      return formatter.format(price);
    },
    deleteItem(item, cart) {
      let index = _.findIndex(cart, (Item) => {
        return Item.item.id == item.item.id;
      });
      cart.splice(index, 1);
    },
  },
  computed: {
    totalSum() {
      let totalSum = 0;
      this.cart.forEach(
        (cartItem) => (totalSum += cartItem.item.price * cartItem.amount)
      );
      return this.parsePrice(totalSum);
    },
  },
};
</script>

<style>
.trash {
  background-color: white;
  border: none;
}
</style>
