<script setup lang="ts">
import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep } from '@vben/utils';

import { useVbenForm } from '#/adapter/form';
import { valvedataAdd,  valvedataUpdate } from '#/api/iot/valvedata';

import {drawerSchema, drawerSchema1, drawerSchema2, drawerSchema3, drawerSchema4, drawerSchema5, drawerSchema6} from './dataStat';

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
  fullscreenButton: false,
  // 点击遮罩是否关闭
  closeOnClickModal: false,
  onCancel: handleCancel,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) {
      return null;
    }
    drawerApi.drawerLoading(true);
    const datas = drawerApi.getData() ;
    const devTypeVal = datas["devType"];
    addEditAtts( devTypeVal );
    const snval = datas["sn"];
    if(snval!=null ){
      formApi.setFieldValue('sn', snval );
    }
    drawerApi.drawerLoading(false);
  },
});


function addEditAtts( devType: number) {
  if(devType==-1)formApi.setState({ schema: drawerSchema() });
  if(devType==1)formApi.setState({ schema: drawerSchema1() });
  if(devType==2)formApi.setState({ schema: drawerSchema2() });
  if(devType==3)formApi.setState({ schema: drawerSchema3() });
  if(devType==4)formApi.setState({ schema: drawerSchema4() });
  if(devType==5)formApi.setState({ schema: drawerSchema5() });
  if(devType==6)formApi.setState({ schema: drawerSchema6() });
}

async function handleConfirm() {
  try {
    drawerApi.drawerLoading(true);
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    // getValues获取为一个readonly的对象 需要修改必须先深拷贝一次
    const data = cloneDeep(await formApi.getValues());
    await (isUpdate.value ? valvedataUpdate(data) : valvedataAdd(data));
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

