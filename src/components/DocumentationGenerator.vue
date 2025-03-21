<template>
    <div class="documentation-generator">
        <q-card class="documentation-card q-mb-md">
            <q-card-section>
                <div class="text-h6">Documentation Generator</div>
                <p class="text-grey-8">
                    Generate detailed documentation for your Vue 3 + Quasar component
                </p>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-btn :loading="isGenerating" color="primary" icon-right="auto_awesome" label="Generate Documentation"
                    class="full-width" @click="generateDocumentation" />
            </q-card-section>
        </q-card>

        <q-card v-if="documentation" class="documentation-preview">
            <q-card-section class="flex justify-between items-center">
                <div class="text-h6">Generated Documentation</div>
                <q-btn flat round color="primary" icon="content_copy" @click="copyToClipboard">
                    <q-tooltip>Copy to Clipboard</q-tooltip>
                </q-btn>
            </q-card-section>

            <q-separator />

            <q-card-section>
                <div class="documentation-content">
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
                                    <q-item-label v-if="prop.description" caption>{{ prop.description }}</q-item-label>
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
                                    <q-item-label v-if="event.description" caption>{{ event.description
                                    }}</q-item-label>
                                    <q-item-label v-if="event.payload" caption>
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
            </q-card-section>
        </q-card>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const props = defineProps({
    code: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['documentation-generated']);

const isGenerating = ref(false);
const documentation = ref(null);

// Extract component name from the code
const extractComponentName = (code) => {
    // Try to find component name from export default
    const exportMatch = code.match(/export\s+default\s+defineComponent\(\s*{\s*name:\s*['"]([^'"]+)['"]/);
    if (exportMatch) return exportMatch[1];

    // Try to find component name from <script setup> with defineOptions
    const defineOptionsMatch = code.match(/defineOptions\(\s*{\s*name:\s*['"]([^'"]+)['"]/);
    if (defineOptionsMatch) return defineOptionsMatch[1];

    // Fallback to file name detection
    const fileNameMatch = code.match(/MyComponent|[A-Z][a-zA-Z0-9]+\.vue/);
    return fileNameMatch ? fileNameMatch[0].replace('.vue', '') : 'Component';
};

// Extract props from the component code
const extractProps = (code) => {
    const props = {};

    // Match defineProps syntax
    const propsMatch = code.match(/defineProps\(\s*({[^}]+})\s*\)/s);
    if (propsMatch) {
        const propsStr = propsMatch[1];

        // Extract each prop
        const propEntries = propsStr.matchAll(/(\w+):\s*{([^}]+)}/g);
        for (const match of propEntries) {
            const propName = match[1];
            const propDef = match[2];

            const typeMatch = propDef.match(/type:\s*([A-Za-z]+)/);
            const defaultMatch = propDef.match(/default:\s*([^,\s]+|'[^']*'|"[^"]*")/);
            const requiredMatch = propDef.match(/required:\s*(true|false)/);

            props[propName] = {
                type: typeMatch ? typeMatch[1] : 'Any',
                default: defaultMatch ? defaultMatch[1] : undefined,
                required: requiredMatch ? requiredMatch[1] === 'true' : false
            };
        }
    }

    return props;
};

// Extract events from the component code
const extractEvents = (code) => {
    const events = [];

    // Match defineEmits syntax
    const emitsArrayMatch = code.match(/defineEmits\(\s*\[([^\]]+)\]\s*\)/);
    if (emitsArrayMatch) {
        const emitsStr = emitsArrayMatch[1];
        const eventNames = emitsStr.match(/'[^']+'/g) || emitsStr.match(/"[^"]+"/g) || [];

        eventNames.forEach(name => {
            events.push({
                name: name.replace(/['"]/g, ''),
                description: '',
                payload: 'Any'
            });
        });
    }

    // Match emit usage for more context
    const emitUsages = code.matchAll(/emit\(['"](\w+)['"](?:,\s*([^)]+))?\)/g);
    for (const match of emitUsages) {
        const eventName = match[1];
        const payload = match[2];

        // Check if this event is already in our list
        const existingEvent = events.find(e => e.name === eventName);
        if (existingEvent && payload) {
            existingEvent.payload = payload;
        } else if (!existingEvent) {
            events.push({
                name: eventName,
                description: '',
                payload: payload || 'None'
            });
        }
    }

    return events;
};

// Generate a usage example based on the component
const generateUsageExample = (componentName, props, events) => {
    let example = `<${componentName}`;

    // Add props
    Object.entries(props).forEach(([name, def]) => {
        if (def.type === 'Boolean') {
            example += `\n  :${name}="true"`;
        } else if (def.type === 'String') {
            example += `\n  :${name}="'example'"`;
        } else if (def.type === 'Number') {
            example += `\n  :${name}="42"`;
        } else if (def.type === 'Array') {
            example += `\n  :${name}="[]"`;
        } else if (def.type === 'Object') {
            example += `\n  :${name}="{}"`;
        } else {
            example += `\n  :${name}="value"`;
        }
    });

    // Add event handlers
    events.forEach(event => {
        example += `\n  @${event.name}="handle${event.name.charAt(0).toUpperCase() + event.name.slice(1)}"`;
    });

    example += `\n/>`;

    return example;
};

// Generate documentation from the provided code
const generateDocumentation = () => {
    if (!props.code.trim()) {
        $q.notify({
            type: 'negative',
            message: 'Please enter component code first',
            position: 'top'
        });
        return;
    }

    isGenerating.value = true;

    // Simulate some processing time
    setTimeout(() => {
        try {
            // Extract component details
            const componentName = extractComponentName(props.code);
            const propsData = extractProps(props.code);
            const eventsData = extractEvents(props.code);
            const usageExample = generateUsageExample(componentName, propsData, eventsData);

            // Create documentation object
            documentation.value = {
                componentName,
                description: props.description || 'No description provided',
                props: propsData,
                events: eventsData,
                usageExample
            };

            emit('documentation-generated', documentation.value);

            $q.notify({
                type: 'positive',
                message: 'Documentation generated successfully',
                position: 'top'
            });
        } catch (error) {
            console.error('Documentation generation error:', error);
            $q.notify({
                type: 'negative',
                message: 'Failed to generate documentation',
                position: 'top'
            });
        } finally {
            isGenerating.value = false;
        }
    }, 800);
};

// Copy documentation to clipboard
const copyToClipboard = () => {
    if (!documentation.value) return;

    const docText = `
  # ${documentation.value.componentName}
  
  ${documentation.value.description}
  
  ## Props
  
  ${Object.entries(documentation.value.props).map(([name, prop]) =>
        `- **${name}** (${prop.type})${prop.required ? ' - Required' : ''}${prop.default !== undefined ? ` - Default: ${prop.default}` : ''}`
    ).join('\n')}
  
  ## Events
  
  ${documentation.value.events.map(event =>
        `- **${event.name}**${event.payload !== 'None' ? ` - Payload: ${event.payload}` : ''}`
    ).join('\n')}
  
  ## Usage Example
  
  \`\`\`vue
  ${documentation.value.usageExample}
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
