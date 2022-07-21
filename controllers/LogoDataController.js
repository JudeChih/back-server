const LogoData = require('../models/LogoData');
const LogoSort = require('../models/LogoSort');
const CommonTools = require('../services/CommonTools');

class LogoDataController {
    async getAllData(req, res, next){
        const ls_r = new LogoSort;
        const data = {};
        const arraydata = {};
        arraydata.ld_name = '';
        data.logo = {};

        await ls_r.getAllData(arraydata.ld_name).then(result => {// 若寫入成功則回傳
            data.logo.logos = result;
        }, (err) => {// 若寫入失敗則回傳
            data.logo.logos = [];
        })
        return res.json(data)
    }

	async getLogos(req, res, next){
        const ls_r = new LogoSort;
        const data = {};
        if(!req.query.ld_name || req.query.ld_name == ''){
            data.ld_name = '';
        }else{
            data.ld_name = req.query.ld_name;
        }
        await ls_r.getAllData(data.ld_name).then(result => {// 若寫入成功則回傳
            data.logos = result;
        }, (err) => {// 若寫入失敗則回傳
            data.logos = [];
        })
        return res.json(data)
	}

    async getLogo(req, res, next){
        const ld_r = new LogoData;
        let data = {};
        if(!req.query.ld_id || req.query.ld_id == ''){
            res.json('尚未傳入合作夥伴編號！')
        }
        await ld_r.getDataById(req.query.ld_id).then(result => {// 若寫入成功則回傳
            data = result;
        }, (err) => {// 若寫入失敗則回傳
            data = '資料獲取失敗';
        })
        return res.json(data)
	}

    // 新增
    async actionCreate(req, res, next){
        const ld_r = new LogoData;
        const ls_r = new LogoSort;
        const number = 0;
        const arraydata = {};
        if(!req.body.ld_name || req.body.ld_name == ''){
            res.json('尚未傳入合作夥伴名稱，新增失敗！')
        }
        await ld_r.getDataByName(req.body.ld_name).then(result => {// 若寫入成功則回傳
            if(result.length > 0){
                res.json('合作夥伴名稱已被使用，新增失敗！')
            }
        }, (err) => {// 若寫入失敗則回傳
            res.json(false)
        })
        // 將資料寫入資料庫
        await ld_r.createGetId(req.body).then(result => {// 若寫入成功則回傳
            number = result;
        }, (err) => {// 若寫入失敗則回傳
            res.json(false)
        })
        await ls_r.getLastOne().then(result => {// 若寫入成功則回傳
            arraydata.ld_id = number;
            arraydata.ls_sort = result.ls_sort + 1;
        }, (err) => {// 若寫入失敗則回傳
            res.json(false)
        })
        await ls_r.create(arraydata).then(result => {// 若寫入成功則回傳
            res.json(result)
        }, (err) => {// 若寫入失敗則回傳
            res.json(false)
        })
    }

    // 修改
    async actionModify(req, res, next){
        const ld_r = new LogoData;
        const ct = new CommonTools;
        const arraydata = req.body;
        if(!req.body.ld_name || req.body.ld_name == ''){
            res.json('尚未傳入合作夥伴名稱，修改失敗！')
        }
        await ld_r.getDataByIdName(req.body.ld_id,req.body.ld_name).then(result => {// 若寫入成功則回傳
            if(result.length > 0){
                res.json('合作夥伴名稱已被使用，修改失敗！')
            }
        }, (err) => {// 若寫入失敗則回傳
            res.json(false)
        })
        arraydata.last_update_user = req.body.last_update_user;
        arraydata.last_update_date = ct.whatTime();
        // 將資料寫入資料庫
        await ld_r.update(arraydata).then(result => {// 若寫入成功則回傳
            res.json(result)
        }, (err) => {// 若寫入失敗則回傳
            res.json(false)
        })
    }

    // 修改
    async actionSortModify(req, res, next){
        const ls_r = new LogoSort;
        var boolean = false;
        await ls_r.reset().then(result => {// 若寫入成功則回傳
            boolean = result;
        }, (err) => {// 若寫入失敗則回傳
            res.json(err)
        })
        if(boolean){
            for (let i = 0; i < req.body.length; i++) {
                var dd = {};
                dd.ld_id = req.body[i].ld_id;
                dd.ls_sort = i + 1;
                await ls_r.create(dd).then(result => {// 若寫入成功則回傳
                    // boolean = result;
                }, (err) => {// 若寫入失敗則回傳
                    res.json(err)
                })
            }
            if(boolean){
                res.json(true)
            }else{
                res.json(false)
            }
        }else{
            res.json(false)
        }
    }

    // 刪除
    async actionDelete(req, res, next){
        const ld_r = new LogoData;
        const ls_r = new LogoSort;
        const ct = new CommonTools;
        const boolean = false;
        const arraydata = {};
        if(!req.body.ld_id || req.body.ld_id == ''){
            res.json('尚未傳入合作夥伴編號，無法刪除！')
        }else{
            arraydata.ld_id = req.body.ld_id;
            arraydata.last_update_user = req.body.last_update_user;
            arraydata.last_update_date = ct.whatTime();
        }
        // 將資料寫入資料庫
        await ld_r.delete(arraydata).then(result => {// 若寫入成功則回傳
            boolean = result
        }, (err) => {// 若寫入失敗則回傳
            res.json(false)
        })
        if(boolean){
            await ls_r.delete(arraydata).then(result => {// 若寫入成功則回傳
                res.json(true);
            }, (err) => {// 若寫入失敗則回傳
                res.json(false)
            })
        }else{
            res.json(false)
        }
    }
}


module.exports = LogoDataController;
