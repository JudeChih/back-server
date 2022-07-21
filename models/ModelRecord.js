const db = require('./connection_db');

class ModelRecord {
    getAllData(arraydata){
        let result = {};
        return new Promise((resolve, reject) => {
            db.query('SELECT wms_modelrecord.mr_id,wms_modelrecord.mr_date,wms_modelrecord.pd_id,wms_projectdata.pd_num,wms_projectdata.pd_view_img,wms_projectdata.pd_elements,wms_projectdata.pd_colors,wms_projectdata.pd_date FROM wms_modelrecord LEFT JOIN wms_projectdata ON wms_modelrecord.pd_id = wms_projectdata.pd_id WHERE wms_modelrecord.isflag = 1 AND wms_projectdata.pd_show = 1 AND wms_modelrecord.mr_date BETWEEN "'+arraydata.startDate+'" AND "'+arraydata.endDate+'" ORDER BY '+arraydata.orderBy+' '+arraydata.sort, function (err, rows) {
                if (err) {
                    reject(false);
                    return;
                }
                result = rows;
                var string=JSON.stringify(result); 
                var data = JSON.parse(string)
                resolve(data);
            })
        })
    }

    getIndexPieData(arraydata){
        let result = {};
        return new Promise((resolve, reject) => {
            db.query('SELECT wms_projectdata.pd_elements,wms_projectdata.pd_colors,wms_projectdata.pd_date,wms_projectdata.pd_num,wms_projectdata.pd_id,wms_modelrecord.mr_date FROM wms_modelrecord LEFT JOIN wms_projectdata ON wms_modelrecord.pd_id = wms_projectdata.pd_id WHERE wms_modelrecord.isflag = 1 AND wms_modelrecord.mr_date BETWEEN "'+arraydata.startDate+'" AND "'+arraydata.endDate+'" ORDER BY '+arraydata.orderBy+' '+arraydata.sort, function (err, rows) {
                if (err) {
                    reject(false);
                    return;
                }
                result = rows;
                resolve(result);
            })
        })
    }

    getCountByElement(arraydata){
        let result = {};
        return new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) FROM wms_modelrecord LEFT JOIN wms_projectdata ON wms_modelrecord.pd_id = wms_projectdata.pd_id WHERE wms_modelrecord.isflag = 1 AND wms_projectdata.pd_elements = '+arraydata.pd_elements+' AND wms_modelrecord.mr_date BETWEEN "'+arraydata.startDate+'" AND "'+arraydata.endDate+'" ORDER BY '+arraydata.orderBy+' '+arraydata.sort, function (err, rows) {
                if (err) {
                    reject(false);
                    return;
                }
                result = rows[0]['COUNT(*)'];
                resolve(result);
            })
        })
    }

    getIndexSignData(arraydata){
        let result = {};
        return new Promise((resolve, reject) => {
            db.query('SELECT wms_projectdata.pd_colors,wms_projectdata.pd_id,wms_projectdata.pd_num,wms_modelrecord.mr_date FROM wms_modelrecord LEFT JOIN wms_projectdata ON wms_modelrecord.pd_id = wms_projectdata.pd_id WHERE wms_modelrecord.isflag = 1 AND wms_projectdata.isflag = 1 AND wms_modelrecord.mr_date BETWEEN "'+arraydata.startDate+'" AND "'+arraydata.endDate+'" ORDER BY '+arraydata.orderBy+' '+arraydata.sort, function (err, rows) {
                if (err) {
                    reject(false);
                    return;
                }
                result = rows;
                resolve(result);
            })
        })
    }

    getDataBeforeYear(arraydata){
        return new Promise((resolve, reject) => {
            db.query('SELECT DISTINCT pd_id FROM wms_modelrecord WHERE isflag = 1 AND mr_date BETWEEN "'+arraydata.startDate+'" AND "'+arraydata.endDate+'"', function (err, rows) {
                if (err) {
                    reject(false);
                    return;
                }
                resolve(rows);
            })
        })
    }

    getCountByYear(arraydata){
        let result = {};
        return new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) FROM wms_modelrecord WHERE isflag = 1 AND mr_date BETWEEN "'+arraydata.startDate+'" AND "'+arraydata.endDate+'"', function (err, rows) {
                if (err) {
                    reject(false);
                    return;
                }
                result = rows[0]['COUNT(*)'];
                resolve(result);
            })
        })
    }

    getAllDataOrderByPdNum(arraydata){
        let result = {};
        return new Promise((resolve, reject) => {
            db.query('SELECT wms_modelrecord.pd_id,wms_projectdata.pd_num,wms_projectdata.pd_view_img FROM wms_modelrecord LEFT JOIN wms_projectdata ON wms_modelrecord.pd_id = wms_projectdata.pd_id WHERE wms_modelrecord.isflag = 1  AND wms_modelrecord.mr_date BETWEEN "'+arraydata.startDate+'" AND "'+arraydata.endDate+'" ORDER BY wms_projectdata.pd_num DESC', function (err, rows) {
                if (err) {
                    reject(false);
                    return;
                }
                result = rows;
                resolve(result);
            })
        })
    }

    getAllDataInDataBase(arraydata){
        let result = {};
        if(arraydata.show == 0){
            var string = 'SELECT wms_modelrecord.mr_id,wms_modelrecord.mr_date,wms_modelrecord.pd_id,wms_projectdata.pd_num,wms_projectdata.pd_view_img,wms_projectdata.pd_elements,wms_projectdata.pd_colors,wms_projectdata.pd_date FROM wms_modelrecord LEFT JOIN wms_projectdata ON wms_modelrecord.pd_id = wms_projectdata.pd_id WHERE wms_modelrecord.isflag = 1  AND wms_modelrecord.mr_date BETWEEN "'+arraydata.startDate+'" AND "'+arraydata.endDate+'" ORDER BY '+arraydata.orderBy+' '+arraydata.sort;
        }else{
            var string = 'SELECT wms_modelrecord.mr_id,wms_modelrecord.mr_date,wms_modelrecord.pd_id,wms_projectdata.pd_num,wms_projectdata.pd_view_img,wms_projectdata.pd_elements,wms_projectdata.pd_colors,wms_projectdata.pd_date FROM wms_modelrecord LEFT JOIN wms_projectdata ON wms_modelrecord.pd_id = wms_projectdata.pd_id WHERE wms_modelrecord.isflag = 1 AND wms_projectdata.pd_show = 1 AND wms_modelrecord.mr_date BETWEEN "'+arraydata.startDate+'" AND "'+arraydata.endDate+'" ORDER BY '+arraydata.orderBy+' '+arraydata.sort;
        }
        return new Promise((resolve, reject) => {
            db.query(string, function (err, rows) {
                if (err) {
                    reject(false);
                    return;
                }
                result = rows;
                resolve(result);
            })
        })
    }

    delete(arraydata) {
        arraydata.isflag = 0;
        return new Promise((resolve, reject) => {
            db.query('UPDATE wms_modelrecord SET ? WHERE mr_id =' + arraydata.mr_id, arraydata , function(err, rows){
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    reject(false);
                    return;
                }
                resolve(true);
            })
        })
    }

    createGetId(arraydata){
        return new Promise((resolve, reject) => {
            // 將資料寫入資料庫
            db.query('INSERT INTO wms_modelrecord SET ?', arraydata, function (err, rows) {
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    reject(false);
                    return;
                }
                // resolve(true);
            })
            // 尋找是否有重複的account
            db.query('SELECT MAX(mr_id) FROM wms_modelrecord WHERE isflag = 1', function (err, rows) {
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    reject(false);
                    return;
                }
                resolve(rows['MAX(mr_id)']);
            })
        })
    }

    update(arraydata) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE wms_modelrecord SET ? WHERE mr_id =' + arraydata.mr_id, arraydata , function(err, rows){
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

module.exports = ModelRecord;