<script setup lang="ts">
import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep } from '@vben/utils';

import { useVbenForm } from '#/adapter/form';
import { exchangeAdd, exchangeInfo, exchangeUpdate } from '#/api/hms/exchange';
import { stationList } from '#/api/hms/station';

import { drawerSchema } from './data';
// import {tenantInfo} from "#/api/system/tenant";

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
    labelWidth: 120,
    // 通用配置项 会影响到所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  schema: drawerSchema(),
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2',
});
async function setupStationSelect() {
  const options = ref();
  async function fetch(val: string) {
    const stationListMap = await stationList({ name: val });
    options.value = stationListMap.rows.map((item) => ({
      label: `${item.name}[${item.code}]`,
      value: item.id,
    }));
  }
  await fetch('');
  formApi.updateSchema([
    {
      componentProps: {
        optionFilterProp: 'label',
        optionLabelProp: 'label',
        options,
        showSearch: true,
        onSearch: async (val: string) => {
          await fetch(val);
        },
      },
      fieldName: 'stationId',
    },
  ]);
}
const [BasicDrawer, drawerApi] = useVbenDrawer({
  // 在这里更改宽度
  class: 'w-[550px]',
  // 点击遮罩是否关闭
  closeOnClickModal: false,
  onCancel: handleCancel,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) {
      return null;
    }
    drawerApi.drawerLoading(true);

    const { id } = drawerApi.getData() as { id?: number | string };
    isUpdate.value = !!id;
    // 初始化
    await setupStationSelect();
    // if (isUpdate.value && id) {
    //   const record = await tenantInfo(id);
    //   await formApi.setValues(record);
    // }
    // formApi.updateSchema([
    //   {
    //     fieldName: 'packageId',
    //     componentProps: {
    //       disabled: isUpdate.value,
    //     },
    //   },
    // ]);
    if (isUpdate.value && id) {
      const record = await exchangeInfo(id);
      await formApi.setValues(record);
    }
    formApi.updateSchema([
      {
        fieldName: 'stationId',
        componentProps: {},
      },
    ]);
    drawerApi.drawerLoading(false);
  },
});

async function handleConfirm() {
  try {
    drawerApi.drawerLoading(true);
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    // getValues获取为一个readonly的对象 需要修改必须先深拷贝一次
    const data = cloneDeep(await formApi.getValues());
    await (isUpdate.value ? exchangeUpdate(data) : exchangeAdd(data));
    emit('reload');
    await handleCancel();
  } catch (error) {
    console.error(error);
  } finally {
    drawerApi.drawerLoading(false);
  }
}

async function handleCancel() {
  drawerApi.close();
  await formApi.resetForm();
}
</script>

<template>
  <BasicDrawer :title="title">
    <BasicForm />
  </BasicDrawer>
</template>
