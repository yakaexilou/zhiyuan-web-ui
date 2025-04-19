<script setup lang="ts">
import type { Recordable } from '@vben/types';

import { ref } from 'vue';
import { useVbenDrawer } from '@vben/common-ui';
import IotProduct from '../productMetric/index.vue'
const [BasicDrawer, tableDrawerApi] = useVbenDrawer({
  // 在这里更改宽度
  // width: "800px",
  class: 'w-[80%]',
  fullscreenButton: false,
  // 点击遮罩是否关闭
  closeOnClickModal: false,
  // onCancel: handleCancel,
  // onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) {
      return null;
    }
    // tableDrawerApi.drawerLoading(true);

    // const { id } = drawerApi.getData() as { id?: number | string };
    // isUpdate.value = !!id;
    //
    // if (isUpdate.value && id) {
    //   const record = await productAttributeInfo(id);
    //   await formApi.setValues(record);
    // }

    // tableDrawerApi.drawerLoading(false);
  },
});

</script>

<template>
<!--  <Page :auto-content-height="true">-->
  <BasicDrawer>
     <IotProduct />
  </BasicDrawer>
<!--  </Page>-->
</template>
