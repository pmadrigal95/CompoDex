<template>
    <div>
      <h1>Counter: {{ counter.count }}</h1>
      <q-btn @click="counter.increment" color="primary" label="Increment" />
      <q-btn @click="counter.decrement" color="negative" label="Decrement" class="q-ml-sm" />
    </div>
  </template>
  
  <script setup>
  import { useCounterStore } from '@/stores/counterStore';
  
  const counter = useCounterStore();
  </script>
  