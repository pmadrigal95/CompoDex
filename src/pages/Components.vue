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
                    <h2 class="text-h4 q-mb-lg">Quasar Components</h2>
                    <p class="text-body1 q-mb-md">
                        This page will showcase common Quasar components and their usage.
                    </p>
                    <p class="text-body1">
                        Component library is being developed. Please check back soon!
                    </p>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script setup>
// Components page
</script>