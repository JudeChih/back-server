const ModelRecord = require('../models/ModelRecord');
const ModelSort = require('../models/ModelSort');
const SystemParameter = require('../models/SystemParameter');
const ProjectData = require('../models/ProjectData');
const CommonTools = require('../services/CommonTools');

class ProjectDataController {
    // 取值
    async getAllData(req, res, next){
        const mr_r = new ModelRecord;
        const pd_r = new ProjectData;
        const sp_r = new SystemParameter;
        var data = {'project':{'orderBy':'pd_date','sort':'DESC','pd_num':'','projects':{},'sign_fire':{},'sign_water':{},'sign_wind':{},'sign_earth':{}},'model':{'models':{}}};
        await pd_r.getAllData(data.project).then(result => {// 若寫入成功則回傳
            data.project.projects = result;
        }, (err) => {// 若寫入失敗則回傳
            res.json('資料獲取失敗');
        })
        for (let i = 0; i < data.project.projects.length; i++) {
            if(data.project.projects[i].pd_new == 1){
                if(data.project.projects[i].pd_new_start && data.project.projects[i].pd_new_end){
                    var now = new Date();
                    var end = new Date(data.project.projects[i].pd_new_end);
                    if(now > end){
                        var arraydata = {
                            'pd_new':0,
                            'pd_new_start':null,
                            'pd_new_end':null,
                            'pd_id':data.project.projects[i].pd_id
                        }
                        await pd_r.update(arraydata).then(result => {// 若寫入成功則回傳
                            data.project.projects[i].pd_new = 0;
                            data.project.projects[i].pd_new_start = null;
                            data.project.projects[i].pd_new_end = null;
                        }, (err) => {// 若寫入失敗則回傳
                            res.json('資料更新失敗');
                        })
                    }
                }else{
                    var arraydata = {
                        'pd_new':0,
                        'pd_new_start':null,
                        'pd_new_end':null,
                        'pd_id':data.project.projects[i].pd_id
                    }
                    await pd_r.update(arraydata).then(result => {// 若寫入成功則回傳
                        data.project.projects[i].pd_new = 0;
                        data.project.projects[i].pd_new_start = null;
                        data.project.projects[i].pd_new_end = null;
                    }, (err) => {// 若寫入失敗則回傳
                        res.json('資料更新失敗');
                    })
                }
            }

        }
        await sp_r.getDataByKey('星座-火象').then(result => {// 若寫入成功則回傳
            data.project.sign_fire = result;
        }, (err) => {// 若寫入失敗則回傳
            res.json('資料獲取失敗');
        })
        await sp_r.getDataByKey('星座-水象').then(result => {// 若寫入成功則回傳
            data.project.sign_water = result;
        }, (err) => {// 若寫入失敗則回傳
            res.json('資料獲取失敗');
        })
        await sp_r.getDataByKey('星座-風象').then(result => {// 若寫入成功則回傳
            data.project.sign_wind = result;
        }, (err) => {// 若寫入失敗則回傳
            res.json('資料獲取失敗');
        })
        await sp_r.getDataByKey('星座-土象').then(result => {// 若寫入成功則回傳
            data.project.sign_earth = result;
        }, (err) => {// 若寫入失敗則回傳
            res.json('資料獲取失敗');
        })
        var dateString = '';
        await sp_r.getDataByKey('熱門排行-時間區間').then(result => {// 若寫入成功則回傳
            dateString = result.sp_parametervalue;
        }, (err) => {// 若寫入失敗則回傳
            res.json('資料獲取失敗');
        })
        var arraydata = {
            'startDate':(dateString.split('~'))[0],
            'endDate':(dateString.split('~'))[1],
            'orderBy':'wms_modelrecord.mr_date',
            'sort':'DESC'
        }
        await mr_r.getAllData(arraydata).then(result => {// 若寫入成功則回傳
            data.model.models = result;
        }, (err) => {// 若寫入失敗則回傳
            res.json(err);
        })
        return res.json(data);
    }

    // 取值
    async getProjects(req, res, next){
        const mr_r = new ModelRecord;
        const pd_r = new ProjectData;
        var data = {'projects':[],'orderBy':req.query.orderBy,'sort':req.query.sort,'pd_num':req.query.pd_num};
        if(data.orderBy == 'times'){
            data.orderBy = 'pd_date';
        }
        if(req.query.checked != ''){
            data.checked = true;
            var now = new Date();
            var year = now.getFullYear();
            var month = (now.getMonth() + 1 > 9 ? '' : '0') + (now.getMonth() + 1);
            var day = (now.getDate() + 1 > 9 ? '' : '0') + (now.getDate());
            if(req.query.checked == 'five'){
                year = year-5;
            }else if(req.query.checked == 'four'){
                year = year-4;
            }else if(req.query.checked == 'three'){
                year = year-3;
            }
            data.startDate = year + '-' + month + '-' + day;
            data.endDate = now.getFullYear() + '-' + month + '-' + day;
            var arraydata = {
                'startDate':year + '-' + month + '-' + day,
                'endDate':now.getFullYear() + '-' + month + '-' + day,
                'orderBy':'wms_modelrecord.mr_date',
                'sort':'DESC'
            };
            var testData = {'models_data':{},'projects_data':{}};
            await mr_r.getDataBeforeYear(arraydata).then(result => {// 若寫入成功則回傳
                testData.models_data = result;
            }, (err) => {// 若寫入失敗則回傳
                res.json('資料獲取失敗');
            })
            await pd_r.getAllData(data).then(result => {// 若寫入成功則回傳
                testData.projects_data = result;
            }, (err) => {// 若寫入失敗則回傳
                res.json('資料獲取失敗');
            })
            for (let i = 0; i < testData.projects_data.length; i++) {
                var boolean = true;
                for (let j = 0; j < testData.models_data.length; j++) {
                    if(testData.models_data[j].pd_id == testData.projects_data[i].pd_id){
                        boolean = false;
                    }
                }
                if(boolean){
                    data.projects.push(testData.projects_data[i]);
                }
            }
        }else{
            await pd_r.getAllData(data).then(result => {// 若寫入成功則回傳
                data.projects = result;
            }, (err) => {// 若寫入失敗則回傳
                res.json('資料獲取失敗');
            })
        }
        if(req.query.orderBy == 'times'){
            data.orderBy = 'times';
        }
        return res.json(data);
    }

    // 取值
    async getProject(req, res, next){
        const pd_r = new ProjectData;
        var data = {};
        if(!req.query.pd_id || req.query.pd_id == ''){
            res.json('尚未傳入版型編號！')
        }
        await pd_r.getDataById(req.query.pd_id).then(result => {// 若寫入成功則回傳
            data = result;
        }, (err) => {// 若寫入失敗則回傳
            res.json('資料獲取失敗');
        })
        return res.json(data);
    }

    // 取值
    async getElements(req, res, next){
        const mr_r = new ModelRecord;
        const data = {};
        const startDate = new Date(Number(req.query.start));
        const sd = startDate.toISOString().split('T')[0];
        const endDate = new Date(Number(req.query.end));
        const ed = endDate.toISOString().split('T')[0];
        const arraydata = {
            startDate: sd,
            endDate: ed,
            orderBy: req.query.orderBy,
            sort:req.query.sort,
        }
        await mr_r.getIndexPieData(arraydata).then(result => {// 若寫入成功則回傳
            data.models_pie_list = result;
        }, (err) => {// 若寫入失敗則回傳
            data.models_pie_list = [];
        })
        data.projects_pie = []
        arraydata.pd_elements = 1;
        await mr_r.getCountByElement(arraydata).then(result => {// 若寫入成功則回傳
            data.projects_pie[0] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.projects_pie[0] = 0;
        })
        arraydata.pd_elements = 2;
        await mr_r.getCountByElement(arraydata).then(result => {// 若寫入成功則回傳
            data.projects_pie[1] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.projects_pie[1] = 0;
        })
        arraydata.pd_elements = 3;
        await mr_r.getCountByElement(arraydata).then(result => {// 若寫入成功則回傳
            data.projects_pie[2] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.projects_pie[2] = 0;
        })
        arraydata.pd_elements = 4;
        await mr_r.getCountByElement(arraydata).then(result => {// 若寫入成功則回傳
            data.projects_pie[3] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.projects_pie[3] = 0;
        })
        arraydata.pd_elements = 5;
        await mr_r.getCountByElement(arraydata).then(result => {// 若寫入成功則回傳
            data.projects_pie[4] = result;
        }, (err) => {// 若寫入失敗則回傳
            data.projects_pie[4] = 0;
        })
        return res.json(data);
    }

    // 新增
    async actionCreate(req, res, next){
        const pd_r = new ProjectData;
        const ct = new CommonTools;
        var data = {'result':true,'string':''};
        var pd_id = '';
        var boolean = true;
        if(!req.body.pd_num || req.body.pd_num == ''){
            boolean = false;
            data = {'result':false,'string':'尚未傳入網版名稱，新增失敗！'}
            res.json(data)
        }
        await pd_r.getDataByNum(req.body.pd_num).then(result => {// 若寫入成功則回傳
            if(result > 0){
                boolean = false;
                data = {'result':false,'string':'網版名稱已被使用，新增失敗！'}
                res.json(data)
            }
        }, (err) => {// 若寫入失敗則回傳
            data = {'result':false,'string':'資料獲取失敗'}
            res.json(data)
        })
        if(boolean){
            await pd_r.createGetId(req.body).then(result => {// 若寫入成功則回傳
                pd_id = result;
                data = {'result':true,'string':'新增成功'}
                res.json(data)
            }, (err) => {// 若寫入失敗則回傳
                data = {'result':false,'string':'新增失敗'}
                res.json(data)
            })
        }else{
            data = {'result':false,'string':'新增失敗'}
            res.json(data)
        }
        
    }

    // 修改
    async actionModify(req, res, next){
        const pd_r = new ProjectData;
        const ct = new CommonTools;
        var data = {'result':true,'string':''};
        var boolean = true;
        if(!req.body.pd_num || req.body.pd_num == ''){
            boolean = false;
            data = {'result':false,'string':'尚未傳入網版名稱，修改失敗！'}
            res.json(data)
        }
        await pd_r.getDataByIdNum(req.body.pd_num).then(result => {// 若寫入成功則回傳
            if(result.length > 0){
                boolean = false;
                data = {'result':false,'string':'網版名稱已被使用，修改失敗！'}
                res.json(data)
            }
        }, (err) => {// 若寫入失敗則回傳
            data = {'result':false,'string':'修改失敗！'}
            res.json(data)
        })
        if(boolean){
            await pd_r.update(req.body).then(result => {// 若寫入成功則回傳
                data = {'result':true,'string':'修改成功！'}
                res.json(data)
            }, (err) => {// 若寫入失敗則回傳
                data = {'result':false,'string':'修改失敗！'}
                res.json(data)
            })
        }
    }
    async actionModifyForModel(req, res, next){
        const pd_r = new ProjectData;
        const ms_r = new ModelSort;
        const ct = new CommonTools;
        var data = {'result':true,'string':''};
        var boolean = true;
        var sortdata = {};
        var arraydata = {};
        var ms_data = {}
        if(!req.body.pd_num || req.body.pd_num == ''){
            boolean = false;
            data = {'result':false,'string':'尚未傳入網版名稱，修改失敗！'}
            res.json(data)
        }
        await pd_r.getDataByNumForModel(req.body.pd_num).then(result => {// 若寫入成功則回傳
            arraydata.pd_id = result.pd_id;
        }, (err) => {// 若寫入失敗則回傳
            data = {'result':false,'string':'修改失敗！'}
            res.json(data)
        })
        if(boolean){
            if(req.body.hot_or_not){
                arraydata.pd_hot = 1;
                await pd_r.update(arraydata).then(result => {// 若寫入成功則回傳
                    
                }, (err) => {// 若寫入失敗則回傳
                    data = {'result':false,'string':'修改失敗！'}
                    res.json(data)
                })
                await ms_r.getLastOne().then(result => {// 若寫入成功則回傳
                    if(result){
                        sortdata.pd_id = arraydata.pd_id;
                        sortdata.ms_sort = result.ms_sort +1;
                    }else{
                        sortdata.pd_id = arraydata.pd_id;
                        sortdata.ms_sort = 1;
                    }
                    
                }, (err) => {// 若寫入失敗則回傳
                    data = {'result':false,'string':'修改失敗！'}
                    res.json(data)
                })
                await ms_r.create(sortdata).then(result => {// 若寫入成功則回傳
                    data = {'result':true,'string':'修改成功！'}
                    res.json(data)
                }, (err) => {// 若寫入失敗則回傳
                    data = {'result':false,'string':'修改失敗！'}
                    res.json(data)
                })
            }else{
                arraydata.pd_hot = 0;
                await pd_r.update(arraydata).then(result => {// 若寫入成功則回傳
                    
                }, (err) => {// 若寫入失敗則回傳
                    data = {'result':false,'string':'修改失敗！'}
                    res.json(data)
                })
                await ms_r.getDataByPdId(arraydata.pd_id).then(result => {// 若寫入成功則回傳
                    ms_data.ms_id = result.ms_id;
                }, (err) => {// 若寫入失敗則回傳
                    data = {'result':false,'string':'修改失敗！'}
                    res.json(data)
                })
                ms_data.last_update_user = 'bbin';
                ms_data.last_update_date = ct.whatTime();
                await ms_r.delete(ms_data).then(result => {// 若寫入成功則回傳
                    data = {'result':true,'string':'修改成功！'}
                    res.json(data)
                }, (err) => {// 若寫入失敗則回傳
                    data = {'result':false,'string':'修改失敗！'}
                    res.json(data)
                })
            }
        }else{
            data = {'result':false,'string':'修改失敗！'}
            res.json(data)
        }
    }

    // 刪除
    async actionDelete(req, res, next){
        const pd_r = new ProjectData;
        const ct = new CommonTools;
        var data = {'result':true,'string':''};
        var boolean = true;
        var arraydata = {};
        if(!req.body.pd_id || req.body.pd_id == ''){
            boolean = false;
            data = {'result':false,'string':'尚未傳入版型編號，無法刪除！'}
            res.json(data)
        }
        arraydata.pd_id = req.body.pd_id;
        arraydata.last_update_user = req.body.last_update_user;
        arraydata.last_update_date = ct.whatTime();
        if(boolean){
            await pd_r.delete(arraydata).then(result => {// 若寫入成功則回傳
                data = {'result':true,'string':'刪除成功！'}
                res.json(data)
            }, (err) => {// 若寫入失敗則回傳
                data = {'result':false,'string':'刪除失敗！'}
                res.json(data)
            })
        }else{
            data = {'result':false,'string':'刪除失敗！'}
                res.json(data)
        }
    }
}


module.exports = ProjectDataController;