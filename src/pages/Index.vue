<template>
  <q-page padding>
    <div class="q-pa-md">
      <h4 class="text-center q-mb-lg">Vue 3 + Quasar Documentation Generator</h4>
      <p class="text-center text-grey-8 q-mb-xl">
        Create beautiful, comprehensive documentation for your Vue 3 components with Quasar Framework support
      </p>

      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-6">
          <q-card class="code-editor-card">
            <q-card-section>
              <div class="text-h6">Component Code</div>
              <p class="text-grey-8 q-mb-sm">Paste your Vue 3 + Quasar component code below:</p>
            </q-card-section>

            <q-card-section>
              <code-editor v-model="code" />
            </q-card-section>

            <q-card-section>
              <component-description v-model="description" />
            </q-card-section>

            <q-card-section>
              <documentation-generator :code="code" :description="description"
                @documentation-generated="onDocumentationGenerated" />
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-6">
          <documentation-viewer :documentation="documentation" :is-generating="isGenerating" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import CodeEditor from '@/components/CodeEditor.vue';
import ComponentDescription from '@/components/ComponentDescription.vue';
import DocumentationGenerator from '@/components/DocumentationGenerator.vue';
import DocumentationViewer from '@/components/DocumentationViewer.vue';

const code = ref('');
const description = ref('');
const documentation = ref(null);
const isGenerating = ref(false);

const onDocumentationGenerated = (generatedDoc) => {
  documentation.value = generatedDoc;
};
</script>

<style lang="sass" scoped>
.code-editor-card
  height: 100%
  display: flex
  flex-direction: column
</style>