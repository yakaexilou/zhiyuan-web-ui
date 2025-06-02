<script>
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const buildingUnits = ref(2);
    const floorNumber = ref(8);
    const householdsPerUnit = ref(8);
    const calculationError = ref(false);

    // 计算每层户数（带校验）
    const householdsPerFloor = computed(() => {
      if (householdsPerUnit.value % floorNumber.value !== 0) {
        calculationError.value = true;
        return 0;
      }
      calculationError.value = false;
      return householdsPerUnit.value / floorNumber.value;
    });

    // 模型数据
    const units = computed(() => new Array(buildingUnits.value).fill(null));
    const floors = computed(() => new Array(floorNumber.value).fill(null));
    const households = computed(() =>
      new Array(householdsPerFloor.value).fill(null),
    );

    // 样式计算
    const unitWidth = computed(() => `${100 / buildingUnits.value}%`);
    const houseStyle = computed(() => ({
      width: `calc(${100 / householdsPerFloor.value}% - 2px)`,
      margin: '0 1px',
    }));

    // 模型高度动态计算
    const modelHeight = computed(() => {
      const baseHeight = 500; // 基础高度
      const floorHeight = 40; // 单层高度
      return `${Math.min(baseHeight, floorNumber.value * floorHeight + 40)}px`;
    });

    const refreshModel = () => {
      // 强制更新计算属性
      householdsPerFloor.value;
    };

    return {
      buildingUnits,
      floorNumber,
      householdsPerUnit,
      units,
      floors,
      households,
      unitWidth,
      houseStyle,
      modelHeight,
      calculationError,
      refreshModel,
    };
  },
});
</script>

<template>
  <div class="building-editor">
    <a-form
      layout="horizontal"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="单元数量">
        <a-input-number
          v-model:value="buildingUnits"
          :min="1"
          :max="4"
          @change="refreshModel"
        />
      </a-form-item>

      <a-form-item label="楼层数量">
        <a-input-number
          v-model:value="floorNumber"
          :min="1"
          :max="20"
          @change="refreshModel"
        />
      </a-form-item>

      <a-form-item label="每单元户数">
        <a-input-number
          v-model:value="householdsPerUnit"
          :min="floorNumber"
          :max="floorNumber * 10"
          :step="floorNumber"
          @change="refreshModel"
        />
      </a-form-item>
    </a-form>

    <div class="building-model" :style="{ height: modelHeight }">
      <div
        v-for="(unit, index) in units"
        :key="index"
        class="building-unit"
        :style="{ width: unitWidth }"
      >
        <div
          v-for="(floor, fIndex) in floors"
          :key="fIndex"
          class="building-floor"
        >
          <div
            v-for="(house, hIndex) in households"
            :key="hIndex"
            class="household"
            :style="houseStyle"
          ></div>
        </div>
      </div>
    </div>

    <div v-if="calculationError" class="error-message">
      错误：每单元户数必须是楼层数的整数倍（当前组合无法整除）
    </div>
  </div>
</template>

<style scoped>
.building-editor {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.building-model {
  display: flex;
  background-color: #f5f5f5;
  padding: 20px;
  border: 1px solid #ddd;
  margin-top: 20px;
  overflow-y: auto;
}

.building-unit {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 0 5px;
  background-color: #fff;
  border: 1px solid #ccc;
}

.building-floor {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  min-height: 40px;
  padding: 4px 0;
  border-bottom: 1px solid #eee;
  background-color: #fafafa;
}

.household {
  height: 24px;
  background-color: #1890ff;
  border-radius: 2px;
  margin: 2px 0;
}

.error-message {
  color: #ff4d4f;
  margin-top: 10px;
  text-align: center;
}

.ant-form-item {
  margin-bottom: 16px;
}

.ant-input-number {
  width: 160px;
}
</style>
