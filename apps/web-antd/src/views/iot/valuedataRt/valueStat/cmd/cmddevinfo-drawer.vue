<script setup lang="ts">
import {computed, ref} from 'vue';

import {useVbenDrawer} from '@vben/common-ui';
import {$t} from '@vben/locales';

import {useVbenForm} from '#/adapter/form';
import {cmddevinfoInfo} from '#/api/iot/cmddevinfo';

import {drawerSchema} from './data';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    // 默认占满两列
    formItemClass: 'col-span-2',
    // 默认label宽度 px
    labelWidth: 80,
    // 通用配置项 会影响到所有表单项
    componentProps: {
      class: 'w-full',
    }
  },
  schema: drawerSchema(),
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2',
});

const [BasicDrawer, drawerApi] = useVbenDrawer({
  // 在这里更改宽度
  class: 'w-[550px]',
  // 点击遮罩是否关闭
  closeOnClickModal: false,
  onOpenChange: async (isOpen) => {
    if (!isOpen) {
      return null;
    }
    drawerApi.drawerLoading(true);
    const { id } = drawerApi.getData() as { id?: number | string };
    isUpdate.value = !!id;

    if (isUpdate.value && id) {
      const record = await cmddevinfoInfo(id);
      await formApi.setValues(record);
    }

    drawerApi.drawerLoading(false);
  },
});


</script>

<template>
  <BasicDrawer :title="title">
    <BasicForm />
  </BasicDrawer>
</template>

