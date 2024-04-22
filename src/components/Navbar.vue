<template>
  <ion-menu type="overlay" content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu Content</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-title class="name-title">{{ name }}</ion-title>
            <ion-title class="number-title">{{ number }}</ion-title>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-list>
        <ion-item
          router-link="/home"
          :class="{ active: $route.name === 'Home' }"
        >
          <ion-label>Home</ion-label>
        </ion-item>
        <ion-item
          router-link="/order"
          :class="{ active: $route.name === 'Order' }"
        >
          <ion-label>Order Now!</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Notifications</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Store Locator</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>FAQs</ion-label>
        </ion-item>

        <ion-item-divider class="middle-divider"></ion-item-divider>

        <ion-item>
          <ion-label>My Orders</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>My Account</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>My Favorites</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Order Tracker</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Order History</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-footer>
      <ion-toolbar class="menu-footer-toolbar">
        <ion-button fill="clear" class="logoutButton" @click="logout"
          >Logout</ion-button
        >
      </ion-toolbar>
    </ion-footer>
  </ion-menu>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  IonMenu,
  IonFooter,
  IonButton,
  IonRow,
  IonCol,
  IonGrid,
} from "@ionic/vue";

import { search, filter } from "ionicons/icons";

import { defineComponent, onMounted, ref } from "vue";

import { logoutUser } from "../config/axiosConfig";

import { fetchUser } from "../config/axiosConfig";

export default defineComponent({
  name: "AppNavbar",
  components: {
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonLabel,
    IonTitle,
    IonToolbar,
    IonItemDivider,
    IonMenu,
    IonFooter,
    IonButton,
    IonRow,
    IonCol,
    IonGrid,
  },
  setup() {
    const name = ref<string>("");
    const number = ref<string>("");
    const fetchedUser = async () => {
      try {
        const user = await fetchUser();
        name.value = user.data.name;
        number.value = user.data.number;
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    onMounted(async () => {
      await fetchedUser();
    });
    return { search, filter, name, number };
  },
  methods: {
    async logout() {
      try {
        const success = await logoutUser();
        if (success) {
          this.$router.replace({ name: "Login" });
        }
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },
  },
});
</script>

<style>
ion-content,
ion-toolbar,
ion-list,
ion-item {
  --ion-background-color: #f8f6f6;
  --background: #f8f6f6;
  --ion-item-background: #f8f6f6;
}

ion-header {
  box-shadow: none !important;
}

ion-title,
ion-content {
  --ion-text-color: #2a363b;
  color: #2a363b;
}

ion-item-divider {
  --ion-item-border-color: #dddddd;
}

.middle-divider {
  min-height: 0%;
  margin: 10px; /* Adjust the padding as needed to position the divider */
}

.menu-footer-toolbar {
  padding-left: 16px;
}

.logoutButton {
  --background: #cf4647 !important;
  --color: #f8f6f6 !important;
}

.active {
  --background: #cf4647;
  --color: #f8f6f6 !important;
  border-radius: 10px;
}

.name-title {
  font-weight: bold;
}

.number-title {
  margin-top: 10px;
}

.name-title,
.number-title {
  padding-left: 0px;
}

@media screen and (min-width: 425px) {
  .name-title {
    font-size: 25px;
  }

  .number-title {
    font-size: 18px;
  }
}

@media screen and (max-width: 375px) {
  .name-title {
    font-size: 20px;
  }

  .number-title {
    font-size: 12px;
  }
}
</style>
