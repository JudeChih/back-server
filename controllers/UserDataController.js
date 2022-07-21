const UserData = require('../models/UserData');
const CommonTools = require('../services/CommonTools');
const jwt = require('jsonwebtoken');
const config = require('../config/development_config');

class UserDataController {
    // 取值
    async getAllData(req, res, next){
        const ud_r = new UserData;
        const data = {};
        data.user = {};
        if(!req.query.ud_name || req.query.ud_name == ''){
            data.user.ud_name = '';
        }else{
            data.user.ud_name = req.query.ud_name;
        }
        await ud_r.getAllData(data.user).then(result => {// 若寫入成功則回傳
            data.user.users = result;
        }, (err) => {// 若寫入失敗則回傳
            data.user.users = [];
        })
        return res.json(data)
    }

    // 取值
	async getUsers(req, res, next){
        const ud_r = new UserData;
        const data = {};
        if(!req.query.ud_name || req.query.ud_name == ''){
            data.ud_name = '';
        }else{
            data.ud_name = req.query.ud_name;
        }
        await ud_r.getAllData(data).then(result => {// 若寫入成功則回傳
            data.users = result;
        }, (err) => {// 若寫入失敗則回傳
            data.users = [];
        })
        return res.json(data)
	}

    // 取值
    async getUser(req, res, next){
        const ud_r = new UserData;
        let data = {};
        if(!req.query.ud_id || req.query.ud_id == ''){
            res.json('尚未傳入使用者編號！')
        }
        await ud_r.getDataById(req.query.ud_id).then(result => {// 若寫入成功則回傳
            data = result;
        }, (err) => {// 若寫入失敗則回傳
            data = '資料獲取失敗';
        })
        return res.json(data)
	}

    // 取值
    async checkUser(req, res, next){
        const ct = new CommonTools;
        let data = {};
        let boolean = false;
        // 獲取client端資料
        const arraydata = {
            ud_account: req.body.user.ud_account,
            ud_password: req.body.user.ud_password,
        }
        // 抓取資料
        const ud_r = new UserData;
        await ud_r.getUserByLogin(arraydata).then(result => {// 若寫入成功則回傳
            data.user = result;
            boolean = true;
        }, (err) => {// 若寫入失敗則回傳
            res.json(false)
        })
        if(boolean){
            var token = jwt.verify(req.body.token, config.secret);
            // 超過登入時間
            if(Math.floor(Date.now() / 1000) > token.exp){
                return res.json(false);
            }
            // 產生token
            const new_token = jwt.sign({
                algorithm: 'HS256',
                exp: Math.floor(Date.now() / 1000) + (60 * 60), // token一個小時後過期。
                data: data.ud_id
            }, config.secret);
            data.token = new_token;
            return res.json(data);
        }else{
            return res.json(false);
        }
        
    }

    // 登入用
    async login(req, res, next){
        const ct = new CommonTools;
        let data = {'user':{},'token':''};
        let boolean = false;
        // 獲取client端資料
        const arraydata = {
            ud_account: req.body.ud_account,
            ud_password: req.body.ud_password,
        }
        // 抓取資料
        const ud_r = new UserData;
        await ud_r.getUserByLogin(arraydata).then(result => {// 若寫入成功則回傳
            data.user = result;
            boolean = true;
        }, (err) => {// 若寫入失敗則回傳
            res.json(false)
        })
        if(boolean){
            arraydata.ud_id = data.user.ud_id;
            arraydata.ud_last_login = ct.whatTime();
            const ud_r = new UserData;
            await ud_r.update(arraydata).then(result => {// 若寫入成功則回傳
                boolean = result;
            }, (err) => {// 若寫入失敗則回傳
                boolean = err;
            })
        }
        // 產生token
        const token = jwt.sign({
            algorithm: 'HS256',
            exp: Math.floor(Date.now() / 1000) + (60 * 60), // token一個小時後過期。
            data: data.ud_id
        }, config.secret);
        data.token = token;
        return res.json(data);
    }

    // 新增
    async actionCreate(req, res, next){
        const ct = new CommonTools;
        // 獲取client端資料
        const arraydata = {
            ud_name: req.body.ud_name,
            ud_account: req.body.ud_account,
            ud_password: req.body.ud_password,
            ud_status:req.body.ud_status,
            ud_admin:req.body.ud_admin,
            create_user:req.body.create_user,
            create_date: ct.whatTime()
        }
        // 將資料寫入資料庫
        const ud_r = new UserData;
        ud_r.create(arraydata).then(result => {// 若寫入成功則回傳
            res.json(result)
        }, (err) => {// 若寫入失敗則回傳
            res.json(err)
        })
    }

    // 修改
    async actionModifyPersonal(req, res, next){
        const ud_r = new UserData;
        const ct = new CommonTools;
        let data = {};
        const arraydata = {};
        if(!req.body.ud_id || req.body.ud_id == ''){
            res.json('尚未傳入使用者編號！')
        }else{
            arraydata.ud_id = req.body.ud_id;
        }
        if(req.body.ud_password){
            await ud_r.getDataByIdPwd(req.body.ud_id,req.body.ud_password).then(result => {// 若寫入成功則回傳
                if(result.length == 0){
                    res.json('舊密碼輸入錯誤！')
                }
            }, (err) => {// 若寫入失敗則回傳
                res.json('出現未知錯誤！')
            })
            arraydata.ud_password = req.body.ud_new_password;
        }
        arraydata.ud_name = req.body.ud_name;
        arraydata.last_update_user = req.body.last_update_user;
        arraydata.last_update_date = ct.whatTime();
        // 將資料寫入資料庫
        await ud_r.update(arraydata).then(result => {// 若寫入成功則回傳
            data = true;
        }, (err) => {// 若寫入失敗則回傳
            data = false;
        })
        if(data){
            await ud_r.getDataById(req.body.ud_id).then(result => {// 若寫入成功則回傳
                data = result;
            }, (err) => {// 若寫入失敗則回傳
                data = false;
            })
        }
        return res.json(data);
    }

    // 修改
    async actionModify(req, res, next){
        const ct = new CommonTools;
        var data = {'result':true,'string':''};
        var boolean = true;
        if(!req.body.ud_id || req.body.ud_id == ''){
            boolean = false;
            data = {'result':false,'string':'尚未傳入使用者編號！'}
            res.json(data)
        }
        // 獲取client端資料
        const arraydata = {};
        arraydata.ud_id = req.body.ud_id;
        if(req.body.ud_password != ''){
            arraydata.ud_password = req.body.ud_password;
        }
        arraydata.ud_status = req.body.ud_status;
        arraydata.ud_admin = req.body.ud_admin;
        arraydata.ud_name = req.body.ud_name;
        arraydata.last_update_user = req.body.last_update_user;
        arraydata.last_update_date = ct.whatTime();

        // 將資料寫入資料庫
        const ud_r = new UserData;
        ud_r.update(arraydata).then(result => {// 若寫入成功則回傳
            res.json(result)
        }, (err) => {// 若寫入失敗則回傳
            res.json(err)
        })
    }
    
    // 刪除
    async actionDelete(req, res, next){
        const ct = new CommonTools;
        var data = {'result':true,'string':''};
        var boolean = true;
        const arraydata = {};
        if(!req.body.ud_id || req.body.ud_id == ''){
            boolean = false;
            data = {'result':false,'string':'尚未傳入使用者編號！'}
            res.json(data)
        }else{
            arraydata.ud_id = req.body.ud_id;
            arraydata.last_update_user = req.body.last_update_user;
            arraydata.last_update_date = ct.whatTime();
        }
        // 將資料寫入資料庫
        if(boolean){
            const ud_r = new UserData;
            ud_r.delete(arraydata).then(result => {// 若寫入成功則回傳
                data = {'result':true,'string':'刪除成功！'}
                res.json(data)
            }, (err) => {// 若寫入失敗則回傳
                data = {'result':true,'string':'刪除失敗！'}
                res.json(data)
            })
        }else{
            data = {'result':true,'string':'刪除失敗！'}
            res.json(data)
        }
        
    }
}

module.exports = UserDataController;
