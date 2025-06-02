<script setup lang="ts">
import type { AreaForm, AreaVO } from '#/api/hms/area/model';

// const props = defineProps({
//   areaId: {
//     type: Number,
//     require: false,
//   },
// });
import { onMounted, reactive, ref, watch } from 'vue';

import { areaAddNoMsg, areaList } from '#/api/hms/area';

interface FormState {
  areaId: any;
  buildStart: number;
  buildEnd: number;
  needBuild: boolean; // 是否需要楼号
  buildEndWidth: string;
  hasUnit: boolean;
  unitStart: 1;
  unitEnd: 1;
  floorStart: number;
  floorEnd: number;
  roomNumber: number;
  hasRoom: boolean;
  roomNumberResetByUnit: boolean; // 户号 连续还是根据单元重新排序
  unitEndWidth: string;
}
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update']);
const showMe = ref(props.open);
const handlerClose = () => {
  emit('update', showMe.value);
};
watch(
  () => props.open,
  (newVal) => {
    showMe.value = newVal;
  },
);
const formData: FormState = reactive({
  areaId: 0,
  buildStart: 1,
  buildEnd: 1,
  needBuild: true, // 是否需要楼号
  buildEndWidth: '#',
  hasUnit: true,
  unitStart: 1,
  unitEnd: 1,
  hasRoom: true,
  floorStart: 1,
  floorEnd: 1,
  roomNumber: 1,
  roomNumberResetByUnit: false, // 户号 连续还是根据单元重新排序
  unitEndWidth: '单元',
});
const onSubmit = () => {
  console.log('submit!', formData);
  if (formData.needBuild) {
    buildTotalNumber.value = formData.buildEnd - formData.buildStart + 1;
    successBuildTotalNumber.value = 0;
  }
  if (formData.hasUnit) {
    unitTotalNumber.value =
      buildTotalNumber.value * (formData.unitEnd - formData.unitStart + 1);
    successUnitTotalNumber.value = 0;
  }
  if (formData.hasRoom) {
    roomTotalNumber.value =
      unitTotalNumber.value *
      (formData.roomNumber * (formData.floorEnd - formData.floorStart + 1));
    successRoomTotalNumber.value = 0;
  }
  openResult.value = true;
  parseBuild();
};
const areaData = ref([]);
const getArea = (val: any) => {
  if (val === undefined) {
    val = '';
  }
  areaList({
    name: val,
    pageSize: 999_999,
    category: 'area',
  }).then((res) => {
    const d = [];
    for (const re of res.rows) {
      d.push({ label: `${re.name}`, value: re.id });
    }
    areaData.value = d;
  });
};
// mounted(() => {});
onMounted(() => {
  getArea('');
});
const buildTotalNumber = ref(0);
const unitTotalNumber = ref(0);
const roomTotalNumber = ref(0);
const successBuildTotalNumber = ref(0);
const successUnitTotalNumber = ref(0);
const successRoomTotalNumber = ref(0);
function PrefixInteger(num: number, length: number) {
  return (Array.from({ length }).join('0') + num).slice(-length);
}
const openResult = ref(false);
const labelCol = { style: { width: '100px' } };
const wrapperCol = { span: 12 };
async function parseBuild() {
  for (let i = formData.buildStart; i <= formData.buildEnd; i++) {
    const area: AreaForm = {
      name: i + formData.buildEndWidth,
      category: 'build',
      parentId: formData.areaId,
    };

    const res = await createArea(area);
    successBuildTotalNumber.value += 1;
    await createUnit(res);
  }
}
async function createArea(area: AreaForm): any {
  let data: any;
  await areaAddNoMsg(area).then((res) => {
    data = res;
  });
  return data;
}
async function createUnit(build: AreaVO) {
  console.log(build, '222');
  if (formData.hasUnit) {
    for (let j = formData.unitStart; j <= formData.unitEnd; j++) {
      const areaUnit: AreaForm = {
        name: j + formData.unitEndWidth,
        category: 'unit',
        parentId: build.id,
        unitNumber: j,
      };
      const res = await createArea(areaUnit);
      successUnitTotalNumber.value += 1;
      await createRoom(res, j);
    }
  }
}
async function createRoom(unit: AreaVO, j: number) {
  if (formData.hasRoom) {
    for (let k = formData.floorStart; k <= formData.floorEnd; k++) {
      for (let l = 1; l <= formData.roomNumber; l++) {
        const roomName =
          k +
          PrefixInteger(
            l +
              (formData.roomNumberResetByUnit
                ? 0
                : formData.roomNumber * (j - 1)),
            2,
          );
        const areaRoom = {
          name: roomName,
          category: 'room',
          parentId: unit.id,
          roomFloorNumber: k,
        };
        await createArea(areaRoom);
        successRoomTotalNumber.value += 1;
      }
    }
  }
}
</script>

<template>
  <a-modal v-model:open="showMe" @change="handlerClose">
    <a-form :model="formData" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="12" />
        <a-col class="gutter-row" :span="24">
          <a-form-item label="小区">
            <a-select
              v-model:value="formData.areaId"
              show-search
              :options="areaData"
              :filter-option="false"
              @search="getArea"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="12">
          <a-form-item label="楼号开始">
            <a-input-number
              :min="0"
              :step="1"
              v-model:value="formData.buildStart"
            />
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-form-item label="楼号结束">
            <a-input-number
              :max="999"
              :step="1"
              v-model:value="formData.buildEnd"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="12">
          <a-form-item label="是否包含单元">
            <a-switch v-model:checked="formData.hasUnit" />
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-form-item label="单元称谓">
            <a-radio-group v-model:value="formData.unitEndWidth">
              <a-radio-button value="单元" name="unitEndWidth">
                单元
              </a-radio-button>
              <a-radio-button value="门" name="unitEndWidth">门</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="12">
          <a-form-item label="单元开始">
            <a-input-number :step="1" v-model:value="formData.unitStart" />
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-form-item label="单元结束">
            <a-input-number :step="1" v-model:value="formData.unitEnd" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="12">
          <a-form-item label="楼层开始">
            <a-input-number :step="1" v-model:value="formData.floorStart" />
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-form-item label="楼层结束">
            <a-input-number :step="1" v-model:value="formData.floorEnd" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="12">
          <a-form-item label="每层户数">
            <a-input-number :step="1" v-model:value="formData.roomNumber" />
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-form-item label="户号是否单元独立编号">
            <a-switch v-model:checked="formData.roomNumberResetByUnit" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col>
          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="onSubmit">开始</a-button>
            <a-button style="margin-left: 10px">取消</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-modal v-model:open="openResult" title="小区数据建模">
      <p>
        构建总楼栋 {{ buildTotalNumber }} 已完成 {{ successBuildTotalNumber }}
      </p>
      <p>
        构建总单元数 {{ unitTotalNumber }} 已完成 {{ successUnitTotalNumber }}
      </p>
      <p>
        构建得总户数 {{ roomTotalNumber }} 已完成 {{ successRoomTotalNumber }}
      </p>
    </a-modal>
  </a-modal>
</template>

<style scoped lang="scss"></style>
