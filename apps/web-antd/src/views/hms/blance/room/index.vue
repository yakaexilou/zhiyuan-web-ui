<script setup lang="ts">
// import type { VbenFormProps } from '@vben/common-ui';
//
// import type { VxeGridProps } from '#/adapter/vxe-table';
// import type { AreaForm } from '#/api/hms/area/model';

import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import DeptStationTree from '#/views/hms/station/dept-station-tree.vue';

import RoomData from './room-data.vue';
// 左边部门用
const selectDeptStation = ref();
const selectTreeId = ref();

const currentComponent = ref('dept');
async function deptSelect(k: any, { node }) {
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
      <RoomData :select-dept-station="selectDeptStation" />
    </div>
  </Page>
</template>
