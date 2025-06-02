<script setup lang="ts">
import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep } from '@vben/utils';

import { useVbenForm } from '#/adapter/form';
import { areaList } from '#/api/hms/area/index.ts';
import {
  hmsDeviceAdd,
  hmsDeviceInfo,
  hmsDeviceUpdate,
} from '#/api/hms/hmsDevice/index.ts';

import { modalSchema } from './data';
import {getGatewaySelect, getProductSelect} from "#/api/iot/util";

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
    },
  },
  schema: modalSchema(),
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2',
});
const setUpStation = async ({ area, station }) => {
  const options = ref();
  async function fetch(val: string) {
    const stationListMap = await areaList({
      name: val,
      pageSize: 20,
      orderByColumn: 'fullAddress',
      idSeq: area?.idSeq,
    });
    options.value = stationListMap.rows.map((item) => ({
      label: `${item.fullAddress}[${item.code}]`,
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
      fieldName: 'areaId',
    },
  ]);
};
async function setProductSelectList() {
  formApi.updateSchema(getProductSelect('productId', 1, 50));
}
async function setGatewaySelectList() {
  formApi.updateSchema(getGatewaySelect('gatewayId', 1, 50));
}
const [BasicModal, modalApi] = useVbenModal({
  // 在这里更改宽度
  class: 'w-[550px]',
  fullscreenButton: false,
  // 点击遮罩是否关闭
  closeOnClickModal: false,
  onCancel: handleCancel,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) {
      return null;
    }
    modalApi.modalLoading(true);

    const { id, area, station } = modalApi.getData() as {
      area?: object;
      id?: number | string;
      station?: object;
    };
    isUpdate.value = !!id;
    await setUpStation({ area, station });
    setProductSelectList();
    setGatewaySelectList();
    if (isUpdate.value && id) {
      const record = await hmsDeviceInfo(id);
      await formApi.setValues(record);
    }
    modalApi.modalLoading(false);
  },
});

async function handleConfirm() {
  try {
    modalApi.modalLoading(true);
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    // getValues获取为一个readonly的对象 需要修改必须先深拷贝一次
    const data = cloneDeep(await formApi.getValues());
    await (isUpdate.value ? hmsDeviceUpdate(data) : hmsDeviceAdd(data));
    emit('reload');
    await handleCancel();
  } catch (error) {
    console.error(error);
  } finally {
    modalApi.modalLoading(false);
  }
}

async function handleCancel() {
  modalApi.close();
  await formApi.resetForm();
}
</script>

<template>
  <BasicModal :title="title">
    <BasicForm />
  </BasicModal>
</template>
