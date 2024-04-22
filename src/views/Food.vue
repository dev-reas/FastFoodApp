<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <FoodViewToolbar :category="category" />
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row class="ion-justify-content-start">
          <ion-col size="12" size-md="12" size-lg="8">
            <FoodImageDetails :src="image" />
            <ion-grid>
              <ion-row class="ion-justify-content-start">
                <ion-col size="12" size-md="12" size-lg="12">
                  <ion-title class="food-content">
                    <h1>{{ title }}</h1>
                  </ion-title>
                </ion-col>
              </ion-row>
              <ion-row class="ion-justify-content-start">
                <ion-col size="12" size-md="12" size-lg="12">
                  <ion-text class="food-content">
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Sunt, aspernatur! Veniam explicabo modi aut aperiam non in
                      illo minima ducimus?
                    </p>
                  </ion-text>
                </ion-col>
              </ion-row>
              <ion-row class="ion-justify-content-between">
                <ion-col
                  size="12"
                  size-md="12"
                  size-lg="12"
                  class="food-content-container"
                >
                  <ion-text class="food-content">
                    <h3>P {{ price }}</h3>
                  </ion-text>
                  <ion-grid>
                    <ion-row
                      class="ion-justify-content-end ion-align-items-center"
                    >
                      <ion-col size="auto">
                        <ion-button
                          class="addToCartCounterButton"
                          @click="minusFoodCounter"
                        >
                          <ion-icon
                            slot="icon-only"
                            :icon="removeOutline"
                          ></ion-icon> </ion-button
                      ></ion-col>
                      <ion-col size="auto"
                        ><ion-title class="addToCartCounter">{{
                          foodCounter
                        }}</ion-title></ion-col
                      >
                      <ion-col size="auto">
                        <ion-button
                          class="addToCartCounterButton"
                          @click="addFoodCounter"
                        >
                          <ion-icon
                            slot="icon-only"
                            :icon="addOutline"
                          ></ion-icon> </ion-button
                      ></ion-col>
                    </ion-row>
                  </ion-grid>
                </ion-col>
              </ion-row>
              <BeverageDropdown
                :selectedBeverage="selectedBeverage"
                @update:selectedBeverage="selectedBeverage = $event"
              />
              <sizeButtons
                :sizes="['Regular', 'Large', 'X-Large']"
                @sizeSelected="handleSizeSelected"
              />
            </ion-grid>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size-sm="12" size-md="12" size-lg="5">
            <add-ons
              v-for="addOn in addOnsList"
              :key="addOn.id"
              :add-on-id="addOn.id"
              :title="addOn.name"
              :subtitle="addOn.type"
              :price="`P ${addOn.price}`"
              :ImageSource="addOn.image"
              @update:checked="handleCheckedAddOns"
              @update:counter="handleCounterUpdate"
            />
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid class="fixed-bottom-center">
        <ion-row class="ion-justify-content-center">
          <ion-col size="11">
            <ion-button
              expand="block"
              class="addToCartButton"
              @click="addToBag"
              id="present-alert"
              >Add to Bag</ion-button
            >
            <ion-alert
              trigger="present-alert"
              header="Successfully Added!"
              message="What do you want to do now?"
              :buttons="alertButtons"
              class="checkout-alert"
            ></ion-alert>
          </ion-col>
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
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonText,
  IonAlert,
} from "@ionic/vue";
import { defineComponent, ref, onMounted } from "vue";
import {
  addOutline,
  removeOutline,
  chevronBackOutline,
  basketOutline,
} from "ionicons/icons";

import { fetchFoodById, fetchAddOns } from "@/config/axiosConfig";

import coffee from "../assets/coffee.png";
import rice from "../assets/rice.png";

import FoodViewToolbar from "../components/FoodViewToolbar.vue";
import FoodImageDetails from "../components/FoodImageDetails.vue";
import sizeButtons from "../components/sizeButtons.vue";
import BeverageDropdown from "../components/beverageDropdown.vue";
import addOns from "../components/addOns.vue";

import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "FoodView",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon,
    IonText,
    addOns,
    FoodViewToolbar,
    FoodImageDetails,
    sizeButtons,
    BeverageDropdown,
    IonAlert,
  },
  data() {
    return {
      addOutline,
      removeOutline,
      chevronBackOutline,
      basketOutline,
      coffee: coffee,
      rice: rice,
    };
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const foodId = ref<number>(0);
    const title = ref<string>("");
    const price = ref<string>("");
    const image = ref<string>("");
    const category = ref<string>("");
    const selectedBeverage = ref<string>("Coke");
    const selectedSize = ref<string>("");
    const foodCounter = ref<number>(1);
    const checkedAddOns = ref<any[]>([]);
    const addOnsList = ref<any[]>([]);

    const alertButtons = [
      {
        text: "Proceed to Checkout",
        cssClass: "checkout-button",
        handler: () => {
          if (route.name === "Checkout") {
            return;
          }
          router.push({ name: "Checkout" });
        },
      },
      {
        text: "Add More",
        role: "cancel",
        cssClass: "add-more-button",
      },
    ];

    const fetchFoodDetails = async () => {
      try {
        const id = route.params.id;
        foodId.value = id;

        const response = await fetchFoodById(id);

        title.value = response.data.name;
        price.value = response.data.price;
        image.value = response.data.image;
        category.value = response.data.category.name;
      } catch (error) {
        console.error("Error fetching food details:", error);
      }
    };

    const fetchAddOnsList = async () => {
      try {
        const fetchedAddOns = await fetchAddOns();
        addOnsList.value = fetchedAddOns.data;
      } catch (error) {
        console.error("Error fetching add-ons:", error);
      }
    };

    const addFoodCounter = () => {
      foodCounter.value++;
    };

    const minusFoodCounter = () => {
      if (foodCounter.value > 1) {
        foodCounter.value--;
      }
    };

    const handleSizeSelected = (size: string) => {
      selectedSize.value = size;
    };

    const handleCheckedAddOns = (checkedData: any) => {
      if (checkedData.checked) {
        checkedAddOns.value.push({
          id: checkedData.id,
          counter: checkedData.counter,
        });
      } else {
        const index = checkedAddOns.value.findIndex(
          (addOn) => addOn.id === checkedData.id
        );
        if (index !== -1) {
          checkedAddOns.value.splice(index, 1);
        }
      }
    };

    const handleCounterUpdate = (counterData: any) => {
      const index = checkedAddOns.value.findIndex(
        (addOn) => addOn.id === counterData.id
      );
      if (index !== -1) {
        checkedAddOns.value[index].counter = counterData.counter;
      }
    };

    const addToBag = () => {
      const bagItems = {
        beverage: selectedBeverage.value,
        beverage_size: selectedSize.value,
        foods: [{ id: foodId.value, quantity: foodCounter.value }],
        add_ons: checkedAddOns.value.map((addOn) => ({
          id: addOn.id,
          quantity: addOn.counter,
        })),
      };

      let bag = JSON.parse(localStorage.getItem("bag")) || [];
      bag.push(bagItems);
      localStorage.setItem("bag", JSON.stringify(bag));
    };

    onMounted(() => {
      fetchFoodDetails();
      fetchAddOnsList();
    });

    return {
      foodId,
      title,
      price,
      image,
      category,
      selectedBeverage,
      selectedSize,
      foodCounter,
      checkedAddOns,
      addFoodCounter,
      minusFoodCounter,
      handleSizeSelected,
      handleCheckedAddOns,
      handleCounterUpdate,
      addToBag,
      addOnsList,
      alertButtons,
    };
  },
});
</script>

<style scoped>
.food-content {
  padding-left: 0;
}

.food-content p {
  font-size: 1rem;
  margin: 0;
}

.food-content h3 {
  color: #cf4647;
}

.food-content-container {
  display: flex;
  justify-content: space-between;
}

.addToCartCounter {
  font-size: 2rem; /* Adjust font size to match button size */
}

.addToCartCounterButton {
  width: 1rem;
}

.addToCartCounterButton {
  --background: #0000001a !important;
  --color: #cf4647 !important;
}

.addToCartButton {
  --border-radius: 20px;
  --background: #cf4647 !important;
  --color: #f8f6f6 !important;
}

.fixed-bottom-center {
  position: fixed;
  bottom: 5px; /* Adjust as needed */
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
  width: 100%;
}

.checkout-alert {
  --background: #f8f6f6;
}
</style>
