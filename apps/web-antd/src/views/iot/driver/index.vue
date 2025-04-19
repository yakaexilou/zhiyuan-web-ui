<script setup lang="ts">
import { onUnmounted } from 'vue';

import { Page } from '@vben/common-ui';

import DriverDataPanel from './data/index.vue';
import { emitt } from './mitt';
import DriverTypePanel from './type/index.vue';

onUnmounted(() => emitt.off('rowClick'));
</script>

<template>
  <Page
    :auto-content-height="true"
    content-class="flex flex-col lg:flex-row gap-4"
  >
    <DriverTypePanel class="flex-1 overflow-hidden" />
    <DriverDataPanel class="flex-1 overflow-hidden" />
  </Page>
</template>
