<template>
  <v-app>
    <v-app-bar class="pl-3 pl-md-16 pr-md-16" :elevation="1">
      <NuxtLink to="/">
        <v-icon size="x-large" color="teal">mdi-shopping-outline</v-icon>
      </NuxtLink>
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn variant="text" v-bind="props" color="teal">Categories</v-btn>
        </template>
        <v-list>
          <v-list-item><v-list-item-title>This is a test</v-list-item-title></v-list-item>
        </v-list>
      </v-menu>
      <v-spacer />
      <v-btn icon color="teal">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
      <v-btn icon color="teal">
        <v-icon>mdi-account-circle-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script lang="ts">
</script>