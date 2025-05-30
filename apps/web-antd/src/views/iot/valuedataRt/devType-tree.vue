<script setup lang="ts">
import type {PropType} from 'vue';
import {onMounted, ref} from 'vue';

import type {DevTypeTree} from './dataStat';
import {Empty, Skeleton, Tree} from 'ant-design-vue';

defineOptions({ inheritAttrs: false });

withDefaults(defineProps<{ showSearch?: boolean }>(), { showSearch: true });

const emit = defineEmits<{
  reload: [];
  select: [];

}>();

const selectDevTypeId = defineModel('selectDevTypeId', {
  required: true,
  type: Array as PropType<number[]>,
});

const searchValue = defineModel('searchValue', {
  type: String,
  default: '',
});

/** 部门数据源 */
type DevTypeTreeArray = DevTypeTree[];
const devTypeTreeArray = ref<DevTypeTreeArray>([]);
/** 骨架屏加载 */
const showTreeSkeleton = ref<boolean>(true);

function getDevTypeTree(){
  return [{
    "id": 100,
    "parentId": 0,
    "label": "所有设备类型",
    "weight": 0,
    "disabled": false,
    "children": [
      {	"id": 1, "parentId": 100, "label": "电动执行器","weight": 1,	"disabled": false,},
      {	"id": 2, "parentId": 100, "label": "热量表",	"weight": 2,"disabled": false,},
      {	"id": 3, "parentId": 100, "label": "采集箱",	"weight": 2,"disabled": false,},
      {	"id": 4, "parentId": 100, "label": "室温采集器",	"weight": 2,"disabled": false,},
      {	"id": 5, "parentId": 100, "label": "阀门设备",	"weight": 2,"disabled": false,},
      {	"id": 6, "parentId": 100, "label": "压差设备",	"weight": 2,"disabled": false,},
      {	"id": 0, "parentId": 100, "label": "未知设备",	"weight": 2,"disabled": false,},
    ]
  }];
}

async function loadTree() {
  showTreeSkeleton.value = true;
  searchValue.value = '';
  selectDevTypeId.value = [];
  const ret = getDevTypeTree();
  devTypeTreeArray.value = ret;
  showTreeSkeleton.value = false;
}

onMounted(loadTree);
</script>

<template>
  <div :class="$attrs.class">
    <Skeleton
      :loading="showTreeSkeleton"
      :paragraph="{ rows: 8 }"
      active
      class="p-[8px]"
    >
      <div
        class="bg-background flex h-full flex-col overflow-y-auto rounded-lg"
      >
        <div class="h-full overflow-x-hidden px-[8px]">
          <div style="height:20px;"></div>
          <Tree
            v-bind="$attrs"
            v-if="devTypeTreeArray.length > 0"
            v-model:selected-keys="selectDevTypeId"
            :class="$attrs.class"
            :field-names="{ title: 'label', key: 'id' }"
            :show-line="{ showLeafIcon: false }"
            :tree-data="devTypeTreeArray"
            :virtual="false"
            default-expand-all
            @select="$emit('select')"
          >
            <template #title="{ label }">
              <span v-if="label.indexOf(searchValue) > -1">
                {{ label.substring(0, label.indexOf(searchValue)) }}
                <span style="color: #f50">{{ searchValue }}</span>
                {{
                  label.substring(
                    label.indexOf(searchValue) + searchValue.length,
                  )
                }}
              </span>
              <span v-else>{{ label }}</span>
            </template>
          </Tree>
        </div>
      </div>
    </Skeleton>
  </div>
</template>
