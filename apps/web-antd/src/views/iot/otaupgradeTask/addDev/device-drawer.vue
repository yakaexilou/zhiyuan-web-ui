<script setup lang="ts">
import {useVbenDrawer} from '@vben/common-ui';

import {useVbenForm} from '#/adapter/form';

import {drawerSchema} from './data';

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
  schema: drawerSchema(),
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2',
});
const [BasicDrawer, drawerApi] = useVbenDrawer();
</script>
