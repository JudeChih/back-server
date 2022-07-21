const db = require('./connection_db');

class SystemParameter {
	getDataByKey(sp_parameterkey){
        let result = {};
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM wms_systemparameter WHERE isflag = 1 AND sp_parameterkey = ?',sp_parameterkey, function (err, rows) {
                if (err) {
                    reject(false);
                    return;
                }
                result = rows[0];
                var string=JSON.stringify(result); 
                var data = JSON.parse(string)
                resolve(data);
            })
        })
    }
    update(arraydata) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE wms_systemparameter SET ? WHERE sp_id =' + arraydata.sp_id, arraydata , function(err, rows){
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    reject(false);
                    return;
                }
                resolve(true);
            })
        })
    }
}

module.exports = SystemParameter;