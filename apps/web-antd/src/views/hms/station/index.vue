<script setup lang="ts">
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { TabPane, Tabs } from 'ant-design-vue';

import HmsExchange from '../exchange/index.vue';
import HmsStation from './station.vue';
// 默认加载的组件名
const compName = ref('HmsStation');
// const hmsStationRef = useTemplateRef('hmsStationRef');
// const hmsExchangeRef = useTemplateRef('hmsExchangeRef');

// onUnmounted(() => emitter.off('rowClick'));
</script>

<template>
  <Page :auto-content-height="true" class="w-full">
    <Tabs
      v-model:key="compName"
      size="middle"
      :body-style="{ padding: '0 16px 0 16px ' }"
    >
      <TabPane key="HmsStation" tab="站房基础信息">
        <HmsStation />
      </TabPane>
      <TabPane key="HmsExchange" tab="机组基础信息">
        <HmsExchange />
      </TabPane>
    </Tabs>
  </Page>
</template>
