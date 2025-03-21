<template>
    <div class="component-description q-mb-md">
        <label class="text-subtitle2 q-mb-sm block">Component Description</label>
        <q-input v-model="internalValue" type="textarea" filled rows="4" class="w-full"
            placeholder="Describe your component's purpose, functionality, and usage..."
            @update:model-value="updateValue" />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['update:modelValue']);

const internalValue = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
    internalValue.value = newValue;
});

const updateValue = (value) => {
    emit('update:modelValue', value);
};
</script>