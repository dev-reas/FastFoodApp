<template>
  <ion-content>
    <ion-grid>
      <ion-row class="ion-justify-content-center align-items-center">
        <ion-col size="auto">
          <img src="../assets/positive-vote 1.png" />
        </ion-col>
      </ion-row>
      <ion-row class="ion-justify-content-center align-items-center">
        <ion-col size="auto">
          <h1>Order Received!</h1>
        </ion-col>
      </ion-row>
      <ion-row class="ion-justify-content-center align-items-center">
        <ion-col size="auto">
          <p>
            Your order has successfully been taken and is now being processed.
            Kindly wait for our notification regarding your order.
          </p>
        </ion-col>
      </ion-row>
      <ion-row class="ion-justify-content-center align-items-center">
        <ion-col size-lg="6" size-md="12" size-sm="12">
          <ion-button expand="block" class="trackButton"
            >Track Order</ion-button
          >
        </ion-col>
      </ion-row>
      <ion-row class="ion-justify-content-center align-items-center">
        <ion-col size-lg="6" size-md="12" size-sm="12">
          <ion-button
            expand="block"
            fill="clear"
            class="backToHomeButton"
            @click="goToHome"
            >Back to Home</ion-button
          >
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script lang="ts">
import { IonButton, IonCol, IonContent, IonGrid, IonRow } from "@ionic/vue";
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { latestOrder } from "../config/axiosConfig";

export default defineComponent({
  name: "OrderSubmitted",
  components: {
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
  },
  setup() {
    const router = useRouter();
    const orderID = ref<number | null>(null);

    const goToHome = () => {
      router.push("/home");
    };

    const fetchLatestOrder = async () => {
      try {
        const data = await latestOrder();
        console.log(data);
      } catch (error) {
        console.error("Error fetching latest order:", error);
      }
    };

    onMounted(() => {
      fetchLatestOrder();
    });

    return {
      goToHome,
      orderID,
    };
  },
});
</script>

<style scoped>
.trackButton {
  --border-radius: 10px;
  --background: #cf4647 !important;
  --color: #f8f6f6 !important;
}

.backToHomeButton {
  --color: #cf4647;
}
</style>
