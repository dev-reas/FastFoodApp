<template>
  <ion-alert
    header="Successfully Added!"
    message="What do you want to do now?"
    :buttons="alertButtons"
    class="checkout-alert"
  ></ion-alert>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonAlert } from "@ionic/vue";

export default defineComponent({
  components: {
    IonAlert,
  },
  setup() {
    const emit = (event: string) => {
      const parent = this.$parent;
      if (parent) {
        parent.$emit(event);
      }
    };

    const alertButtons = [
      {
        text: "Proceed to Checkout",
        cssClass: "checkout-button",
        handler: () => {
          emit("show-alert");
          console.log("Proceed to Checkout clicked");
          // Add your action here
        },
      },
      {
        text: "Add More",
        cssClass: "add-more-button",
        handler: () => {
          console.log("Add More clicked");
          // Add your action here
        },
      },
    ];

    return { alertButtons };
  },
});
</script>

<style scoped>
.checkout-alert {
  --background: #f8f6f6;
}

.checkout-alert h2 {
  color: #2a363b !important;
}

.checkout-alert .alert-wrapper .alert-button-group {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
