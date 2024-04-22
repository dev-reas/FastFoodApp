<template>
  <ion-card class="addOnsCard">
    <ion-grid>
      <ion-row>
        <ion-col size-lg="2" size-md="2" size-sm="3" size="3">
          <img :src="ImageSource" />
        </ion-col>
        <ion-col size-sm="12" size-md="12" size-lg="10">
          <ion-card-header class="addOnsCard">
            <ion-grid class="title-card">
              <ion-row
                class="ion-justify-content-between ion-align-items-center"
              >
                <ion-col size="auto">
                  <ion-card-title
                    ><p class="title-text">{{ title }}</p></ion-card-title
                  >
                </ion-col>
                <ion-col size="auto">
                  <ion-checkbox
                    class="addons-checkbox"
                    @ionChange="handleCheckboxChange"
                  ></ion-checkbox>
                </ion-col>
              </ion-row>
            </ion-grid>
            <ion-card-subtitle>
              <p class="subtitle-text">{{ subtitle }}</p></ion-card-subtitle
            >
          </ion-card-header>

          <ion-card-content>
            <ion-grid>
              <ion-row class="ion-align-items-center">
                <ion-col size-lg="9" size-md="9" size="12">
                  <p class="price-text">{{ price }}</p></ion-col
                >
                <ion-col size="auto">
                  <ion-button
                    class="addOnsCounterButtons"
                    size="small"
                    @click="decrementCounter"
                    :disabled="!isChecked"
                  >
                    <ion-icon slot="icon-only" :icon="removeOutline"></ion-icon>
                  </ion-button>
                </ion-col>
                <ion-col size="auto"
                  ><ion-title class="addOnsCounterStyle"
                    ><p>{{ addOnsCounter }}</p></ion-title
                  ></ion-col
                >
                <ion-col size="auto">
                  <ion-button
                    class="addOnsCounterButtons"
                    size="small"
                    @click="incrementCounter"
                    :disabled="!isChecked"
                  >
                    <ion-icon slot="icon-only" :icon="addOutline"></ion-icon>
                  </ion-button>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-card-content>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-card>
</template>

<script>
import {
  IonGrid,
  IonCol,
  IonRow,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonTitle,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { addOutline, removeOutline } from "ionicons/icons";

export default defineComponent({
  name: "addOns",
  components: {
    IonGrid,
    IonCol,
    IonRow,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCheckbox,
    IonTitle,
    IonButton,
    IonIcon,
  },
  data() {
    return {
      addOutline,
      removeOutline,
      isChecked: false,
      addOnsCounter: 1,
    };
  },
  props: {
    addOnId: Number,
    title: String,
    subtitle: String,
    price: String,
    ImageSource: String,
  },
  methods: {
    incrementCounter() {
      this.addOnsCounter++;
      this.$emit("update:counter", {
        id: this.addOnId,
        counter: this.addOnsCounter,
      });
    },
    decrementCounter() {
      if (this.addOnsCounter > 1) {
        this.addOnsCounter--;
        this.$emit("update:counter", {
          id: this.addOnId,
          counter: this.addOnsCounter,
        });
      }
    },

    resetCounter() {
      this.addOnsCounter = 1;
    },

    handleCheckboxChange(event) {
      this.isChecked = event.target.checked;
      this.$emit("update:checked", {
        id: this.addOnId, // Using key attribute
        checked: this.isChecked,
        counter: this.isChecked ? this.addOnsCounter : 1,
      });
      if (!this.isChecked) {
        this.resetCounter();
      }
    },
  },
});
</script>

<style>
.addOnsCard {
  background-color: #e9ecef;
}

.addons-checkbox {
  --border-color: #cf4647;
  --border-color-checked: #cf4647;
  --checkbox-background-checked: #cf4647;
  --checkmark-color: #f8f6f6;
}

.food-content-container {
  display: flex;
  justify-content: space-between;
}

.addOnsCounterStyle {
  padding: 15px !important;
}

.addOnsCounterStyle p {
  font-size: 1.2rem !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

.addOnsCounterButtons {
  width: 0.5rem;
  --background: #0000001a !important;
  --color: #cf4647 !important;
}

.title-card,
.title-card > ion-row > ion-col {
  margin: 0;
  padding: 0;
}

.title-text,
.subtitle-text,
.price-text {
  margin: 0;
}

.title-text {
  font-size: 25px;
}

.subtitle-text {
  font-size: 18px;
}

.price-text {
  font-size: 20px !important;
}

@media (max-width: 375px) {
  .addOnsCounterStyle {
    padding: 10px !important;
  }

  .title-text {
    font-size: 14px;
  }

  .subtitle-text {
    font-size: 12px;
  }

  .price-text {
    font-size: 14px !important;
  }
}
</style>
