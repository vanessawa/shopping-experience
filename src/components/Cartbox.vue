<template>
  <div class="row m-1">
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

      <button @click="deleteItem(cartItem)">
        <i class="trashIcon bi bi-trash"></i>
      </button>
      <hr />
    </div>

    <div class="card-footer">Total: {{ totalSum }}</div>
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
    deleteItem(item) {
      let index = _.findIndex(this.cart, (Item) => {
        return Item.item.id == item.item.id;
      });
      this.cart.splice(index, 1);
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
.trashIcon {
  background-color: purple;
  border: none;
}
</style>
