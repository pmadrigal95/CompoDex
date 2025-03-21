<template>
  <div class="code-editor">
    <q-card class="editor-card">
      <q-card-section class="editor-header">
        <div class="flex items-center">
          <div class="editor-dots flex q-gutter-x-sm">
            <div class="editor-dot bg-red-8 rounded-full" style="width: 12px; height: 12px"></div>
            <div class="editor-dot bg-yellow-8 rounded-full" style="width: 12px; height: 12px"></div>
            <div class="editor-dot bg-green-8 rounded-full" style="width: 12px; height: 12px"></div>
          </div>
          <div class="text-caption text-grey q-ml-md">MyComponent.vue</div>
        </div>
      </q-card-section>

      <q-card-section class="q-pa-none codemirror-container">
        <codemirror v-model="internalValue" placeholder="Paste your Vue component code here..."
          :style="{ height: '100%' }" :autofocus="true" :indent-with-tab="true" :tab-size="2"
          :extensions="extensions" />
      </q-card-section>

      <q-card-section class="editor-footer q-py-sm">
        <q-btn flat dense color="primary" icon="format_align_left" @click="formatCode" :disable="!internalValue"
          class="q-mr-sm">
          <q-tooltip>Format Code</q-tooltip>
        </q-btn>
        <q-btn flat dense color="negative" icon="clear" @click="clearCode" :disable="!internalValue">
          <q-tooltip>Clear Editor</q-tooltip>
        </q-btn>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { vue } from '@codemirror/lang-vue';
import { oneDark } from '@codemirror/theme-one-dark';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const internalValue = ref(props.modelValue);

// Computed para evitar problemas con reactividad
const extensions = computed(() => [vue(), oneDark]);

// Sincronizar `internalValue` con `modelValue`
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== internalValue.value) {
      internalValue.value = newValue;
    }
  },
  { immediate: true }
);

watch(
  () => internalValue.value,
  (newValue) => {
    emit('update:modelValue', newValue);
  },
  { flush: 'post' }
);

// Formatear código
const formatCode = () => {
  try {
    const lines = internalValue.value.split('\n');
    let indent = 0;
    const formattedLines = [];

    for (const line of lines) {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith('</')) {
        indent = Math.max(0, indent - 1);
      }

      formattedLines.push(trimmedLine ? '  '.repeat(indent) + trimmedLine : '');

      if (
        trimmedLine.startsWith('<') &&
        !trimmedLine.startsWith('</') &&
        !trimmedLine.endsWith('/>') &&
        !trimmedLine.includes('</')
      ) {
        indent++;
      }
    }

    internalValue.value = formattedLines.join('\n');
    $q.notify({
      type: 'positive',
      message: 'Code formatted',
      position: 'top',
      timeout: 2000
    });
  } catch (err) {
    $q.notify({
      type: 'negative',
      message: 'Could not format code',
      position: 'top',
      timeout: 2000
    });
  }
};

// Limpiar código
const clearCode = () => {
  $q.dialog({
    title: 'Clear editor',
    message: 'Are you sure you want to clear the editor?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    internalValue.value = '';
    $q.notify({
      type: 'info',
      message: 'Editor cleared',
      position: 'top',
      timeout: 2000
    });
  });
};
</script>

<style lang="sass" scoped>
.editor-card
  height: 100%
  display: flex
  flex-direction: column
  border-radius: 8px
  overflow: hidden

.editor-header
  background-color: #2d2d2d
  padding: 8px 12px

.codemirror-container
  flex: 1
  overflow: hidden
  min-height: 300px
  background-color: #1e1e1e

  :deep(.cm-editor)
    height: 100%
    font-family: monospace
    font-size: 14px
    line-height: 1.5

  :deep(.cm-scroller)
    overflow: auto

  :deep(.cm-gutters)
    background-color: #1e1e1e
    border-right: 1px solid rgba(255,255,255,0.1)
    color: #ddd

  :deep(.cm-content)
    padding: 4px 0

  :deep(.cm-line)
    padding: 0 8px

.editor-footer
  background-color: #2d2d2d
  border-top: 1px solid rgba(255,255,255,0.1)

// Responsive adjustments
@media (max-width: 599px)
  .codemirror-container
    min-height: 200px
</style>
