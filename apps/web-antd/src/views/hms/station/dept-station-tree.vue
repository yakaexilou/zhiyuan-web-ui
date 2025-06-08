<script setup lang="ts">
import type { PropType } from 'vue';

// import type { DeptTree } from '#/api/system/user/model';
import type { DeptStationVo } from '#/api/hms/station/model';

import { onMounted, ref } from 'vue';

import { SyncOutlined } from '@ant-design/icons-vue';
import { Empty, InputSearch, Skeleton, Tree } from 'ant-design-vue';

import { areaList } from '#/api/hms/area';
import { getDeptStationTree, stationList } from '#/api/hms/station';

defineOptions({ inheritAttrs: false });

withDefaults(defineProps<{ showSearch?: boolean }>(), { showSearch: true });

const emit = defineEmits(['reload', 'select']);
//   /**
//    * 点击刷新按钮的事件
//    */
//   reload: [];
//   /**
//    * 点击节点的事件
//    */
//   select: [];
// ;

const selectDeptId = defineModel('selectDeptId', {
  required: false,
  type: Array as PropType<string[]>,
});

const searchValue = defineModel('searchValue', {
  type: String,
  default: '',
});

/** 部门数据源 */
type DeptTreeArray = DeptStationVo[];
const deptTreeArray = ref<DeptTreeArray>([]);
/** 骨架屏加载 */
const showTreeSkeleton = ref<boolean>(true);

async function loadTree() {
  showTreeSkeleton.value = true;
  searchValue.value = '';
  selectDeptId.value = [];

  deptTreeArray.value = await getDeptStationTree();
  showTreeSkeleton.value = false;
}

async function handleReload() {
  await loadTree();
  emit('reload');
}

onMounted(loadTree);
function handleTreeSelect(k: any, e: any) {
  emit('select', k, e);
}
function getTreeData(treeNode: any) {
  return new Promise<void>((resolve) => {
    if (treeNode.nodeType === undefined) {
      resolve();
    }
    if (treeNode.nodeType === 'dept') {
      stationList({ deptId: treeNode.id, pageSize: 999_999 }).then((res) => {
        if (res.total > 0) {
          treeNode.dataRef.children = [];
          for (const re of res.rows) {
            treeNode.dataRef.children.push({
              id: `station-${re.id}`,
              label: re.name,
              nodeType: 'station',
            });
          }
        }
        // treeNode.dataRef.children = res.rows;
        resolve();
      });
    }
    if (treeNode.nodeType === 'station') {
      areaList({
        stationId: treeNode.id.split('-')[1],
        pageSize: 999_999,
        category: 'area',
      }).then((res) => {
        if (res.total > 0) {
          treeNode.dataRef.children = [];
          for (const re of res.rows) {
            treeNode.dataRef.children.push({
              id: `area-${re.id}`,
              label: re.name,
              nodeType: 'area',
              fullAddress: re.fullAddress,
              idSeq: re.idSeq,
            });
          }
        }
        // treeNode.dataRef.children = res.rows;
        resolve();
      });
    }
    if (
      treeNode.nodeType === 'area' ||
      treeNode.nodeType === 'build' ||
      treeNode.nodeType === 'unit'
    ) {
      areaList({
        parentId: treeNode.id.split('-')[1],
        pageSize: 999_999,
        isAsc: 'asc',
        orderByColumn: 'name',
      }).then((res) => {
        if (res.total > 0) {
          treeNode.dataRef.children = [];
          for (const re of res.rows) {
            treeNode.dataRef.children.push({
              id: `${re.category}-${re.id}`,
              label: re.name,
              nodeType: re.category,
              fullAddress: re.fullAddress,
              idSeq: re.idSeq,
              isLeaf: re.category === 'room',
            });
          }
        }
        // treeNode.dataRef.children = res.rows;
        resolve();
      });
    }
    if (treeNode.nodeType === 'build-1') {
      console.log('area-1');
    }
    // setTimeout(() => {
    //   treeNode.dataRef.children = [
    //     { id: `${treeNode.eventKey}-0`, label: '12lablel', nodeType: 'station', isLeaf: false },
    //   ];
    // deptTreeArray.value = [...deptTreeArray.value];
    // resolve();
    // }, 1000);
  });
}
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
        <!-- 固定在顶部 必须加上bg-background背景色 否则会产生'穿透'效果 -->
        <div
          v-if="showSearch"
          class="bg-background z-100 sticky left-0 top-0 p-[8px]"
        >
          <InputSearch
            v-model:value="searchValue"
            :placeholder="$t('pages.common.search')"
            size="small"
          >
            <template #enterButton>
              <a-button @click="handleReload">
                <SyncOutlined class="text-primary" />
              </a-button>
            </template>
          </InputSearch>
        </div>
        <div class="h-full overflow-x-hidden px-[8px]">
          <Tree
            v-bind="$attrs"
            v-if="deptTreeArray.length > 0"
            v-model:selected-keys="selectDeptId"
            :class="$attrs.class"
            :field-names="{ title: 'label', key: 'id' }"
            :show-line="{ showLeafIcon: false }"
            :tree-data="deptTreeArray"
            :virtual="false"
            :load-data="getTreeData"
            @select="handleTreeSelect"
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
          <!-- 仅本人数据权限 可以考虑直接不显示 -->
          <div v-else class="mt-5">
            <Empty
              :image="Empty.PRESENTED_IMAGE_SIMPLE"
              description="无部门数据"
            />
          </div>
        </div>
      </div>
    </Skeleton>
  </div>
</template>
