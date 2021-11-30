<template>
  <div class="row">
    <div class="cart-item" v-for="cartItem in cart" :key="cartItem.item.id">
      <p class="card-title">{{ cartItem.item.title }}</p>
      <p class="card-text">{{ cartItem.amount }}</p>
      <button>remove item</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cart"],
};
</script>
