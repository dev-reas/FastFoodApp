<template>
  <ion-page>
    <router-view />
  </ion-page>
</template>

<script lang="ts">
import { IonPage } from "@ionic/vue";

import { defineComponent } from "vue";

export default defineComponent({
  components: {
    IonPage,
  },
  setup() {},
});
</script>

<style>
.checkout-alert .alert-wrapper .alert-head h2 {
  color: #2a363b !important;
}

.checkout-alert .alert-wrapper .alert-button-group {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.checkout-button {
  color: #f8f6f6 !important;
  background-color: #cf4647 !important;
  border-radius: 15px !important;
  margin-bottom: 10px !important;
}

.checkout-button span {
  padding: 5px !important;
}

.add-more-button {
  color: #cf4647 !important;
}
</style>
