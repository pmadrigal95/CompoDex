<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-primary text-white">
            <q-toolbar>
                <div class="flex items-center space-x-3">
                    <div
                        class="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-primary font-bold text-xl">
                        Q
                    </div>
                    <h1 class="text-2xl font-semibold">Vue + Quasar Docs</h1>
                </div>

                <q-space />

                <q-tabs>
                    <q-route-tab to="/documentation" label="Documentation" />
                    <q-route-tab to="/components" label="Components" />
                    <q-route-tab to="/about" label="About" />
                </q-tabs>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <q-page padding>
                <div class="q-pa-md">
                    <h2 class="text-h4 q-mb-lg">About Vue + Quasar Documentation Generator</h2>
                    <p class="text-body1 q-mb-lg">
                        This tool helps developers create comprehensive documentation for their Vue 3 components built
                        with Quasar Framework.
                    </p>

                    <h3 class="text-h5 q-mb-md">Features:</h3>
                    <ul class="q-mb-lg">
                        <li class="q-mb-sm">Automatic detection of Quasar components used in your code</li>
                        <li class="q-mb-sm">Analysis of component props and emits</li>
                        <li class="q-mb-sm">Recognition of Composition API usage patterns</li>
                        <li class="q-mb-sm">Customizable documentation templates</li>
                    </ul>

                    <p class="text-body1">
                        &copy; 2023 Vue + Quasar Docs. All rights reserved.
                    </p>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script setup>
// About page
</script>