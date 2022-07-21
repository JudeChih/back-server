const SystemParameter = require('../models/SystemParameter');
const CommonTools = require('../services/CommonTools');

class SystemPartameterController {
    async getModelSetting(req, res, next){
        const sp_r = new SystemParameter;
        const data = {'mod':{},'date':{}};
        await sp_r.getDataByKey('熱門排行-固定版型').then(result => {// 若寫入成功則回傳
            data.mod = result;
        }, (err) => {// 若寫入失敗則回傳
            res.json('資料獲取失敗');
        })
        await sp_r.getDataByKey('熱門排行-時間區間').then(result => {// 若寫入成功則回傳
            data.date = result;
        }, (err) => {// 若寫入失敗則回傳
            res.json('資料獲取失敗');
        })
        return res.json(data)
    }

	async getSignSetting(req, res, next){
        const sp_r = new SystemParameter;
        const data = {'sign_fire':{},'sign_water':{},'sign_wind':{},'sign_earth':{}};
        await sp_r.getDataByKey('星座-火象').then(result => {// 若寫入成功則回傳
            data.sign_fire = result;
        }, (err) => {// 若寫入失敗則回傳
            res.json('火象資料獲取失敗');
        })
        await sp_r.getDataByKey('星座-水象').then(result => {// 若寫入成功則回傳
            data.sign_water = result;
        }, (err) => {// 若寫入失敗則回傳
            res.json('水象資料獲取失敗');
        })
        await sp_r.getDataByKey('星座-風象').then(result => {// 若寫入成功則回傳
            data.sign_wind = result;
        }, (err) => {// 若寫入失敗則回傳
            res.json('風象資料獲取失敗');
        })
        await sp_r.getDataByKey('星座-土象').then(result => {// 若寫入成功則回傳
            data.sign_earth = result;
        }, (err) => {// 若寫入失敗則回傳
            res.json('土象資料獲取失敗');
        })
        return res.json(data)
	}

    // 修改
    async actionModelModify(req, res, next){
        const sp_r = new SystemParameter;
        // 將資料寫入資料庫
        await sp_r.update(req.body.date).then(result => {// 若寫入成功則回傳
            
        }, (err) => {// 若寫入失敗則回傳
            res.json('修改失敗！')
        })
        await sp_r.update(req.body.mod).then(result => {// 若寫入成功則回傳
            res.json(true);
        }, (err) => {// 若寫入失敗則回傳
            res.json('修改失敗！')
        })
    }

    // 修改
    async actionSignModify(req, res, next){
        const sp_r = new SystemParameter;
        await sp_r.update(req.body).then(result => {// 若寫入成功則回傳
            res.json(true);
        }, (err) => {// 若寫入失敗則回傳
            res.json('修改失敗！')
        })
    }
}


module.exports = SystemPartameterController;
