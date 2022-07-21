const ProjectData = require('../models/ProjectData');
const ModelRecord = require('../models/ModelRecord');
const SystemParameter = require('../models/SystemParameter');

class IndexController {
    async getAllData(req, res, next){
		// 將資料寫入資料庫
        const pd_r = new ProjectData;
        const mr_r = new ModelRecord;
        const sp_r = new SystemParameter;
        const data = {};
        data.index = {};
///////////////////////////////////////////////////////////////////////////////////////////////////////////
        //資料的排列依據
        data.index.orderBy = 'pd_date';
///////////////////////////////////////////////////////////////////////////////////////////////////////////
        //取得固定網版相關統計
        await pd_r.getAdaptiveCount().then(result => {// 若寫入成功則回傳
            data.index.project_count = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.project_count = 0;
        })
        await pd_r.getAdaptiveShowCount().then(result => {// 若寫入成功則回傳
            data.index.project_show_count = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.project_show_count = 0;
        })
        await pd_r.getAdaptiveHideCount().then(result => {// 若寫入成功則回傳
            data.index.project_hide_count = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.project_hide_count = 0;
        })
        await pd_r.getAdaptiveOffCount().then(result => {// 若寫入成功則回傳
            data.index.project_off_count = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.project_off_count = 0;
        })
///////////////////////////////////////////////////////////////////////////////////////////////////////////
        //取得固定網版-各網版主色五行的總數
        data.index.element_count = [];
        await pd_r.getAdaptiveElementCount(1).then(result => {// 若寫入成功則回傳
            data.index.element_count[0] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.element_count[0] = 0;
        })
        await pd_r.getAdaptiveElementCount(2).then(result => {// 若寫入成功則回傳
            data.index.element_count[1] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.element_count[1] = 0;
        })
        await pd_r.getAdaptiveElementCount(3).then(result => {// 若寫入成功則回傳
            data.index.element_count[2] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.element_count[2] = 0;
        })
        await pd_r.getAdaptiveElementCount(4).then(result => {// 若寫入成功則回傳
            data.index.element_count[3] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.element_count[3] = 0;
        })
        await pd_r.getAdaptiveElementCount(5).then(result => {// 若寫入成功則回傳
            data.index.element_count[4] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.element_count[4] = 0;
        })
///////////////////////////////////////////////////////////////////////////////////////////////////////////
        //取得固定網版-各網版輔色五行的總數
        data.index.element_sub_count = [];
        await pd_r.getAdaptiveElementSubCount(1).then(result => {// 若寫入成功則回傳
            data.index.element_sub_count[0] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.element_sub_count[0] = 0;
        })
        await pd_r.getAdaptiveElementSubCount(2).then(result => {// 若寫入成功則回傳
            data.index.element_sub_count[1] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.element_sub_count[1] = 0;
        })
        await pd_r.getAdaptiveElementSubCount(3).then(result => {// 若寫入成功則回傳
            data.index.element_sub_count[2] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.element_sub_count[2] = 0;
        })
        await pd_r.getAdaptiveElementSubCount(4).then(result => {// 若寫入成功則回傳
            data.index.element_sub_count[3] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.element_sub_count[3] = 0;
        })
        await pd_r.getAdaptiveElementSubCount(5).then(result => {// 若寫入成功則回傳
            data.index.element_sub_count[4] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.element_sub_count[4] = 0;
        })
///////////////////////////////////////////////////////////////////////////////////////////////////////////
        //取得各網版"主題"的總數
        data.index.type_count = [];
        await pd_r.getAdaptiveTypeCount(0).then(result => {// 若寫入成功則回傳
            data.index.type_count[0] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.type_count[0] = 0;
        })
        await pd_r.getAdaptiveTypeCount(1).then(result => {// 若寫入成功則回傳
            data.index.type_count[1] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.type_count[1] = 0;
        })
        await pd_r.getAdaptiveTypeCount(7).then(result => {// 若寫入成功則回傳
            data.index.type_count[2] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.type_count[2] = 0;
        })
        await pd_r.getAdaptiveTypeCount(4).then(result => {// 若寫入成功則回傳
            data.index.type_count[3] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.type_count[3] = 0;
        })
        await pd_r.getAdaptiveTypeCount(5).then(result => {// 若寫入成功則回傳
            data.index.type_count[4] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.type_count[4] = 0;
        })
        await pd_r.getAdaptiveTypeCount(2).then(result => {// 若寫入成功則回傳
            data.index.type_count[5] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.type_count[5] = 0;
        })
        await pd_r.getAdaptiveTypeCount(8).then(result => {// 若寫入成功則回傳
            data.index.type_count[6] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.type_count[6] = 0;
        })
        await pd_r.getAdaptiveTypeCount(3).then(result => {// 若寫入成功則回傳
            data.index.type_count[7] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.type_count[7] = 0;
        })
///////////////////////////////////////////////////////////////////////////////////////////////////////////
        //取得各網版"風格"的總數
        data.index.style_count = [];
        await pd_r.getAdaptiveStyleCount(1).then(result => {// 若寫入成功則回傳
            data.index.style_count[0] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.style_count[0] = 0;
        })
        await pd_r.getAdaptiveStyleCount(2).then(result => {// 若寫入成功則回傳
            data.index.style_count[1] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.style_count[1] = 0;
        })
        await pd_r.getAdaptiveStyleCount(3).then(result => {// 若寫入成功則回傳
            data.index.style_count[2] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.style_count[2] = 0;
        })
        await pd_r.getAdaptiveStyleCount(4).then(result => {// 若寫入成功則回傳
            data.index.style_count[3] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.style_count[3] = 0;
        })
///////////////////////////////////////////////////////////////////////////////////////////////////////////
        //取得固定網版-各網版色系的總數
        data.index.color_count = {};
        await pd_r.getAdaptiveColorCount('white').then(result => {// 若寫入成功則回傳
            data.index.color_count.white = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.color_count.white = 0;
        })
        await pd_r.getAdaptiveColorCount('lightgrey').then(result => {// 若寫入成功則回傳
            data.index.color_count.lightgrey = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.color_count.lightgrey = 0;
        })
        await pd_r.getAdaptiveColorCount('darkgrey').then(result => {// 若寫入成功則回傳
            data.index.color_count.darkgrey = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.color_count.darkgrey = 0;
        })
        await pd_r.getAdaptiveColorCount('black').then(result => {// 若寫入成功則回傳
            data.index.color_count.black = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.color_count.black = 0;
        })
        await pd_r.getAdaptiveColorCount('blue').then(result => {// 若寫入成功則回傳
            data.index.color_count.blue = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.color_count.blue = 0;
        })
        await pd_r.getAdaptiveColorCount('green').then(result => {// 若寫入成功則回傳
            data.index.color_count.green = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.color_count.green = 0;
        })
        await pd_r.getAdaptiveColorCount('greenblue').then(result => {// 若寫入成功則回傳
            data.index.color_count.greenblue = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.color_count.greenblue = 0;
        })
        await pd_r.getAdaptiveColorCount('yellow').then(result => {// 若寫入成功則回傳
            data.index.color_count.yellow = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.color_count.yellow = 0;
        })
        await pd_r.getAdaptiveColorCount('coffee').then(result => {// 若寫入成功則回傳
            data.index.color_count.coffee = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.color_count.coffee = 0;
        })
        await pd_r.getAdaptiveColorCount('earth').then(result => {// 若寫入成功則回傳
            data.index.color_count.earth = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.color_count.earth = 0;
        })
        await pd_r.getAdaptiveColorCount('orange').then(result => {// 若寫入成功則回傳
            data.index.color_count.orange = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.color_count.orange = 0;
        })
        await pd_r.getAdaptiveColorCount('red').then(result => {// 若寫入成功則回傳
            data.index.color_count.red = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.color_count.red = 0;
        })
        await pd_r.getAdaptiveColorCount('purple').then(result => {// 若寫入成功則回傳
            data.index.color_count.purple = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.color_count.purple = 0;
        })
///////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 五行分佈 - 選中版型
        const dateE = new Date();
        const mm = (dateE.getMonth() + 1 > 9 ? '' : '0') + (dateE.getMonth() + 1);
        const dd = (dateE.getDate() + 1 > 9 ? '' : '0') + (dateE.getDate());
        const arraydata = {
            startDate: dateE.getFullYear() + '-01-01',
            endDate: dateE.getFullYear() + '-' + mm + '-' + dd,
            orderBy: 'wms_modelrecord.mr_date',
            sort:'DESC',
        }
        await mr_r.getIndexPieData(arraydata).then(result => {// 若寫入成功則回傳
            data.index.models_pie_list = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.models_pie_list = [];
        })
        data.index.pie_project_date = [arraydata.startDate,arraydata.endDate];
        data.index.projects_pie = []
        arraydata.pd_elements = 1;
        await mr_r.getCountByElement(arraydata).then(result => {// 若寫入成功則回傳
            data.index.projects_pie[0] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.projects_pie[0] = 0;
        })
        arraydata.pd_elements = 2;
        await mr_r.getCountByElement(arraydata).then(result => {// 若寫入成功則回傳
            data.index.projects_pie[1] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.projects_pie[1] = 0;
        })
        arraydata.pd_elements = 3;
        await mr_r.getCountByElement(arraydata).then(result => {// 若寫入成功則回傳
            data.index.projects_pie[2] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.projects_pie[2] = 0;
        })
        arraydata.pd_elements = 4;
        await mr_r.getCountByElement(arraydata).then(result => {// 若寫入成功則回傳
            data.index.projects_pie[3] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.projects_pie[3] = 0;
        })
        arraydata.pd_elements = 5;
        await mr_r.getCountByElement(arraydata).then(result => {// 若寫入成功則回傳
            data.index.projects_pie[4] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.projects_pie[4] = 0;
        })
///////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 星座分佈 - 選中版型
        await mr_r.getIndexSignData(arraydata).then(result => {// 若寫入成功則回傳
            data.index.models_sign_list = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.models_sign_list = [];
        })
        data.index.pie_sign_date = [arraydata.startDate,arraydata.endDate];
        data.index.sign_pie = [0,0,0,0];
        const no = {};
        await sp_r.getDataByKey('星座-火象').then(result => {// 若寫入成功則回傳
            data.index.sign_fire = result;
            no.sign_fire = JSON.parse(result.sp_parametervalue);
        }, (err) => {// 若寫入失敗則回傳
            data.index.sign_fire = {};
            no.sign_fire = false;
        })
        await sp_r.getDataByKey('星座-土象').then(result => {// 若寫入成功則回傳
            data.index.sign_earth = result;
            no.sign_earth = JSON.parse(result.sp_parametervalue);
        }, (err) => {// 若寫入失敗則回傳
            data.index.sign_earth = {};
            no.sign_earth = false;
        })
        await sp_r.getDataByKey('星座-風象').then(result => {// 若寫入成功則回傳
            data.index.sign_wind = result;
            no.sign_wind = JSON.parse(result.sp_parametervalue);
        }, (err) => {// 若寫入失敗則回傳
            data.index.sign_wind = {};
            no.sign_wind = false;
        })
        await sp_r.getDataByKey('星座-水象').then(result => {// 若寫入成功則回傳
            data.index.sign_water = result;
            no.sign_water = JSON.parse(result.sp_parametervalue);
        }, (err) => {// 若寫入失敗則回傳
            data.index.sign_water = {};
            no.sign_water = false;
        })
        for (let i = 0; i < data.index.models_sign_list.length; i++) {
            const colors = JSON.parse(data.index.models_sign_list[i].pd_colors);
            const color = colors[0];
            for (let j = 0; j < no.sign_fire.length; j++) {
                if (no.sign_fire[j] == color) {
                    data.index.sign_pie[0]++;
                }
            }
            for (let k = 0; k < no.sign_earth.length; k++) {
                if (no.sign_earth[k] == color) {
                    data.index.sign_pie[1]++;
                }
            }
            for (let l = 0; l < no.sign_wind.length; l++) {
                if (no.sign_wind[l] == color) {
                    data.index.sign_pie[2]++;
                }
            }
            for (let m = 0; m < no.sign_water.length; m++) {
                if (no.sign_water[m] == color) {
                    data.index.sign_pie[3]++;
                }
            }
        }
///////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 取得每年選中次數
        const dateG = new Date();
        const nowyear = dateG.getFullYear();
        const oldyear = 2010;
        const everyarray = {};
        data.index.grow_line = [];
        for (let i = 0; i <= (nowyear - oldyear); i++) {
            everyarray.startDate = (oldyear+i) + '-01-01';
            everyarray.endDate = (oldyear+i) + '-12-31';
            const growData = {};
            await mr_r.getCountByYear(everyarray).then(result => {// 若寫入成功則回傳
                growData.count = result;
                growData.year = oldyear+i;
                data.index.grow_line[i] = growData;
            }, (err) => {// 若寫入失敗則回傳
                growData.count = 0;
                growData.year = oldyear+i;
                data.index.grow_line[i] = growData;
            })
        }
///////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 取得當月數據
        const dateM = new Date();
        dateM.setMonth(dateM.getMonth() + 1);
        dateM.setDate(0);
        const lastday = dateM.getDate();
        const nowM = (dateM.getMonth() + 1 > 9 ? '' : '0') + (dateM.getMonth() + 1);
        const nowD = (dateM.getDate() > 9 ? '' : '0') + dateM.getDate();
        const nowarray = {
            startDate : dateM.getFullYear() + '-' + nowM + '-01',
            endDate : dateM.getFullYear() + '-' + nowM + '-' + nowD,
            orderBy : 'wms_modelrecord.mr_date',
            sort : 'DESC'
        }
        await mr_r.getAllData(nowarray).then(result => {// 若寫入成功則回傳
            data.index.models_line_list = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.models_line_list = [];
        })
        const line_array = [];
        for (let i = 0; i < lastday; i++) {
            const a = {};
            a.day = i + 1;
            a.data = [];
            line_array.push(a);
        }
        for (let i = 0; i < data.index.models_line_list.length; i++) {
            const day = (data.index.models_line_list[i].mr_date.split('-'))[2];
            line_array[day -1].data.push(data.index.models_line_list[i]);
        }
        data.index.models_line = line_array;
        data.index.line_date = dateM.getFullYear() + '-' + (dateM.getMonth() +1);
///////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 取得當年度最熱門模板
        const dateH = new Date();
        const hotM = (dateH.getMonth() + 1 > 9 ? '' : '0') + (dateH.getMonth() + 1);
        const hotD = (dateH.getDate() + 1 > 9 ? '' : '0') + (dateH.getDate());
        const hotarray = {
            startDate : dateH.getFullYear() + '-01-01',
            endDate : dateH.getFullYear() + '-' + hotM + '-' + hotD,
            orderBy : 'wms_modelrecord.mr_date',
            sort : 'DESC'
        }
        await mr_r.getAllData(hotarray).then(result => {// 若寫入成功則回傳
            data.index.hot_models_bar = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.hot_models_bar = [];
        })
        data.index.hot_models_date = hotarray;
///////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 取得兩年內模板使用量
        const twoT = new Date();
        const twoM = (dateH.getMonth() + 1 > 9 ? '' : '0') + (dateH.getMonth() + 1);
        const twoD = (dateH.getDate() + 1 > 9 ? '' : '0') + (dateH.getDate());
        const twoarray = {
            startDate : (twoT.getFullYear() -2) + '-' + twoM + '-' + twoD,
            endDate : twoT.getFullYear() + '-' + twoM + '-' + twoD,
        }
        await mr_r.getAllDataOrderByPdNum(twoarray).then(result => {// 若寫入成功則回傳
            data.index.twoyear_models_bar = result;
        }, (err) => {// 若寫入失敗則回傳
            data.index.twoyear_models_bar = [];
        })
        data.index.twoyear_models_date = twoarray;
///////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 依據版型資料計算各星象的數量
        const proarray = {
            orderBy : 'pd_date',
            sort : 'DESC',
            pd_num : ''
        }
        const project = {};
        await pd_r.getAllData(proarray).then(result => {// 若寫入成功則回傳
            project.projects = result;
        }, (err) => {// 若寫入失敗則回傳
            project.projects = [];
        })
        data.index.sign_count = [0,0,0,0];
        for (let i = 0; i < project.projects.length; i++) {
            const colors = JSON.parse(project.projects[i].pd_colors);
            const color = colors[0];
            for (let j = 0; j < no.sign_fire.length; j++) {
                if (no.sign_fire[j] == color) {
                    data.index.sign_count[0]++;
                }
            }
            for (let k = 0; k < no.sign_earth.length; k++) {
                if (no.sign_earth[k] == color) {
                    data.index.sign_count[1]++;
                }
            }
            for (let l = 0; l < no.sign_wind.length; l++) {
                if (no.sign_wind[l] == color) {
                    data.index.sign_count[2]++;
                }
            }
            for (let m = 0; m < no.sign_water.length; m++) {
                if (no.sign_water[m] == color) {
                    data.index.sign_count[3]++;
                }
            }
        }

        return res.json(data);
	}
}


module.exports = IndexController;