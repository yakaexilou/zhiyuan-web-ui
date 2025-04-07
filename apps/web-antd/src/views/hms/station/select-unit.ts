import { ref } from 'vue';

export interface selectProps {
  /**
   * 名称
   */
  queryName: string;
  listApi: any;
  fieldName: string;
  formApi: any;
}

export async function setupStationQuerySelect(opts: selectProps) {
  const options = ref();

  async function fetch(val: string) {
    const stationListMap = await opts.listApi({ name: val });
    options.value = stationListMap.rows.map((item) => ({
      label: `${item.name}[${item.code}]`,
      value: item.id,
    }));
  }
  await fetch('');
  opts.formApi.updateSchema([
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
      fieldName: `${opts.fieldName}`,
    },
  ]);
}
