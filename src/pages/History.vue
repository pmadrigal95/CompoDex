<template>
    <q-page padding>
        <div class="q-pa-md">
            <h4 class="q-mb-md">Documentation History</h4>
            <p class="text-grey-8 q-mb-lg">View and manage your previously generated documentation.</p>

            <q-card class="my-card q-mb-md" v-for="(item, index) in historyItems" :key="index">
                <q-card-section>
                    <div class="text-h6">{{ item.title }}</div>
                    <div class="text-subtitle2">Generated on {{ item.date }}</div>
                </q-card-section>
                <q-card-section>
                    {{ item.description }}
                </q-card-section>
                <q-separator />
                <q-card-actions>
                    <q-btn flat color="primary" label="View" />
                    <q-btn flat color="secondary" label="Edit" />
                    <q-space />
                    <q-btn flat color="negative" icon="delete" />
                </q-card-actions>
            </q-card>

            <div class="text-center q-mt-xl" v-if="historyItems.length === 0">
                <q-icon name="history" size="5rem" color="grey-5" />
                <p class="text-grey-7 q-mt-md">No documentation history found.</p>
                <q-btn color="primary" label="Create New Documentation" to="/" class="q-mt-md" />
            </div>
        </div>
    </q-page>
</template>

<script setup>
import { ref } from 'vue';

const historyItems = ref([
    {
        title: 'QButton Component',
        date: '2023-05-12',
        description: 'Documentation for Quasar\'s QButton component with props, events, and examples.'
    },
    {
        title: 'QTable Component',
        date: '2023-05-10',
        description: 'Comprehensive documentation for the QTable component including pagination and filtering.'
    },
    {
        title: 'Custom Form Component',
        date: '2023-05-05',
        description: 'Documentation for a custom form component with validation and submission handling.'
    }
]);
</script>

<style lang="sass" scoped>
  .my-card
    transition: all 0.3s ease
    &:hover
      transform: translateY(-5px)
      box-shadow: 0 5px 15px rgba(0,0,0,0.1)
  </style>