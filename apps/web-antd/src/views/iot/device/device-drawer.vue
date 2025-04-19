<script setup lang="ts">
import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep } from '@vben/utils';

import { useVbenForm } from '#/adapter/form';
import { deviceAdd, deviceInfo, deviceUpdate } from '#/api/iot/device';

import { drawerSchema } from './data';
import {
  getAttDefValues,
  getAttNewSchema,
  getAttSchema, getGatewaySelect,
  getProductAtt,
  getProductSelect,
} from "#/api/iot/util";

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
    setProductSelectList();
    setGatewaySelectList();
    const { id } = drawerApi.getData() as { id?: number | string };
    isUpdate.value = !!id;
    let productId = null ;
    let attributes = null ;
    if (isUpdate.value && id) {
      const record = await deviceInfo(id);
      productId = record["productId"] ;
      attributes = record["attributes"] ;
      await formApi.setValues(record);
    }
    addDevAtts( productId , attributes );
    const attDefValues = getAttDefValues( attributes ) ;
    for( let key in attDefValues ){
      formApi.setFieldValue(key , attDefValues[key] );
    }
    drawerApi.drawerLoading(false);
  },
});

function addDevAtts( productId , attributes  ) {
  getProductAtt(productId).then((atts)=>{
    if(atts==null)return ;
    if(atts.total==0)return ;
    formApi.setState((prev) => {
      const currentSchema = prev?.schema ?? [];
      const newSchema = [];
      atts.rows.forEach((att)=>{
        let schema = getAttSchema(att) ;
        if(schema!=null)
        newSchema.push(schema);
      });
      const attDefValues = getAttDefValues( attributes ) ;
      const ns = getAttNewSchema(currentSchema ,newSchema ,attDefValues ) ;
      return { schema: ns };
    })
  });

}

async function setProductSelectList() {
  formApi.updateSchema( getProductSelect( 'productId' , 1,50 ) );
}
async function setGatewaySelectList() {
  formApi.updateSchema( getGatewaySelect( 'gatewayId' , 1,50 ) );
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
    if(true){
      const attributes = [];
      for( let key in data ){
        if(key.indexOf("d_a_")==0){
          const value = data[key];
          const nkey = key.substring(4);
          const kv = { "key":nkey };
          kv[nkey] = value ;
          if(nkey!="test"){
            attributes.push( kv );
          }
        }
      }
      for( let key in attributes ){
        const k = "d_a_"+key ;
        delete data[k];
      }
      data["attributes"] = JSON.stringify(attributes);
    }
    await (isUpdate.value ? deviceUpdate(data) : deviceAdd(data));
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

