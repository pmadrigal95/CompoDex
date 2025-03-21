<template>
    <q-card class="documentation-viewer full-height">
        <q-card-section class="q-pb-none">
            <div class="flex justify-between items-center">
                <div class="text-h6">Documentation Preview</div>
                <q-btn v-if="documentation" flat dense color="primary" icon="content_copy" @click="copyDocumentation">
                    <q-tooltip>Copy to Clipboard</q-tooltip>
                </q-btn>
            </div>
        </q-card-section>

        <q-card-section class="q-pt-md scroll" style="height: calc(100% - 60px); overflow: auto;">
            <div v-if="isGenerating" class="column items-center justify-center text-center full-height q-gutter-y-md">
                <q-spinner color="primary" size="48px" />
                <div class="text-subtitle1 text-grey">Generating documentation...</div>
            </div>

            <div v-else-if="documentation" class="documentation-content">
                <h2 class="text-h5 q-mb-md">{{ documentation.componentName }}</h2>

                <p class="text-body1 q-mb-lg">{{ documentation.description }}</p>

                <div class="q-mb-md">
                    <div class="text-subtitle1 text-weight-bold q-mb-sm">Props</div>
                    <q-list bordered separator>
                        <q-item v-for="(prop, name) in documentation.props" :key="name">
                            <q-item-section>
                                <q-item-label class="text-primary text-weight-bold">{{ name }}</q-item-label>
                                <q-item-label caption>
                                    Type: <code>{{ prop.type }}</code>
                                    <span v-if="prop.default !== undefined"> • Default:
                                        <code>{{ prop.default }}</code></span>
                                    <span v-if="prop.required"> • Required</span>
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item v-if="Object.keys(documentation.props).length === 0">
                            <q-item-section>
                                <q-item-label caption>No props defined</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </div>

                <div class="q-mb-md">
                    <div class="text-subtitle1 text-weight-bold q-mb-sm">Events</div>
                    <q-list bordered separator>
                        <q-item v-for="(event, index) in documentation.events" :key="index">
                            <q-item-section>
                                <q-item-label class="text-primary text-weight-bold">{{ event.name }}</q-item-label>
                                <q-item-label v-if="event.payload !== 'None'" caption>
                                    Payload: <code>{{ event.payload }}</code>
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item v-if="documentation.events.length === 0">
                            <q-item-section>
                                <q-item-label caption>No events defined</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </div>

                <div class="q-mb-md">
                    <div class="text-subtitle1 text-weight-bold q-mb-sm">Usage Example</div>
                    <q-card flat bordered class="bg-grey-1">
                        <q-card-section class="q-pa-sm">
                            <pre class="code-block"><code>{{ documentation.usageExample }}</code></pre>
                        </q-card-section>
                    </q-card>
                </div>
            </div>

            <div v-else class="column items-center justify-center full-height q-gutter-y-md text-center">
                <q-icon name="description" size="64px" color="grey-5" />
                <div class="text-h6 text-grey-7">No documentation generated yet</div>
                <div class="text-subtitle1 text-grey">Fill in your component code and description, then generate
                    documentation</div>
            </div>
        </q-card-section>
    </q-card>
</template>

<script setup>
import { useQuasar } from 'quasar';

const $q = useQuasar();

const props = defineProps({
    documentation: {
        type: Object,
        default: null
    },
    isGenerating: {
        type: Boolean,
        default: false
    }
});

const copyDocumentation = () => {
    if (!props.documentation) return;

    const docText = `
  # ${props.documentation.componentName}
  
  ${props.documentation.description}
  
  ## Props
  
  ${Object.entries(props.documentation.props).map(([name, prop]) =>
        `- **${name}** (${prop.type})${prop.required ? ' - Required' : ''}${prop.default !== undefined ? ` - Default: ${prop.default}` : ''}`
    ).join('\n')}
  
  ## Events
  
  ${props.documentation.events.map(event =>
        `- **${event.name}**${event.payload !== 'None' ? ` - Payload: ${event.payload}` : ''}`
    ).join('\n')}
  
  ## Usage Example
  
  \`\`\`vue
  ${props.documentation.usageExample}
  \`\`\`
  `.trim();

    navigator.clipboard.writeText(docText)
        .then(() => {
            $q.notify({
                type: 'positive',
                message: 'Documentation copied to clipboard',
                position: 'top'
            });
        })
        .catch(() => {
            $q.notify({
                type: 'negative',
                message: 'Failed to copy to clipboard',
                position: 'top'
            });
        });
};
</script>

<!-- <style lang="sass" scoped>
  .documentation-viewer
    height: 100%
    display: flex
    flex-direction: column
    border-radius: 8px
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05)
  
  .documentation-content
    font-family: 'Inter', sans-serif
  
  .code-block
    background: #f5f5f5
    border-radius: 4px
    padding: 8px
    margin: 0
    overflow-x: auto
    font-family: monospace
    white-space: pre-wrap
    word-wrap: break-word
    font-size: 14px
    line-height: 1.5
  </style> -->