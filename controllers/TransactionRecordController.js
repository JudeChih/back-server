const TransactionRecord = require('../models/TransactionRecord');
const UserData = require('../models/UserData');

class TransactionRecordController {
    async getAllData(req, res, next){
        const tr_r = new TransactionRecord;
        const ud_r = new UserData;
        const data = {'transaction':{'records':{},'lastlogins':{}}};
        await tr_r.getAllData().then(result => {// 若寫入成功則回傳
            data.transaction.records = result;
        }, (err) => {// 若寫入失敗則回傳
            res.json('資料獲取失敗');
        })
        await ud_r.getAllUserLastLogin().then(result => {// 若寫入成功則回傳
            data.transaction.lastlogins = result;
        }, (err) => {// 若寫入失敗則回傳
            res.json('資料獲取失敗');
        })
        return res.json(data)
    }
}


module.exports = TransactionRecordController;
