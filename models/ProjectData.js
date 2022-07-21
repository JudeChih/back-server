const db = require('./connection_db');

class ProjectData {
    getAllData(arraydata){
        let string = 'SELECT * FROM wms_projectdata WHERE isflag = 1 AND pd_rwd = 0';
        if(arraydata.pd_num){
            string = string + ' AND pd_num LIKE "%'+arraydata.pd_num+'%"';
        }else if(arraydata.checked){
            string = string + ' AND pd_show = 1 AND pd_date < '+ arraydata.startDate;
        }
        string = string + ' ORDER BY ' + arraydata.orderBy + ' ' + arraydata.sort;
        return new Promise((resolve, reject) => {
            db.query(string, function (err, rows) {
                if (err) {
                    reject(false);
                    return;
                }
                resolve(rows);
            })
        })
    }

    getDataByIdNum(pd_id,pd_num){
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM wms_projectdata WHERE isflag = 1 AND pd_id != "'+pd_id+'" AND pd_num = "'+pd_num+'"', function (err, rows) {
                if (err) {
                    reject(false);
                    return;
                }
                resolve(rows);
            })
        })
    }

    getDataById(pd_id){
        var result = {};
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM wms_projectdata WHERE isflag = 1 AND pd_id = ?',pd_id, function (err, rows) {
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

    getDataByNotHot(){
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM wms_projectdata WHERE isflag = 1 AND pd_hot = 0', function (err, rows) {
                if (err) {
                    reject(false);
                    return;
                }
                resolve(rows);
            })
        })
    }

    getDataByNum(pd_num){
        var result = {};
        return new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) FROM wms_projectdata WHERE isflag = 1 AND pd_num = ?',pd_num, function (err, rows) {
                if (err) {
                    reject(false);
                    return;
                }
                // console.log(rows)
                result = rows[0]['COUNT(*)'];
                var string=JSON.stringify(result); 
                var data = JSON.parse(string)
                resolve(data);
            })
        })
    }

    getDataByNumForModel(pd_num){
        let result = {};
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM wms_projectdata WHERE isflag = 1 AND pd_num = ?',pd_num, function (err, rows) {
                if (err) {
                    reject(false);
                    return;
                }
                result = rows[0];
                resolve(result);
            })
        })
    }

	getAdaptiveCount(){
        let result = {};
        return new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) FROM wms_projectdata WHERE isflag = 1 AND pd_rwd = 0', function (err, rows) {
                if (err) {
                    reject(false);
                    return;
                }
                result = rows[0]['COUNT(*)'];
                resolve(result);
            })
        })
    }

    getAdaptiveShowCount(){
        let result = {};
        return new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) FROM wms_projectdata WHERE isflag = 1 AND pd_rwd = 0 AND pd_show = 1', function (err, rows) {
                if (err) {
                    reject(false);
                    return;
                }
                result = rows[0]['COUNT(*)'];
                resolve(result);
            })
        })
    }

    getAdaptiveHideCount(){
        let result = {};
        return new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) FROM wms_projectdata WHERE isflag = 1 AND pd_rwd = 0 AND pd_show = 0', function (err, rows) {
                if (err) {
                    reject(false);
                    return;
                }
                result = rows[0]['COUNT(*)'];
                resolve(result);
            })
        })
    }

    getAdaptiveOffCount(){
        let result = {};
        return new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) FROM wms_projectdata WHERE isflag = 1 AND pd_rwd = 0 AND pd_show = 2', function (err, rows) {
                if (err) {
                    reject(false);
                    return;
                }
                result = rows[0]['COUNT(*)'];
                resolve(result);
            })
        })
    }

    getAdaptiveElementCount(pd_elements){
        let result = {};
        return new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) FROM wms_projectdata WHERE isflag = 1 AND pd_rwd = 0 AND pd_elements = ?',pd_elements, function (err, rows) {
                if (err) {
                    reject(false);
                    return;
                }
                result = rows[0]['COUNT(*)'];
                resolve(result);
            })
        })
    }

    getAdaptiveElementSubCount(pd_elements_sub){
        let result = {};
        return new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) FROM wms_projectdata WHERE isflag = 1 AND pd_rwd = 0 AND pd_elements_sub = ?',pd_elements_sub, function (err, rows) {
                if (err) {
                    reject(false);
                    return;
                }
                result = rows[0]['COUNT(*)'];
                resolve(result);
            })
        })
    }

    getAdaptiveTypeCount(pd_type){
        let result = {};
        return new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) FROM wms_projectdata WHERE isflag = 1 AND pd_rwd = 0 AND pd_type = ?',pd_type, function (err, rows) {
                if (err) {
                    reject(false);
                    return;
                }
                result = rows[0]['COUNT(*)'];
                resolve(result);
            })
        })
    }

    getAdaptiveStyleCount(pd_style){
        let result = {};
        return new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) FROM wms_projectdata WHERE isflag = 1 AND pd_rwd = 0 AND pd_style = ?',pd_style, function (err, rows) {
                if (err) {
                    reject(false);
                    return;
                }
                result = rows[0]['COUNT(*)'];
                resolve(result);
            })
        })
    }

    getAdaptiveColorCount(pd_colors){
        let result = {};
        return new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) FROM wms_projectdata WHERE isflag = 1 AND pd_rwd = 0 AND pd_colors LIKE "%'+pd_colors+'%"', function (err, rows) {
                if (err) {
                    reject(false);
                    return;
                }
                result = rows[0]['COUNT(*)'];
                resolve(result);
            })
        })
    }

    delete(arraydata) {
        arraydata.isflag = 0;
        return new Promise((resolve, reject) => {
            db.query('UPDATE wms_projectdata SET ? WHERE pd_id =' + arraydata.pd_id, arraydata , function(err, rows){
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
        var result = {};
        return new Promise((resolve, reject) => {
            // 將資料寫入資料庫
            db.query('INSERT INTO wms_projectdata SET ?', arraydata, function (err, rows) {
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    reject(false);
                    return;
                }
                result = rows;
                var string=JSON.stringify(result); 
                var data = JSON.parse(string)
                resolve(data.insertId);
            })
        })
    }

    update(arraydata){
        return new Promise((resolve, reject) => {
            db.query('UPDATE wms_projectdata SET ? WHERE pd_id =' + arraydata.pd_id, arraydata , function(err, rows){
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

module.exports = ProjectData;