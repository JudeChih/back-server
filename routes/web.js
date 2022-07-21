var express = require('express');
var router = express.Router();
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// 首頁
const Index = require('../controllers/IndexController');
index = new Index();
// 取值
router.get('/index-all-data', index.getAllData);

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// 版型
const Project = require('../controllers/ProjectDataController');
project = new Project();
// 取值
router.get('/project-all-data', project.getAllData);
router.get('/projects', project.getProjects);
router.get('/project', project.getProject);
router.get('/elements', project.getElements);
// 功能
router.post('/project-create', project.actionCreate);
router.post('/project-modify', project.actionModify);
router.post('/project-modify-for-model', project.actionModifyForModel);
router.post('/project-delete', project.actionDelete);


/////////////////////////////////////////////////////////////////////////////////////////////////////////
// 選中(熱門)
const Model = require('../controllers/ModelRecordController');
model = new Model();
// 取值
router.get('/model-all-data', model.getAllData);
router.get('/models', model.getModels);
router.get('/nothotprojects', model.getNotHotProjects);
router.get('/modelsort', model.getSorts);
router.get('/signsforindex', model.getSignsForIndex);
router.get('/hots', model.getHots);
router.get('/linemodels', model.getLineModels);
// 功能
router.post('/model-create', model.actionCreate);
router.post('/model-modify', model.actionModify);
router.post('/modelsort-modify', model.actionSortModify);
router.post('/model-delete', model.actionDelete);


/////////////////////////////////////////////////////////////////////////////////////////////////////////
// 合作夥伴
const Logo = require('../controllers/LogoDataController');
logo = new Logo();
// 取值
router.get('/logo-all-data', logo.getAllData);
router.get('/logos', logo.getLogos);
router.get('/logo', logo.getLogo);
// 功能
router.post('/logo-create', logo.actionCreate);
router.post('/logo-modify', logo.actionModify);
router.post('/logosort-modify', logo.actionSortModify);
router.post('/logo-delete', logo.actionDelete);

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// 異動紀錄
const Transaction = require('../controllers/TransactionRecordController');
transaction = new Transaction();
// 取值
router.get('/transaction-all-data', transaction.getAllData);

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// 使用者
const User = require('../controllers/UserDataController');
user = new User();
// 取值
router.get('/user-all-data', user.getAllData);
router.get('/user', user.getUser);
router.get('/users', user.getUsers);
// 功能
router.post('/user-check', user.checkUser);
router.post('/login', user.login);
router.post('/user-create', user.actionCreate);
router.post('/user-modify', user.actionModify);
router.post('/user-modify-personal', user.actionModifyPersonal);
router.post('/user-delete', user.actionDelete);

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// 系統參數
const System = require('../controllers/SystemPartameterController');
system = new System();
// 取值
router.get('/system-model-setting', system.getModelSetting);
router.get('/signs', system.getSignSetting);
// 功能
router.post('/system-model-modify', system.actionModelModify);
router.post('/system-sign-modify', system.actionSignModify);

/////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = router;
