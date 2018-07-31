const express=require('express');
const router=express.Router();

const signInController=require('./app/controller/signIn');
const loginController=require('./app/controller/login');
const userController=require('./app/controller/user');

/*router.use(function(req,res,next){
	console.log("req.local"+JSON.stringify(req.session.user));
	
	let user=req.session.user;
	console.log("res1"+user);

	res.locals.user=req.session.user;

	console.log("res.local"+res.locals.user);
	next();
})*/

router.post('/register',signInController.signIn);
router.post('/logSure',loginController.logOn);
router.get('/getuserdata',userController.getData);
router.post('/save/techInfo',userController.saveTechInfo);
router.post('/delete/techInfo',userController.deleteTechInfo);
router.get('/getstddata',userController.getStdData);
router.post('/save/stdInfo',userController.saveStdInfo);
router.post('/update/stdInfo',userController.updateStdInfo);
router.get('/gettecdata',userController.getTechData);
router.post('/save/stdGrade',userController.saveStdGrade);
router.get('/gettechgrade',userController.getTechGrade);
router.get('/getallgrade',userController.getAllgrade);

module.exports= router;