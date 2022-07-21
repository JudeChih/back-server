const db = require('./connection_db');

class ModelSort {
	getAllData(){
        return new Promise((resolve, reject) => {
            // 尋找是否有重複的account
            db.query('SELECT wms_modelsort.*,wms_projectdata.pd_view_img,wms_projectdata.pd_num FROM wms_modelsort LEFT JOIN wms_projectdata ON wms_modelsort.pd_id = wms_projectdata.pd_id WHERE wms_projectdata.isflag = 1 AND wms_modelsort.isflag = 1 ORDER BY wms_modelsort.ms_sort ASC', function (err, rows) {
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    reject(false);
                    return;
                }
                // 若寫入資料庫成功，則回傳給clinet端下：
                resolve(rows);
            })
        })
	}
    reset(){
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM wms_modelsort' , function(err, rows){
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    reject(false);
                    return;
                }
                resolve(true);
            })
        })
    }
    getDataByPdId(pd_id){
        let result = {};
        return new Promise((resolve, reject) => {
            // 尋找是否有重複的account
            db.query('SELECT * FROM wms_modelsort WHERE isflag = 1 AND pd_id = ?',pd_id, function (err, rows) {
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
    getLastOne(){
        let result = {};
        return new Promise((resolve, reject) => {
            // 尋找是否有重複的account
            db.query('SELECT * FROM wms_modelsort WHERE isflag = 1 ORDER BY ms_sort DESC', function (err, rows) {
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
            db.query('UPDATE wms_modelsort SET ? WHERE ms_id =' + arraydata.ms_id, arraydata , function(err, rows){
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
            db.query('INSERT INTO wms_modelsort SET ?', arraydata, function (err, rows) {
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    reject(false);
                    return;
                }
                resolve(true);
            })
        })
    }
    update(arraydata) {
        let result = {};
        return new Promise((resolve, reject) => {
            db.query('UPDATE wms_modelsort SET ? WHERE ms_id =' + arraydata.ms_id, arraydata , function(err, rows){
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

module.exports = ModelSort;
