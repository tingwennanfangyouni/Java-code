/*
* 待办任务、待阅任务、待办审批、消息提醒
* */
/*function dbrw_dyrw_dbsp_xxtx(){
    $.ajax({
        url: ctx+"workbench/dbrw_dyrw_dbsp_xxtx",
        type: "POST",
        success: function (data) {
            $("#dbrw").html(data.dbrw);
            $("#dyrw").html(data.dyrw);
            $("#dbsp").html(data.dbsp);
            $("#xxtx").html(data.xxtx);
        },
        error: function () {
            alert("数据查询失败，请联系系统管理员！");
        }
    });
}*/
/*
* 审批流程数据查询
* */
function splcdata(val){
   $("#splctype").val(val);

    var  columns;
   if ($("#splctype").val() == 1 ){

       columns =   [
           {
               title: '序号',
               formatter: function (value, row, index) {
                   return index+1;
               }
           },
           {
               field: 'processName',
               title: '流程名称'
           },

           {
               field : 'status',
               title : '流程状态',

               formatter: function(value, row, index) {
                   if (value=="run"){
                       return "进行中";
                   }else {
                       return "已结束";
                   }
               }
           },
           {
               field : 'startUser',
               title : '发起人',

           },

           {
               field : 'nodeName',
               title : '当前节点',
               formatter:function (value,row,index) {
                   var str=value.replace('审批人：','');
                   return str;
               }

           },

           {
               title: '操作',
               align: 'center',
               formatter: function(value, row, index) {
                   var actions = [];
                   actions.push('<a class="btn btn-success btn-xs " href="#" onclick="approve(\'' + row.id + '\')"><i class="fa fa-edit"></i>审批</a> ');
                   return actions.join('');
               }
           }]
   } else {
       columns =  [
           {
               title: '序号',
               formatter: function (value, row, index) {
                   return index+1;
               }
           },
           {
               field: 'processName',
               title: '流程名称'
           },


           {
               field : 'status',
               title : '流程状态',

               formatter: function(value, row, index) {
                   if (value=="run"){
                       return "进行中";
                   }else {
                       return "已结束";
                   }
               }
           },


           {
               title: '操作',
               align: 'center',
               formatter: function(value, row, index) {
                   var actions = [];
                   actions.push('<a class="btn btn-success btn-xs " href="#" onclick="splcdatachakan(\'' + row.id + '\')"><i class="fa fa-edit"></i>查看</a> ');
                   return actions.join('');
               }
           }]
   }
    var options = {
        url: ctx + "workbench/splcdata",
        data:"splctype="+splctype,
        id:"splcdata",
        queryParams: splctypeParams,
        sortName: "createTime",
        showPageGo:false,
        showToggle:false,
        showColumns:false,
        sortOrder: "desc",
        modalName: "审批流程",
        search:false,
        showSearch:false,
        pageSize:5,
        columns: columns,
    };
    $.table.destroy(options.id);
    $.table.init(options);
}

 function splcdatachakan(id) {

    $.modal.openTab("流程信息", ctx + "system/process/processInstanceInfo/" + id);
}

function approve(id) {
    $.ajax({
        url:ctx + "system/process/checkCountersign/" + id,
        type:"post",
        dataType:"json",
        async:"false",
        success:function (data) {
            //条件判断如果流程为会签流程时当前审批节点需要进行审批验证
            if (data.status!="run"){
                $.modal.alertError("当前流程节点已审批,请刷新页面！");
            }else {
                $.modal.openTab("审批流程", ctx + "system/process/approveProcess/" + id);
            }
        }
    });

}

/*
* 待办任务
 * dbrwtype :代办任务类型。值--》  1:查询属于当前登录人的代办任务；2：查询当前登录人自己发布的任务。
* */

function dbrwdata(val){
    $("#dbrwtype").val(val);
    var ss = $("#dbrwtype").val();

    var options = {
        url: ctx+"workbench/dbrwdata",
        id:"dbrwdata",
        data:"dbrwtype="+dbrwtype,
        pageSize:5,
        queryParams: dbrwqueryParams,
        importTemplateUrl: prefix + "/importTemplate",
        sortName: "rwfbsj",
        sortOrder: "desc",
        modalName: "待办任务",
        showPageGo:false,
        showToggle:false,
        showColumns:false,
        search:false,
        showSearch:false,
        columns: [
            {
                title: '序号',
                formatter: function (value, row, index) {

                    return $.table.serialNumber(index);
                }
            },
            {
                field: 'rwbt',
                title: '任务标题'
            },

            {
                field: 'rwfbr',
                title: '发布人'
            },
            {
                field: 'rwzt',
                title: '状态'
            },
            {
                field: 'rwfbsj',
                title: '时间'
            },

            {
                title: '操作',
                align: 'center',
                formatter: function(value, row, index) {
                    var actions = [];
                    if(ss == 1){
                        actions.push('<a class="btn btn-success btn-xs " href="#"  onclick="rwbl(\'' + row.rwid + '\')"><i class="fa fa-edit"></i>任务办理</a> ');
                    }else{
                        actions.push('<a class="btn btn-success btn-xs " href="#"  onclick="rwck (\'' + row.rwid + '\')"><i class="fa fa-edit"></i>查看</a> ');
                    }

                    return actions.join('');
                }
            }]
    };
    $.table.destroy(options.id);
    $.table.init(options);
}
function rwbl(rowid) {
    $.modal.open('办理任务',ctx+'system/receiveManage/edit/'+rowid);
}
function rwck(rowid) {
    $.modal.open('查看任务',ctx+'system/taskManage/edit/'+rowid);
}

function dbrwqueryParams(params) {
    var search = $.table.queryParams(params);
    search.dbrwtype = $("#dbrwtype").val();
    return search;
}
function splctypeParams(params) {
    var search = $.table.queryParams(params);
    search.splctype = $("#splctype").val();
    return search;
}

/*
* 通讯录
* */
function txldata(){
    var options = {
        url: ctx+"system/external/list?typeforuser=1",
        id:"txlId",
        importTemplateUrl: ctx+"system/external/importTemplate",
        exportUrl:ctx+"system/external/export",
        modalName: "通讯录",
        search:true,
        showSearch:true,
        showToggle:false,
        showColumns:false,
        pageSize:5,
        pageList:[5],
        columns: [
            {
                field : 'externalId',
                title: '序号',
                formatter: function (value, row, index) {
                    return $.table.serialNumber(index);
                }
            },
            {
                field: 'userName',
                title: '姓名'
            },

            {
                field: 'isCompanies',
                title: '部门'
            },
            {
                field: 'phone',
                title: '私人电话'
            },
            {
                field: 'phoneWork',
                title: '办公电话'
            }]
    };
    $.table.init(options);
}


/**
 * 将类数组转化为真实数组
 * @param {array*} likeArray 
 */
function toArray(likeArray) {
  return Array.prototype.slice.call(likeArray);
}

/**
 * 初始化柱状图
 * @param {array} currentMonthData 
 * @param {array} previousMonthData 
 */
function ChartInit(currentMonthData, previousMonthData) {
  const iChart = echarts.init(document.getElementById('ichart'));
  const option = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      x: 'center',
      y: 'bottom',
      data: ['本月', '上月'],
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
       // data: ['迟到', '早退', '外勤', '请假', '加班', '调休'],
        data: ['迟到', '早退', '请假', '加班', '调休'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '本月',
        type: 'bar',
        data: currentMonthData,
        color: '#3385ff'
      },
      {
        name: '上月',
        type: 'bar',
        data: previousMonthData,
        color: '#6bda9d',
      },
    ],
  };

  iChart.setOption(option);
}
// 我的考勤数据初始化。
function kaoqindata(){
    $.ajax({
        url: ctx+"workbench/kaoqindata",
        type: "POST",
        success: function (data) {
            data.currentMonthData;
            data.previousMonthData;
            ChartInit(toArray(data.currentMonthData), toArray(data.previousMonthData));
        },
        error: function () {
            alert("数据查询失败，请联系系统管理员！");
        }
    });
}

// 通知公告查询
function tzgg(){
    $.ajax({
        url: ctx+"system/notice/list?status=0",
        type: "POST",
        success: function (data) {

            $("#tzgg").html(data.rows[0].noticeTitle);
            $("#tzgg").click(function () {
                $.modal.openTab('通知公告',ctx+'system/notice/detail/'+data.rows[0].noticeId);
            });
            //var noticeid = data.rows[0].noticeId;
        },
        error: function () {
            alert("数据查询失败，请联系系统管理员！");
        }
    });
}

$(function () {
   // dbrw_dyrw_dbsp_xxtx();
    splcdata(1);
    dbrwdata(1);
    txldata();
    kaoqindata();
    tzgg();
});

/**
 * tab切换的控制
 * @param {string} containerId 
 * @param {function} callback 
 */
function switchTabs(containerId, callback) {
  const container = document.getElementById(containerId);
  const tabs = toArray(container.querySelectorAll('li'));
  const active = 'current';

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const len = tabs.length;
      let i = 0;
      
      for (; i < len; i++) {
        tabs[i].removeAttribute('class');
      }

      tab.setAttribute('class', active);
      callback && callback();
    });
  });
}

switchTabs('review-tab');
switchTabs('project-tab');


/**
 * 发起http请求
 * @param {string} type 
 * @param {string} api 
 * @param {json|string} body 
 * @param {string} contentType 
 * @param {string} responseType 
 * @param {number} timeout 
 * @return {promise} response
 */
function iRequest(
  type, 
  api, 
  body = null, 
  contentType = 'application/json', 
  responseType = 'json', 
  timeout = 5000
) {
  const XHR = new XMLHttpRequest();
  const handleReadyStateChange = (resolve, reject) => {
    try {
      if (XHR.readyState === XHR.DONE) {
        if (XHR.status === 200) {
          resolve(XHR.response)
        } else {
          reject(new Error('request response failed!'));
        }
      }
    } catch(ex) {
      reject(new Error('Request Exception: ', ex.message));
    }
  };
  const handleRequestTimeout = (ex) => {
    console.error('Request timeout: ', ex);
    XHR.abort();
  };

  if (!XHR) {
    console.error('Cannot find XMLHttpRequest object!');
    return false;
  }

  XHR.open(type, api);
  XHR.setRequestHeader('Content-Type', contentType);
  XHR.responseType = responseType;
  XHR.timeout = timeout;
  XHR.ontimeout = handleRequestTimeout;
  XHR.send(body);

  return new Promise((resolve, reject) => {
    XHR.onreadystatechange = () => {
      handleReadyStateChange(resolve, reject);
    };
  });
}

/**
 * 获取通讯录的数据
 */
function requestAddressBookData() {
  const TUrl = 'https://www.easy-mock.com/mock/5cc653e3768a400e185ec73d/test/request';
  let dataList;

  iRequest('GET', TUrl)
    .then((res) => {
      dataList = res.data.list;
      //console.log(dataList);
      renderTableBaseOnAddressBookData(dataList);
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * 根据获取的数据渲染通讯录列表
 * @param {array} dataList 
 */
function renderTableBaseOnAddressBookData(dataList) {
  const container = document.getElementById('contact-container');
  let listHtmlString = '';
  dataList.forEach((item) => {
    const itemString = `
      <tr>
        <td>${item.name}</td>
        <td>${item.department}</td>
        <td>${item.phone}</td>
      </tr>
    `;
    listHtmlString += itemString;
  });

  container.innerHTML = listHtmlString;
}

/**
 * 通讯录数据的条件查询
 */
function searchAddressBookData() {
  const input = document.getElementById('search-input');
  const searchAll = document.getElementById('search-all');

  const conditionRequest = () => {
    console.log('enter');
  };

  const commonRequest = () => {
    console.log('init');
  };

  input.addEventListener('focus', () => {
    document.addEventListener('keypress', conditionRequest);
  });

  input.addEventListener('blur', () => {
    document.removeEventListener('keypress', conditionRequest);
  });

  searchAll.addEventListener('click', commonRequest);
}


