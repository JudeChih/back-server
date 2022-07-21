const db = require('./connection_db');

class TransactionRecord {
    
	getAllData(){
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM wms_transaction_record WHERE isflag = 1 ORDER BY tr_id DESC',function (err, rows) {
                if (err) {
                    reject(false);
                    return;
                }
                resolve(rows);
            })
        })
    }

    create(arraydata){
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO wms_transaction_record SET ?', arraydata, function (err, rows) {
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    reject(false);
                    return;
                }
                resolve(true);
            })
        });
    }
}

module.exports = TransactionRecord;