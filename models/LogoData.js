const db = require('./connection_db');

class LogoData {
	getAllData(arraydata){
        let result = {};
        return new Promise((resolve, reject) => {
            // 尋找是否有重複的account
            db.query('SELECT * FROM wms_logodata LEFT JOIN wms_logosort on wms_logodata.ld_id = wms_logosort.ld_id WHERE wms_logodata.isflag = 1 AND wms_logodata.ld_name LIKE "%'+arraydata.ld_name+'%" ORDER BY wms_logosort.ls_sort ASC', function (err, rows) {
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
    getDataById(ld_id){
        let result = {};
        return new Promise((resolve, reject) => {
            // 尋找是否有重複的account
            db.query('SELECT * FROM wms_logodata WHERE isflag = 1 AND ld_id = '+ld_id, function (err, rows) {
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    reject(false);
                    return;
                }
                result = rows[0];
                resolve(result);
            })
        })
	}
    getDataByIdName(ld_id,ld_name){
        return new Promise((resolve, reject) => {
            // 尋找是否有重複的account
            db.query('SELECT * FROM wms_logodata WHERE isflag = 1 AND ld_id != "'+ld_id+'" AND ld_name = "'+ld_name+'"', function (err, rows) {
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    reject(false);
                    return;
                }
                if(rows.length == 0){
                    reject(false);
                    return;
                }
                resolve(rows);
            })
        })
    }
    getDataByName(ld_name){
        return new Promise((resolve, reject) => {
            // 尋找是否有重複的account
            db.query('SELECT * FROM wms_logodata WHERE isflag = 1 AND ld_name = "'+ld_name+'"', function (err, rows) {
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    reject(false);
                    return;
                }
                resolve(rows);
            })
        })
    }
    delete(arraydata) {
        arraydata.isflag = 0;
        return new Promise((resolve, reject) => {
            db.query('UPDATE wms_logodata SET ? WHERE ld_id =' + arraydata.ld_id, arraydata , function(err, rows){
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    reject(false);
                    return;
                }
                resolve(true);
            })
        })
    }
    createGetId(arraydata) {
        return new Promise((resolve, reject) => {
            // 將資料寫入資料庫
            db.query('INSERT INTO wms_logodata SET ?', arraydata, function (err, rows) {
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    reject(false);
                    return;
                }
                // resolve(true);
            })
            // 尋找是否有重複的account
            db.query('SELECT MAX(ld_id) FROM wms_logodata WHERE isflag = 1', function (err, rows) {
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    reject(false);
                    return;
                }
                resolve(rows['MAX(ld_id)']);
            })
        })
    }
    create(arraydata) {
        let result = {};
        return new Promise((resolve, reject) => {
            // 尋找是否有重複的account
            db.query('SELECT ud_account FROM wms_logodata WHERE ud_account = ? AND isflag = 1', arraydata.ud_account, function (err, rows) {
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    reject(false);
                    return;
                }
                // 如果有重複的email
                if (rows.length >= 1) {
                    reject(false);
                    return;
                } else {
                    // 將資料寫入資料庫
                    db.query('INSERT INTO wms_logodata SET ?', arraydata, function (err, rows) {
                        // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                        if (err) {
                            reject(false);
                            return;
                        }
                        resolve(true);
                    })
                }
            })
        })
    }
    update(arraydata) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE wms_logodata SET ? WHERE ld_id =' + arraydata.ld_id, arraydata , function(err, rows){
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

module.exports = LogoData;
