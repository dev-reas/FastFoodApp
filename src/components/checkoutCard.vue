<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title class="checkout-card-title">{{ title }}</ion-card-title>
      <ion-card-subtitle class="checkout-card-number">{{
        subtitle1
      }}</ion-card-subtitle>
      <ion-card-subtitle class="checkout-card-address">{{
        subtitle2
      }}</ion-card-subtitle>
    </ion-card-header>
  </ion-card>
</template>

<script lang="ts">
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "CheckoutView",
  components: {
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
  },
  props: {
    title: String,
    subtitle1: String,
    subtitle2: {
      type: String,
      default: null,
    },
  },
});
</script>

<style>
.checkout-card-number,
.checkout-card-address {
  color: #6c757d;
  font-weight: normal;
}
</style>
