<template>
  <div class="row">
    <div class="cart-item" v-for="cartItem in cart" :key="cartItem.item.id">
      <p class="card-title">{{ cartItem.item.title }}</p>

      <p class="card-text" v-text="parsePrice(cartItem.item.price)"></p>
      <p class="card-text">{{ cartItem.amount }}x</p>
      <button>remove item</button>
    </div>
  </div>
</template>

<script>
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
  },
};
</script>
