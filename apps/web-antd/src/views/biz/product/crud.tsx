import type { CreateCrudOptionsRet } from '@fast-crud/fast-crud';

import * as api from './api';

// const unitNameDict = dict({
//   async getData() {
//     const res = await defHttp.get(
//       `/iam/dict/${SysDictCode.QUANTITY_NAME}/list`,
//     );
//     return res;
//   },
// });

export default function crud(): CreateCrudOptionsRet {
  return {
    crudOptions: {
      // table: {
      //   onResizeColumn: (w: number, col: any) => {
      //     // 触发resize事件后，修改column宽度，width只能配置为number类型
      //     // 可以将此方法写在app.use()中的commonOptions里面
      //     // crudBinding.value.table.columnsMap[col.key].width = w;
      //   },
      // },
      request: {
        pageRequest: async (query) => await api.pageList(query),
        addRequest: async ({ form }) => await api.create(form),
        editRequest: async ({ form }) => await api.modify(form),
        delRequest: async ({ row }) => await api.remove(row.id),
      },
      toolbar: {
        columns: {
          unitName: { show: false },
        },
      },
      actionbar: {
        show: true,
        buttons: {},
      },
      rowHandle: {
        width: 270,
        buttons: {},
      },
      columns: {
        // ----------  BEGIN 字段循环遍历  ----------
        id: {
          title: '',
          search: { show: false },
          column: { show: false },

          form: { show: false },
        },
        type: {
          title: '产品类型',
          type: 'text',
          search: { show: true },
          column: { show: true, width: 160 },
          // dict: sysDictFunc(SysDictCode.PRODUCT_TYPE),
          form: {
            component: {
              // showSearch: true,
              // filterOption: (val: any, form: any) => {
              //   return form.label.toLowerCase().includes(val.toLowerCase());
              // },
            },
          },
        },
        name: {
          title: '产品名称',
          type: 'text',
          search: { show: true },
          column: { show: true, width: 160, resizable: true },

          form: {
            // 表单配置
            rules: [{ required: true, message: '请输入产品名称' }],
          },
        },

        model: {
          title: '产品型号',
          type: 'text',
          search: { show: true },
          column: { show: true, width: 160 },

          form: {
            // 表单配置
            rules: [{ required: true, message: '请输入产品型号' }],
          },
        },

        unitPrice: {
          title: '含税单价',
          type: 'number',
          search: { show: false },
          column: {
            show: true,
            width: 160,
            // formatter({ value, row }) {
            //   return `${`￥ ${value}`.replaceAll(
            //     /\B(?=(\d{3})+(?!\d))/g,
            //     ',',
            //   )}/${unitNameDict.dataMap[row.unitName].label}`;
            // },
          },
          form: {
            // 表单配置
            rules: [{ required: true, message: '请输入含税单价' }],
            component: {
              precision: 2,
              formatter: (value: any) =>
                `￥ ${value}`.replaceAll(/\B(?=(\d{3})+(?!\d))/g, ','),
              parser: (value: any) => value.replaceAll(/￥\s?|(,*)/g, ''),
            },
          },
        },
        unitName: {
          title: '计量单位',
          type: 'text',
          search: { show: false },
          // columnSetShow: { show: false },
          column: {
            show: true,
            width: 160,
            // formatter({ value, row }) {
            //   return `${`￥ ${row.unitPrice}`.replaceAll(
            //     /\B(?=(\d{3})+(?!\d))/g,
            //     ',',
            //   )}/${value}`;
            // },
          },
          // dict: sysDictFunc(SysDictCode.QUANTITY_NAME),
          form: {
            component: {
              // showSearch: true,
              // filterOption: (val: any, form: any) => {
              //   return form.label.toLowerCase().includes(val.toLowerCase());
              // },
            },
          },
        },
        description: {
          title: '产品描述',
          type: 'textarea',
          search: { show: false },
          column: { show: true, width: 160 },

          form: {
            // 表单配置
            rules: [{ required: false, message: '请输入产品描述' }],
            col: { span: 24 },
          },
        },
        // ----------  END 字段循环遍历  ----------
      },
    },
  };
}
