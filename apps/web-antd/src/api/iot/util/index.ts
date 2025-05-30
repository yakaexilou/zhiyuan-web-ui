import { requestClient } from '#/api/request';
import { ref } from 'vue';

/**
 * '/iot/driver/list'
 *  url 引用 对象翻页的 list
 * */
export function getDmList( url: string ,  params) {
  return requestClient.get( url , { params } );
}

export async function getProductAtt( productId ){
  let pinfo = { productId:productId , pageNum:1,pageSize:100 }
  return getDataInfo( "/iot/productAttribute/list" , pinfo );
}


export function getGatewaySelect( attName: string , iPageNum: number , iPageSize: number ){
  return updateSelect( "/iot/device/gatewaylist" , attName , iPageNum , iPageSize );
}

export function getProductSelect( attName: string , iPageNum: number , iPageSize: number ){
  return updateSelect( "/iot/product/list" , attName , iPageNum , iPageSize );
}

export function getSnValveSelect( attName: string ){
  return updateSelectSn( "/iot/valvedata/listsn" , attName );
}

export function getSnGatewaySelect( attName: string ){
  return updateSelectSn( "/iot/gatewaydata/listsn" , attName );
}

export function getSnCmdInfoSelect( attName: string ){
  return updateSelectSn( "/iot/cmddevinfo/listsn" , attName );
}


export function updateSelectSn( url: string , attName: string ){
  const options = ref([]);
  fetchSel('');
  async function fetchSel( val:string ){
    let pinfo = { sn:val }
    const dmdata =  await getSnDataInfo( url , pinfo );

    console.log( "dmdata: "+ dmdata );
    const t = [];
    dmdata.forEach((item) => (
      t.push({
        label: item,
        value: item,
      })
    ));
    options.value=t;
  }
  let sel = [
    {
      componentProps: {
        optionFilterProp: 'label',
        optionLabelProp: 'label',
        options,
        showSearch: true,
        onSearch: async (val: string) => {
          await fetchSel(val);
        },
      },
      fieldName: attName ,
    },
  ];
  return sel ;
}

export function updateSelect( url , attName , iPageNum , iPageSize ){
  const options = ref([]);
  fetchSel('');
  async function fetchSel( val:string ){
    let pinfo = { name:val , pageNum:iPageNum,pageSize:iPageSize }
    const dmdata =  await getDataInfo( url , pinfo );
    const t = [];
    dmdata.rows.forEach((item) => (
      t.push({
        label: `${item.name}[${item.id}]`,
        value: item.id,
      })
    ));
    options.value=t;
  }
  let sel = [
    {
      componentProps: {
        optionFilterProp: 'label',
        optionLabelProp: 'label',
        options,
        showSearch: true,
        onSearch: async (val: string) => {
          await fetchSel(val);
        },
      },
      fieldName: attName ,
    },
  ];
  return sel ;
}

export function getDataInfo( url , params ){
  return requestClient.get( url , { params } );
}

export function getSnDataInfo( url , params ){
  return requestClient.get( url , params );
}

export  function getDriverAtts( driverId ) {
  return getDataInfo( "/iot/driver/attsList",  {driverId: driverId });
}



// [{"key":"registerId","name":"registerId","label":"注册包","productId":"6","type":"a-input","registerId":"1"},
// {"key":"period","name":"period","label":"采集周期","productId":"6","type":"a-select","options":[{"value":"value","label":"label","id":1691490667527}],"period":"value"},{"key":"test","name":"test","label":"test","productId":"6","type":"a-input","test":"1"}]
export function getAttDefValues(attributes ){
  if(attributes==null)return {};
  const attVs = {};
  const attJson = JSON.parse( attributes );
  attJson.forEach( (item) =>{
    const name = item["key"];
    const value = item[name];
    attVs["d_a_"+name] = value ;
  });
  return attVs ;
}
export function getAttNewSchema(currentSchema ,newSchema ,attValues ){
  console.log( "==  schema default not value ? sys bug ! " ) ;
  if((newSchema==null)||(newSchema.length==0)) return currentSchema;
  const ns = [] ;
  currentSchema.forEach( (item) =>{
    let fname = item["fieldName"];
    if(fname.indexOf("d_a_")!=0){
      ns.push( item );
    }
  } );
  newSchema.forEach( (item) =>{
    ns.push( item );
  } );
  ns.forEach( (item) =>{
    let fname = item["fieldName"];
    if( attValues.hasOwnProperty(fname ) ){
      const value = attValues[fname];
      item["defaultValue"] = value ;
    }
  } );
  return ns ;
}


export function getAttSchema(item){
  let schema = {};
  let name = item["name"];// ": "funcCode",
  let label = item["label"];// : "功能码",
  let dataType = item["type"];// : "a-select",
  let dataEnum = item["options"];// : "[{\"value\":\"1\",\"label\":\"1区离散量\",\"id\":1703126538013},{\"value\":\"2\",\"label\":\"2区离散量\",\"id\":1703126541193},{\"value\":\"3\",\"label\":\"3区输入寄存器\",\"id\":1703126542009},{\"value\":\"4\",\"label\":\"4区保持寄存器\",\"id\":1703126542662}]",
  let defaultValue = item["attributes"];// : "3",
  let minValue = item["minVal"];// : "0",
  let maxValue = item["maxVal"];// : "0",
  schema["label"] = label ;
  schema["fieldName"] = "d_a_"+name ;
  if((defaultValue!=null)&&(defaultValue.length>0)) {
    schema["defaultValue"] = defaultValue ;
  }
  if(dataType=="a-select"){
    schema["component"] ='Select';
    let componentProps = {};
    componentProps["allowClear"] = false ;
    componentProps["filterOption"] = false ;
    componentProps["showSearch"] = false ;
    componentProps["allowClear"] = true ;
    componentProps["allowClear"] = true ;
    componentProps["options"] =   JSON.parse( dataEnum )  ;
    schema["componentProps"] = componentProps ;
  }else
  if(dataType=="a-input-number"){
    schema["component"] ='Input';
    let ts = '请输入';
    if((maxValue!=null)&&(maxValue!="")) {
      ts += ( " 最大值:"+ maxValue ) ;
    }
    if((minValue!=null)&&(minValue!="")) {
      ts += ( " 最小值:"+ minValue ) ;
    }
    schema["componentProps"] = { "placeholder": ts } ;
  }else
  if(dataType=="a-input"){
    schema["component"] ='Input';
    schema["componentProps"] = { "placeholder": '请输入' } ;
  }else{
    return null ;
  }
  return  schema ;
}

export function getDriverSchema(item){
  let schema = {};
  let name = item["name"];// ": "funcCode",
  let label = item["label"];// : "功能码",
  let dataType = item["dataType"];// : "a-select",
  let dataEnum = item["dataEnum"];// : "[{\"value\":\"1\",\"label\":\"1区离散量\",\"id\":1703126538013},{\"value\":\"2\",\"label\":\"2区离散量\",\"id\":1703126541193},{\"value\":\"3\",\"label\":\"3区输入寄存器\",\"id\":1703126542009},{\"value\":\"4\",\"label\":\"4区保持寄存器\",\"id\":1703126542662}]",
  let defaultValue = item["defaultValue"];// : "3",
  let minValue = item["minValue"];// : "0",
  let maxValue = item["maxValue"];// : "0",
  let orderNumber = item["orderNumber"];// : 0
  schema["label"] = label ;
  schema["fieldName"] = "d_a_"+name ;
  if((defaultValue!=null)&&(defaultValue.length>0)) {
    schema["defaultValue"] = defaultValue ;
  }
  if(dataType=="a-select"){
    schema["component"] ='Select';
    let componentProps = {};
    componentProps["allowClear"] = false ;
    componentProps["filterOption"] = false ;
    componentProps["showSearch"] = false ;
    componentProps["allowClear"] = true ;
    componentProps["allowClear"] = true ;
    componentProps["options"] =   JSON.parse( dataEnum )  ;
    schema["componentProps"] = componentProps ;
  }else
  if(dataType=="a-input-number"){
    schema["component"] ='Input';
    let ts = '请输入';
    if((maxValue!=null)&&(maxValue!="")) {
      ts += ( " 最大值:"+ maxValue ) ;
    }
    if((minValue!=null)&&(minValue!="")) {
      ts += ( " 最小值:"+ minValue ) ;
    }
    schema["componentProps"] = { "placeholder": ts } ;
  }else
  if(dataType=="a-input"){
    schema["component"] ='Input';
    schema["componentProps"] = { "placeholder": '请输入' } ;
  }
  return  schema ;
}

export function getDriverNewSchema(currentSchema ,newSchema ,driverAttribute ){
  if((newSchema==null)||(newSchema.length==0)) return currentSchema;
  let dav = {} ;
  try{
    const tempDa  = JSON.parse( driverAttribute );
    for (let key in tempDa) {
      dav["d_a_"+key] = tempDa[key];
    }
  }catch(e){
    dav = {};
  }
  const ns = [] ;
  currentSchema.forEach( (item) =>{
    let fname = item["fieldName"];
    if(fname.indexOf("d_a_")!=0){
      ns.push( item );
    }
  } );
  newSchema.forEach( (item) =>{
    ns.push( item );
  } );
  ns.forEach( (item) =>{
    let fname = item["fieldName"];
    if( dav.hasOwnProperty(fname ) ){
      const value = dav[fname];
      item["defaultValue"] = value ;
    }
  } );
  return ns ;
}


export function getDirverAttValues( driverAttribute ) {
  let dav = {} ;
  try{
    const tempDa  = JSON.parse( driverAttribute );
    for (let key in tempDa) {
      dav["d_a_"+key] = tempDa[key] ;
    }
  }catch(e){
    dav = {};
  }
  return dav ;
}
