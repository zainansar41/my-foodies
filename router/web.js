const express=require('express')
const foodies=require('../controller/foodcon.js')
const router=express.Router();

router.get('/',foodies.mainPage)
router.get('/uploadRecipe',foodies.submitPage)
router.post('/uploadRecipe',foodies.submit)
router.get('/showRegionFoods/:name',foodies.showRegionFoods)
router.get('/search',foodies.ShowSearchRecipe)
router.get('/category/:name',foodies.category)
router.get('/showRecipe/:id',foodies.ShowRecipe)
router.get('/sinupPage',foodies.sinupPage);
router.post('/sinup',foodies.sinup);
router.get('/loginPage',foodies.loginPage);
router.post('/login',foodies.login);
router.post('/viewAll',foodies.login);
router.get('/logout',foodies.logout);


module.exports=router;