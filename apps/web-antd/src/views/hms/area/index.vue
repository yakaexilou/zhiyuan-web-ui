<script setup lang="ts">
// import type { VbenFormProps } from '@vben/common-ui';
//
// import type { VxeGridProps } from '#/adapter/vxe-table';
// import type { AreaForm } from '#/api/hms/area/model';

import { ref } from 'vue';

import { Page } from '@vben/common-ui';

// import { setupStationQuerySelect } from '#/views/hms/station/select-unit';
// import { Modal, Popconfirm, Space } from 'ant-design-vue';
// import { useVbenVxeGrid, vxeCheckboxChecked } from '#/adapter/vxe-table';
// import { areaExport, areaList, areaRemove } from '#/api/hms/area';
// import { stationList } from '#/api/hms/station';
// import { commonDownloadExcel } from '#/utils/file/download';
// import BuildModelModal from '#/views/hms/area/build-model-modal.vue';
import DeptStationTree from '#/views/hms/station/dept-station-tree.vue';

import AreaIndex from './area-index.vue';
// import areaDrawer from './area-drawer.vue';
// import { columns, querySchema } from './data';

// 左边部门用
const selectDeptStation = ref();
const selectTreeId = ref();

// console.log(tableApi.formApi);
// setupStationQuerySelect({
//   listApi: stationList,
//   fieldName: 'stationId',
//   queryName: 'name',
//   formApi: tableApi.formApi,
// });
// const { hasAccessByCodes } = useAccess();
const currentComponent = ref('dept');
async function deptSelect(k, { node }) {
  selectDeptStation.value = node;
  currentComponent.value = node.nodeType;
}
// onMounted(() => {
//   currentComponent = import('./area-index.vue');
// });

// const canAddArea = computed(() => {
//   return selectDeptStation.value
//     ? selectDeptStation.value.nodeType !== 'station'
//     : true;
// });
// const openBuildModelModal = ref(false);
// function handleAddMultipleArea() {
//   openBuildModelModal.value = true;
// }
</script>

<template>
  <Page :auto-content-height="true">
    <div class="flex h-full gap-[8px]">
      <DeptStationTree
        v-model:select-dept-id="selectTreeId"
        class="w-[260px]"
        @select="deptSelect"
      />
      <!--      <AreaIndex :select-dept-station="selectDeptStation" />-->
      <AreaIndex :select-dept-station="selectDeptStation" />
      <!--      v-if="currentComponent === 'station' || currentComponent === 'area'"-->
      <!--      <StationIndex-->
      <!--        v-if="currentComponent === 'dept'"-->
      <!--        :select-dept-station="selectDeptStation"-->
      <!--        class="flex-1 overflow-hidden"-->
      <!--      />-->
      <!--        @reload="() => tableApi.reload()"-->
      <!--      <BasicTable table-title="区域信息列表" class="flex-1 overflow-hidden">-->
      <!--        <template #toolbar-actions>-->
      <!--          <Space>-->
      <!--            <a-button-->
      <!--              v-access:code="['hms:area:add']"-->
      <!--              @click="handleAddMultipleArea"-->
      <!--              type="primary"-->
      <!--              :disabled="canAddArea"-->
      <!--            >-->
      <!--              {{ $t('hms.area.action.addMultipleArea') }}-->
      <!--            </a-button>-->
      <!--          </Space>-->
      <!--        </template>-->
      <!--        <template #toolbar-tools>-->
      <!--          <Space>-->
      <!--            <a-button-->
      <!--              v-access:code="['hms:area:export']"-->
      <!--              @click="handleDownloadExcel"-->
      <!--            >-->
      <!--              {{ $t('pages.common.export') }}-->
      <!--            </a-button>-->
      <!--            <a-button-->
      <!--              :disabled="!vxeCheckboxChecked(tableApi)"-->
      <!--              danger-->
      <!--              type="primary"-->
      <!--              v-access:code="['hms:area:remove']"-->
      <!--              @click="handleMultiDelete"-->
      <!--            >-->
      <!--              {{ $t('pages.common.delete') }}-->
      <!--            </a-button>-->
      <!--            <a-button-->
      <!--              type="primary"-->
      <!--              v-access:code="['hms:area:add']"-->
      <!--              @click="handleAdd"-->
      <!--            >-->
      <!--              {{ $t('pages.common.add') }}-->
      <!--            </a-button>-->
      <!--          </Space>-->
      <!--        </template>-->
      <!--        <template #action="{ row }">-->
      <!--          <Space>-->
      <!--            <ghost-button-->
      <!--              v-access:code="['hms:area:edit']"-->
      <!--              @click.stop="handleEdit(row)"-->
      <!--            >-->
      <!--              {{ $t('pages.common.edit') }}-->
      <!--            </ghost-button>-->
      <!--            <Popconfirm-->
      <!--              :get-popup-container="getVxePopupContainer"-->
      <!--              placement="left"-->
      <!--              title="确认删除？"-->
      <!--              @confirm="handleDelete(row)"-->
      <!--            >-->
      <!--              <ghost-button-->
      <!--                danger-->
      <!--                v-access:code="['hms:area:remove']"-->
      <!--                @click.stop=""-->
      <!--              >-->
      <!--                {{ $t('pages.common.delete') }}-->
      <!--              </ghost-button>-->
      <!--            </Popconfirm>-->
      <!--          </Space>-->
      <!--        </template>-->
      <!--      </BasicTable>-->
      <!--      <AreaDrawer @reload="tableApi.query()" />-->
      <!--      <a-modal v-model:open="openBuildModelModal">-->
      <!--        <BuildModelModal />-->
      <!--      </a-modal>-->
    </div>
  </Page>
</template>
