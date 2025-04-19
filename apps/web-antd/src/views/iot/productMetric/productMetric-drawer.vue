<script setup lang="ts">
import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep } from '@vben/utils';

import { useVbenForm } from '#/adapter/form';
import { productMetricAdd, productMetricInfo, productMetricUpdate } from '#/api/iot/productMetric';

import { drawerSchema } from './data';

import { defineProps, watch } from 'vue';

import {
  getDirverAttValues,
  getDriverAtts, getDriverNewSchema,
  getDriverSchema,
} from "#/api/iot/util";


const props = defineProps({
  productId: {
    type: Number,
    default: 0,
  },
  driverId: {
    type: Number,
    default: 0,
  },
})

watch(() => props.productId, (val) => {
  console.log(val, "props.productId")
})
watch(() => props.driverId, (val) => {
  console.log(val, "props.driverId")
})


const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const isAdd = ref(false);


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
  schema: drawerSchema() ,
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2',
});

function addEditAtts(driverId ,driverAttribute ) {
  getDriverAtts( driverId ).then((attData)=>{
          formApi.setState((prev) => {
            const currentSchema = prev?.schema ?? [];
            const newSchema = [];
            attData.forEach(item=>{
              let schema = getDriverSchema(item) ;
              newSchema.push(schema);
            });
            const ns = getDriverNewSchema(currentSchema ,newSchema ,driverAttribute ) ;
            return {
              schema: ns ,
            };
          })
        }
      );
}

const [BasicDrawer, drawerApi] = useVbenDrawer({
  // 在这里更改宽度
  class: 'w-[650px]',
  fullscreenButton: false,
  // 点击遮罩是否关闭
  closeOnClickModal: false,
  onCancel: handleCancel,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) {
      return null;
    }
    drawerApi.drawerLoading(false);
    const { id } = drawerApi.getData() as { id?: number | string };
    isUpdate.value = !!id;

    let driverAttribute = "";
    if (isUpdate.value && id) {
      const record = await productMetricInfo(id);
      await formApi.setValues(record);
      console.log("== ==  record data : "+  JSON.stringify( record )  );
      driverAttribute = record["driverAttribute"];
    }
    const{ productId} = drawerApi.getData() as { productId?:number | string };
    addEditAtts(props.driverId , driverAttribute );
    const driAttValuses = getDirverAttValues( driverAttribute )
    if(driAttValuses!=null){
      for( let key in driAttValuses ){
        formApi.setFieldValue(key , driAttValuses[key] );
      }
    }
    isAdd.value = !!productId;
    if(isAdd.value && productId ){
      formApi.setFieldValue('productId', productId);
    }
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
    if(true){
      const driverAttribute = {};
      for( let key in data ){
        if(key.indexOf("d_a_")==0){
          const value = data[key];
          const nkey = key.substring(4);
          driverAttribute[nkey] = value ;
        }
      }
      for( let key in driverAttribute ){
        const k = "d_a_"+key ;
        delete data[k];
      }
      data["driverAttribute"] = JSON.stringify(driverAttribute);
    }
    await (isUpdate.value ? productMetricUpdate(data) : productMetricAdd(data));
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

