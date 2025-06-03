<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';

import CmdPanel from '../cmd/index.vue';
import DataPanel from './data/index.vue';

const props = defineProps({
  sn: {
    type: String,
    default: '',
  },
  devType: {
    type: String,
    default: 0,
  },
});

watch(
  () => props.sn,
  (val) => {
    console.log(val, 'props.sn');
  },
);

const activeKey = ref<'cmd' | 'data'>('data');
</script>
<template>
  <a-tabs v-model:active-key="activeKey">
    <a-tab-pane key="data" tab="数据面板" class="custom-page">
      <DataPanel
        v-if="activeKey === 'data'"
        :sn="props.sn"
        :dev-type="props.devType"
      />
    </a-tab-pane>
    <a-tab-pane key="cmd" tab="命令面板" class="custom-page">
      <CmdPanel
        v-if="activeKey === 'cmd'"
        :sn="props.sn"
        :dev-type="props.devType"
      />
    </a-tab-pane>
  </a-tabs>
</template>
<style lang="scss" scoped>
.custom-page {
  height: calc(100vh - 500px);
}
</style>
