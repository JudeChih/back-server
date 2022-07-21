const db = require('./connection_db');

class UserData {
	getAllData(arraydata){
        let result = {};
        return new Promise((resolve, reject) => {
            // 尋找是否有重複的account
            db.query('SELECT * FROM wms_userdata WHERE isflag = 1 AND ( ud_name LIKE "%'+arraydata.ud_name+'%" OR ud_account LIKE "%'+arraydata.ud_name+'%") ORDER BY create_date DESC', function (err, rows) {
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
    getDataById(ud_id){
        let result = {};
        return new Promise((resolve, reject) => {
            // 尋找是否有重複的account
            db.query('SELECT * FROM wms_userdata WHERE isflag = 1 AND ud_id = '+ud_id, function (err, rows) {
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
    getUserByLogin(arraydata){
        let result = {};
        return new Promise((resolve, reject) => {
            // 尋找是否有重複的account
            db.query('SELECT * FROM wms_userdata WHERE isflag = 1 AND ud_account = "'+arraydata.ud_account+'" AND ud_password = "'+arraydata.ud_password+'"', function (err, rows) {
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    reject(false);
                    return;
                }
                if(rows.length == 0){
                    reject(false);
                    return;
                }
                result = rows[0];
                resolve(result);
            })
        })
    }
    getAllUserLastLogin(){
        return new Promise((resolve, reject) => {
            // 尋找是否有重複的account
            db.query('SELECT * FROM wms_userdata WHERE isflag = 1 AND ud_last_login != "null" ORDER BY ud_last_login DESC', function (err, rows) {
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
    getDataByIdPwd(ud_id,ud_password){
        let result = {};
        return new Promise((resolve, reject) => {
            // 尋找是否有重複的account
            db.query('SELECT * FROM wms_userdata WHERE isflag = 1 AND ud_id = "'+ud_id+'" AND ud_password = "'+ud_password+'"', function (err, rows) {
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
    delete(arraydata) {
        let result = {};
        arraydata.isflag = 0;
        return new Promise((resolve, reject) => {
            db.query('UPDATE wms_userdata SET ? WHERE ud_id =' + arraydata.ud_id, arraydata , function(err, rows){
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
            // 尋找是否有重複的account
            db.query('SELECT ud_account FROM wms_userdata WHERE ud_account = ? AND isflag = 1', arraydata.ud_account, function (err, rows) {
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
                    db.query('INSERT INTO wms_userdata SET ?', arraydata, function (err, rows) {
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
        let result = {};
        return new Promise((resolve, reject) => {
            db.query('UPDATE wms_userdata SET ? WHERE ud_id =' + arraydata.ud_id, arraydata , function(err, rows){
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

module.exports = UserData;
