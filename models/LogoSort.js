const db = require('./connection_db');

class LogoSort {
	getAllData(ld_name){
        let result = {};
        return new Promise((resolve, reject) => {
            // 尋找是否有重複的account
            db.query('SELECT * FROM wms_logosort LEFT JOIN wms_logodata ON wms_logosort.ld_id = wms_logodata.ld_id WHERE wms_logodata.isflag = 1 AND wms_logodata.ld_name LIKE "%'+ld_name+'%" ORDER BY wms_logosort.ls_sort ASC', function (err, rows) {
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    reject(false);
                    return;
                }
                // 若寫入資料庫成功，則回傳給clinet端下：
                result = rows;
                resolve(result);
            })
        })
	}
    reset(){
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM wms_logosort ' , function(err, rows){
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    reject(false);
                    return;
                }
                resolve(true);
            })
        })
    }
    getLastOne(){
        let result = {};
        return new Promise((resolve, reject) => {
            // 尋找是否有重複的account
            db.query('SELECT * FROM wms_logosort WHERE isflag = 1 ORDER BY ls_sort DESC', function (err, rows) {
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    reject(false);
                    return;
                }
                // 若寫入資料庫成功，則回傳給clinet端下：
                result = rows[0];
                resolve(result);
            })
        })
    }
    delete(arraydata) {
        arraydata.isflag = 0;
        return new Promise((resolve, reject) => {
            db.query('UPDATE wms_logosort SET ? WHERE ld_id =' + arraydata.ld_id, arraydata , function(err, rows){
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    reject(false);
                    return;
                }
                resolve(true);
            })
        })
    }
    create(arraydata) {
        let result = {};
        return new Promise((resolve, reject) => {
            // 將資料寫入資料庫
            db.query('INSERT INTO wms_logosort SET ?', arraydata, function (err, rows) {
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

module.exports = LogoSort;
