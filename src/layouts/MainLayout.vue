<template>
  <q-layout view="hHh LpR lFf">
    <!-- Header -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title class="text-weight-bold">Vue Component DocGen</q-toolbar-title>
        <q-btn flat round dense icon="help" to="/about" />
      </q-toolbar>
    </q-header>

    <!-- Sidebar / Left Drawer -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="240" class="bg-grey-1">
      <q-list padding>
        <q-item-label header class="text-grey-8">Navigation</q-item-label>

        <q-item clickable v-ripple to="/" exact>
          <q-item-section avatar>
            <q-icon name="description" />
          </q-item-section>
          <q-item-section>Document Component</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/history">
          <q-item-section avatar>
            <q-icon name="history" />
          </q-item-section>
          <q-item-section>History</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/components">
          <q-item-section avatar>
            <q-icon name="widgets" />
          </q-item-section>
          <q-item-section>Components</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/about">
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>About</q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item-label header class="text-grey-8">Settings</q-item-label>

        <q-item clickable v-ripple to="/settings">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>Preferences</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Main Content Area -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>

<style lang="sass">
.q-toolbar
  min-height: 60px
</style>
