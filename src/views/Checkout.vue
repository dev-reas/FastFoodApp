<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="ion-padding">
        <FoodViewToolbar category="Order Summary" :showImage="false" />
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col size-lg="6" size-md="12" size-sm="12">
            <CheckoutCard
              :title="name"
              :subtitle1="number"
              :subtitle2="email"
            />
            <CheckoutCard title="My Home Address" :subtitle1="address" />
            <CheckoutCard title="Work Office" :subtitle1="address" />
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <h1>Orders</h1>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size-lg="6" size-md="12" size-sm="12">
            <CheckoutCardFoodDetails
              v-for="(order, index) in bagItems"
              :key="index"
              :foodTitle="foodTitle"
              :totalPrice="totalPrice"
              :beverage="beverage"
              :beverageSize="beverageSize"
              :addOnDetails="addOnDetails"
            />
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col> Payment Option </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size-lg="6" size-md="12" size-sm="12">
            <sizeButtons
              :sizes="['Loyalty Points', 'Paypal', 'Paynamics']"
              @sizeSelected="handlePayment"
            />
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-grid>
            <ion-row class="ion-align-items-end">
              <ion-col
                size-lg="2"
                size-md="12"
                size-sm="12"
                class="totalPrices"
              >
                <p>Sub Total: {{ totalPrice }}</p>
                <p>Delivery Fee: 49</p>
                <p>Grand Total: {{ grandTotal }}</p>
              </ion-col>
              <ion-col size-lg="4" size-md="12" size-sm="12">
                <ion-button
                  expand="full"
                  shape="round"
                  class="PlaceOrderButton"
                  @click="handleSubmitOrder"
                  >Place Order</ion-button
                >
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/vue";
import { defineComponent, ref, onMounted } from "vue";
import { chevronBackOutline } from "ionicons/icons";

import CheckoutCard from "../components/checkoutCard.vue";
import FoodViewToolbar from "@/components/FoodViewToolbar.vue";
import CheckoutCardFoodDetails from "@/components/checkoutCardFoodDetails.vue";
import SizeButtons from "@/components/sizeButtons.vue";

import { submitOrder } from "../config/axiosConfig";

import {
  fetchUser,
  fetchFoodById,
  fetchAddOnsById,
} from "../config/axiosConfig";

export default defineComponent({
  name: "CheckoutView",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    CheckoutCard,
    FoodViewToolbar,
    CheckoutCardFoodDetails,
    IonButton,
    SizeButtons,
  },
  setup() {
    const bagItems = ref<any[]>(
      JSON.parse(localStorage.getItem("bag") || "[]")
    );

    const name = ref<string>("");
    const number = ref<string>("");
    const email = ref<string>("");
    const address = ref<string>("");

    const foodTitle = ref<string>("");
    const beverage = ref<string>("");
    const beverageSize = ref<string>("");
    const totalPrice = ref<number>(0);
    const grandTotal = ref<number>(0);

    const foodDetails = ref<any[]>([]);
    const addOnDetails = ref<any[]>([]);

    const selectedSize = ref<string>("");

    const handlePayment = (size: string) => {
      selectedSize.value = size;
    };

    const fetchedUser = async () => {
      try {
        const user = await fetchUser();
        name.value = user.data.name;
        number.value = user.data.number;
        email.value = user.data.email;
        address.value = user.data.address;
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchItemDetails = async () => {
      if (bagItems.value.length === 0) {
        console.error("Bag is empty");
        return;
      }

      for (const order of bagItems.value) {
        beverage.value = order.beverage;
        beverageSize.value = order.beverage_size;

        const foods = order.foods || [];
        const addOns = order.add_ons || [];

        for (const item of foods) {
          const foodId = item.id;
          const foodQuantity = item.quantity;
          try {
            const foodResponse = await fetchFoodById(foodId);
            const foodData = foodResponse.data;
            foodDetails.value.push({ ...foodData, quantity: foodQuantity });
            totalPrice.value += foodData.price * foodQuantity;
            foodTitle.value = foodData.name;
          } catch (error) {
            console.error("Error fetching food details:", error);
          }
        }

        for (const item of addOns) {
          const addOnId = item.id;
          const addOnQuantity = item.quantity;
          try {
            const addOnResponse = await fetchAddOnsById(addOnId);
            const addOnData = addOnResponse.data;
            addOnDetails.value.push({ ...addOnData, quantity: addOnQuantity });
            totalPrice.value += addOnData.price * addOnQuantity;
          } catch (error) {
            console.error("Error fetching add-on details:", error);
          }
        }
      }

      grandTotal.value = totalPrice.value + 49;
    };

    const handleSubmitOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await submitOrder(token);
        console.log("Order submitted successfully:", response);
      } catch (error) {
        console.error("Error submitting order:", error);
      }
    };

    onMounted(async () => {
      await fetchedUser();
      await fetchItemDetails();
    });

    return {
      name,
      number,
      email,
      address,
      foodDetails,
      addOnDetails,
      foodTitle,
      totalPrice,
      grandTotal,
      beverage,
      beverageSize,
      bagItems,
      selectedSize,
      handlePayment,
      handleSubmitOrder,
    };
  },
  data() {
    return {
      chevronBackOutline,
    };
  },
});
</script>

<style>
.totalPrices p {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 20px;
}

.PlaceOrderButton {
  --background: #cf4647;
  --color: #f8f6f6;
}
</style>
