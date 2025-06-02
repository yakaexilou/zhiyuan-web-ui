<script setup lang="ts">
// import type { VbenFormProps } from '@vben/common-ui';
//
// import type { VxeGridProps } from '#/adapter/vxe-table';
// import type { AreaForm } from '#/api/hms/area/model';

import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import HmsDevice from '#/views/hms/device/hms-device.vue';
import DeptStationTree from '#/views/hms/station/dept-station-tree.vue';

// 左边部门用
const selectDeptStation = ref();
const selectTreeId = ref();

const currentComponent = ref('dept');
async function deptSelect(k, { node }) {
  selectDeptStation.value = node;
  currentComponent.value = node.nodeType;
}

</script>

<template>
  <Page :auto-content-height="true">
    <div class="flex h-full gap-[8px]">
      <DeptStationTree
        v-model:select-dept-id="selectTreeId"
        class="w-[260px]"
        @select="deptSelect"
      />
      <HmsDevice :select-dept-station="selectDeptStation" />
    </div>
  </Page>
</template>
