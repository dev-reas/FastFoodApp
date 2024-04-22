<template>
  <ion-content class="ion-padding">
    <ion-grid>
      <ion-row class="ion-justify-content-center ion-align-items-center">
        <ion-col size="8">
          <img
            alt="Fast Food Logo"
            src="../assets/loginlogo.png"
            class="login-logo"
          />
        </ion-col>
        <ion-col size="8">
          <h1 class="LoginTitle">Bonjour!</h1>
          <p class="LoginSubtext">
            Welcome to all new FastFood mobile app. Kindly login your account.
            Thank you!
          </p>
        </ion-col>
        <ion-col size="8">
          <ion-input
            label="Email Address"
            type="email"
            label-placement="stacked"
            fill="outline"
            placeholder="Enter your email"
            class="inputForm"
            v-model="email"
          ></ion-input>
          <ion-input
            label-placement="stacked"
            fill="outline"
            type="password"
            label="Password"
            placeholder="Enter your password"
            class="inputForm"
            v-model="password"
          >
            <ion-input-password-toggle
              color="light"
              slot="end"
            ></ion-input-password-toggle>
          </ion-input>
        </ion-col>
        <ion-col size="8">
          <ion-button
            @click="login"
            fill="solid"
            expand="full"
            class="FormButton"
            >Login</ion-button
          >
        </ion-col>
        <ion-col size="8">
          <ion-button fill="clear" expand="full" class="guestButton"
            >Login as Guest</ion-button
          ></ion-col
        >
      </ion-row>
    </ion-grid>
  </ion-content>
  <ion-footer class="ion-align-items-center">
    <ion-toolbar class="footer-toolbar">
      <ion-title
        >Don't have an account yet? <span class="guestButton">Create</span>
      </ion-title>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import {
  IonContent,
  IonButton,
  IonRow,
  IonGrid,
  IonCol,
  IonInput,
  IonFooter,
  IonToolbar,
  IonTitle,
} from "@ionic/vue";
import { defineComponent } from "vue";

import { loginUser } from "../config/axiosConfig";

export default defineComponent({
  name: "LoginView",
  components: {
    IonContent,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonFooter,
    IonToolbar,
    IonTitle,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        await loginUser(this.email, this.password);
        this.$router.replace({ name: "Home" });
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
  },
});
</script>

<style scoped>
.login-logo {
  width: 15%;
  height: auto;
}

.LoginTitle {
  font-size: 35px;
}

.LoginSubtext {
  font-size: 15px;
}

.inputForm {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px !important;
  --highlight-color-focused: #555555;
}

.FormButton {
  --background: #cf4647;
  --color: #f8f6f6;
}

.guestButton {
  --color: #cf4647;
  color: #cf4647;
}

.footer-toolbar {
  justify-content: center;
  text-align: center;
}

@media screen and (max-width: 768px) {
  .login-logo {
    width: 20%;
    height: auto;
  }

  .LoginTitle {
    font-size: 25px;
  }

  .LoginSubtext {
    font-size: 12px;
  }
}

@media screen and (max-width: 576px) {
  .login-logo {
    width: 30%;
    height: auto;
  }

  .LoginTitle {
    font-size: 22px;
  }

  .LoginSubtext {
    font-size: 11px;
  }
}
</style>
