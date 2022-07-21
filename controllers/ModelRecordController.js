const ModelRecord = require('../models/ModelRecord');
const ModelSort = require('../models/ModelSort');
const SystemParameter = require('../models/SystemParameter');
const ProjectData = require('../models/ProjectData');
const CommonTools = require('../services/CommonTools');

class ModelRecordController {
    // 取值
    async getAllData(req, res, next){
        const mr_r = new ModelRecord;
        const ms_r = new ModelSort;
        const pd_r = new ProjectData;
        const sp_r = new SystemParameter;
        var data = {'model':{'model_setting':{},'models':{},'sorts':{},'not_hot_projects':{}}};
        var dateString = '';
        var arraydata = {};
        await sp_r.getDataByKey('熱門排行-固定版型').then(result => {// 若寫入成功則回傳
            data.model.model_setting.mod = result;
        }, (err) => {// 若寫入失敗則回傳
            res.json(err);
        })
        await sp_r.getDataByKey('熱門排行-時間區間').then(result => {// 若寫入成功則回傳
            data.model.model_setting.date = result;
        }, (err) => {// 若寫入失敗則回傳
            res.json(err);
        })
        dateString = data.model.model_setting.date.sp_parametervalue
        arraydata.startDate = (dateString.split('~'))[0];
        arraydata.endDate = (dateString.split('~'))[1];
        arraydata.orderBy = 'wms_modelrecord.mr_date';
        arraydata.sort = 'DESC';
        await mr_r.getAllData(arraydata).then(result => {// 若寫入成功則回傳
            data.model.models = result;
        }, (err) => {// 若寫入失敗則回傳
            res.json(err);
        })
        await ms_r.getAllData().then(result => {// 若寫入成功則回傳
            data.model.sorts = result;
        }, (err) => {// 若寫入失敗則回傳
            res.json(err);
        })
        await pd_r.getDataByNotHot().then(result => {// 若寫入成功則回傳
            data.model.not_hot_projects = result;
        }, (err) => {// 若寫入失敗則回傳
            res.json(err);
        })
        return res.json(data);
    }

    // 取值
    async getModels(req, res, next){
        const mr_r = new ModelRecord;
        const sp_r = new SystemParameter;
        var data = {'models':{}};
        var timedata = {};
        var dateString = '';
        var arraydata = {};
        await sp_r.getDataByKey('熱門排行-時間區間').then(result => {// 若寫入成功則回傳
            timedata = result;
        }, (err) => {// 若寫入失敗則回傳
            res.json(err);
        })
        dateString = timedata.sp_parametervalue
        arraydata.startDate = (dateString.split('~'))[0];
        arraydata.endDate = (dateString.split('~'))[1];
        arraydata.orderBy = 'wms_modelrecord.mr_date';
        arraydata.sort = 'DESC';
        await mr_r.getAllData(arraydata).then(result => {// 若寫入成功則回傳
            data.models = result;
        }, (err) => {// 若寫入失敗則回傳
            res.json(err);
        })
        return res.json(data);
    }

    // 取值
    async getNotHotProjects(req, res, next){
        const pd_r = new ProjectData;
        var data = {'not_hot_projects':{}};
        await pd_r.getDataByNotHot().then(result => {// 若寫入成功則回傳
            data.not_hot_projects = result;
        }, (err) => {// 若寫入失敗則回傳
            res.json(err);
        })
        return res.json(data);
    }

    // 取值
    async getSorts(req, res, next){
        const ms_r = new ModelSort;
        var data = {'sorts':{}};
        await ms_r.getAllData().then(result => {// 若寫入成功則回傳
            data.sorts = result;
        }, (err) => {// 若寫入失敗則回傳
            res.json(err);
        })
        return res.json(data);
    }

    // 取值
    async getSignsForIndex(req, res, next){
        const mr_r = new ModelRecord;
        const sp_r = new SystemParameter;
        const data = {};
        const dateE = new Date();
        const mm = (dateE.getMonth() + 1 > 9 ? '' : '0') + (dateE.getMonth() + 1);
        const dd = (dateE.getDate() + 1 > 9 ? '' : '0') + (dateE.getDate());
        const arraydata = {
            startDate: dateE.getFullYear() + '-01-01',
            endDate: dateE.getFullYear() + '-' + mm + '-' + dd,
            orderBy: req.query.orderBy,
            sort:req.query.sort,
        }
        await mr_r.getIndexSignData(arraydata).then(result => {// 若寫入成功則回傳
            data.models_sign_list = result;
        }, (err) => {// 若寫入失敗則回傳
            data.models_sign_list = [];
        })
        data.pie_sign_date = [arraydata.startDate,arraydata.endDate];
        data.sign_pie = [0,0,0,0];
        const no = {};
        await sp_r.getDataByKey('星座-火象').then(result => {// 若寫入成功則回傳
            no.sign_fire = JSON.parse(result.sp_parametervalue);
        }, (err) => {// 若寫入失敗則回傳
            no.sign_fire = false;
        })
        await sp_r.getDataByKey('星座-土象').then(result => {// 若寫入成功則回傳
            no.sign_earth = JSON.parse(result.sp_parametervalue);
        }, (err) => {// 若寫入失敗則回傳
            no.sign_earth = false;
        })
        await sp_r.getDataByKey('星座-風象').then(result => {// 若寫入成功則回傳
            no.sign_wind = JSON.parse(result.sp_parametervalue);
        }, (err) => {// 若寫入失敗則回傳
            no.sign_wind = false;
        })
        await sp_r.getDataByKey('星座-水象').then(result => {// 若寫入成功則回傳
            no.sign_water = JSON.parse(result.sp_parametervalue);
        }, (err) => {// 若寫入失敗則回傳
            no.sign_water = false;
        })
        for (let i = 0; i < data.models_sign_list.length; i++) {
            const colors = JSON.parse(data.models_sign_list[i].pd_colors);
            const color = colors[0];
            for (let j = 0; j < no.sign_fire.length; j++) {
                if (no.sign_fire[j] == color) {
                    data.sign_pie[0]++;
                }
            }
            for (let k = 0; k < no.sign_earth.length; k++) {
                if (no.sign_earth[k] == color) {
                    data.sign_pie[1]++;
                }
            }
            for (let l = 0; l < no.sign_wind.length; l++) {
                if (no.sign_wind[l] == color) {
                    data.sign_pie[2]++;
                }
            }
            for (let m = 0; m < no.sign_water.length; m++) {
                if (no.sign_water[m] == color) {
                    data.sign_pie[3]++;
                }
            }
        }
        return res.json(data);
    }

    // 取值
    async getHots(req, res, next){
        const mr_r = new ModelRecord;
        const data = {};
        const startDate = new Date(Number(req.query.start));
        const sd = startDate.toISOString().split('T')[0];
        const endDate = new Date(Number(req.query.end));
        const ed = endDate.toISOString().split('T')[0];
        const arraydata = {
            startDate: sd,
            endDate: ed,
            orderBy: 'wms_modelrecord.mr_date',
            sort:'DESC',
            show:req.query.show
        }
        await mr_r.getAllDataInDataBase(arraydata).then(result => {// 若寫入成功則回傳
            data.hot_models_bar = result;
        }, (err) => {// 若寫入失敗則回傳
            data.hot_models_bar = [];
        })
        return res.json(data);
    }

    // 取值
    async getLineModels(req, res, next){
        const mr_r = new ModelRecord;
        const data = {};
        data.index = {};
        const dateM = new Date(req.query.date);
        dateM.setMonth(dateM.getMonth() + 1);
        dateM.setDate(0);
        const lastday = dateM.getDate();
        const nowM = (dateM.getMonth() + 1 > 9 ? '' : '0') + (dateM.getMonth() + 1);
        const nowD = (dateM.getDate() > 9 ? '' : '0') + dateM.getDate();
        const nowarray = {
            startDate : dateM.getFullYear() + '-' + nowM + '-01',
            endDate : dateM.getFullYear() + '-' + nowM + '-' + nowD,
            orderBy : req.query.orderBy,
            sort : req.query.sort
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
            const mr_date = new Date(data.index.models_line_list[i].mr_date);
            const sd = mr_date.toISOString().split('T')[0];
            const day = (sd.split('-'))[2];
            line_array[day -1].data.push(data.index.models_line_list[i]);
        }
        data.index.models_line = line_array;
        data.index.line_date = dateM.getFullYear() + '-' + (dateM.getMonth() +1);
        return res.json(data);
    }

    // 新增
    async actionCreate(req, res, next){
        const mr_r = new ModelRecord;
        const pd_r = new ProjectData;
        var data = {};
        var arraydata = {};
        var mr_id = '';
        if(!req.body.pd_num || req.body.pd_num == ''){
            res.json('尚未傳入版型名稱，新增失敗！')
        }else{
            await pd_r.getDataByNumForModel(req.body.pd_num).then(result => {// 若寫入成功則回傳
                arraydata.pd_id = result.pd_id;
            }, (err) => {// 若寫入失敗則回傳
                res.json('查無版型，新增失敗！')
            })
        }
        arraydata.mr_date = req.body.mr_date;
        arraydata.last_update_user = req.body.last_update_user;

        await mr_r.createGetId(arraydata).then(result => {// 若寫入成功則回傳
            mr_id = result;
        }, (err) => {// 若寫入失敗則回傳
            res.json('新增失敗！')
        })
        return res.json(true);
    }

    // 修改
    async actionModify(req, res, next){
        const mr_r = new ModelRecord;
        const ct = new CommonTools;
        var arraydata = {
            'mr_id':req.body.mr_id,
            'pd_id':req.body.pd_id,
            'mr_date':req.body.mr_date,
            'last_update_user':req.body.last_update_user,
            'last_update_date':ct.whatTime(),
        }
        await mr_r.update(arraydata).then(result => {// 若寫入成功則回傳
            res.json(true);
        }, (err) => {// 若寫入失敗則回傳
            res.json('新增失敗！')
        })
    }

    // 修改
    async actionSortModify(req, res, next){
        const ms_r = new ModelSort;
        var boolean = false;
        await ms_r.reset().then(result => {// 若寫入成功則回傳
            boolean = result;
        }, (err) => {// 若寫入失敗則回傳
            res.json(err)
        })
        if(boolean){
            for (let i = 0; i < req.body.length; i++) {
                var dd = {};
                dd.pd_id = req.body[i].pd_id;
                dd.ms_sort = i + 1;
                console.log(dd)
                await ms_r.create(dd).then(result => {// 若寫入成功則回傳
                    // boolean = result;
                }, (err) => {// 若寫入失敗則回傳
                    res.json(err)
                })
            }
            if(boolean){
                res.json(true)
            }else{
                res.json('修改失敗！')
            }
        }else{
            res.json('修改失敗！')
        }
    }

    // 刪除
    async actionDelete(req, res, next){
        const mr_r = new ModelRecord;
        const ct = new CommonTools;
        const arraydata = {};
        if(!req.body.mr_id || req.body.mr_id == ''){
            res.json('尚未傳入租網編號，無法刪除！')
        }
        else{
            arraydata.mr_id = req.body.mr_id;
            arraydata.last_update_user = req.body.last_update_user;
            arraydata.last_update_date = ct.whatTime();
        }
        // 將資料寫入資料庫
        await mr_r.delete(arraydata).then(result => {// 若寫入成功則回傳
            res.json(true);
        }, (err) => {// 若寫入失敗則回傳
            res.json('刪除失敗！')
        })
    }
}


module.exports = ModelRecordController;