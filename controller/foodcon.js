const { american, thai, indian, mexican, chinese, desserts, pakistani, others, classic, fastfood } = require("../models/recipeModel.js")
const family = require('../models/familyModel')
const express = require('express')
const app = express();
const cookieParser = require("cookie-parser")
app.use(express.json())
app.use(cookieParser())
class foodies {
    static mainPage = async (req, res) => {
        try {
            const dessertsRes =await desserts.find({})
            const classicRes =await classic.find({})
            const fastfoodRes =await fastfood.find({})
            let name = req.cookies.name;
            if (!name) {
                res.cookie("name", "guest")
            }
            if (typeof (name) === "undefined") {
                res.render('index', { data: "guest", title: "foodies", desserts: dessertsRes, classic: classicRes, fastfood: fastfoodRes })
                return
            }
            res.render('index', { data: req.cookies.name, title: "foodies", desserts: dessertsRes, classic: classicRes, fastfood: fastfoodRes })
        } catch (error) {
            console.log(error);
        }
    }
    static submitPage = (req, res) => {
        res.render('uploadRecipe', { title: "foodies | Upload" })
    }
    static submit = async (req, res) => {
        try {
            let { name, email, dishName, ingredients, recipe, tags, category, region } = req.body;
            const ing = ingredients.split(',');
            const tag = tags.split(',');
            let doc;
            if (region === "American") {
                doc = new american({
                    name: name,
                    email: email,
                    dishName: dishName,
                    ingredients: ing,
                    recipe: recipe,
                    tags: tag,
                    category: category
                    // storing
                })

                const res = await doc.save();
            } else if (region === "Pakistani") {
                doc = new pakistani({
                    name: name,
                    email: email,
                    dishName: dishName,
                    ingredients: ing,
                    recipe: recipe,
                    tags: tag,
                    category: category
                    // storing
                })
                const res = await doc.save();
            } else if (region === "Thai") {
                doc = new thai({
                    name: name,
                    email: email,
                    dishName: dishName,
                    ingredients: ing,
                    recipe: recipe,
                    tags: tag,
                    category: category
                    // storing
                })
                const res = await doc.save();
            } else if (region === "Indian") {
                doc = new indian({
                    name: name,
                    email: email,
                    dishName: dishName,
                    ingredients: ing,
                    recipe: recipe,
                    tags: tag,
                    category: category
                    // storing
                })
                const res = await doc.save();
            } else if (region === "Mexican") {
                doc = new mexican({
                    name: name,
                    email: email,
                    dishName: dishName,
                    ingredients: ing,
                    recipe: recipe,
                    tags: tag,
                    category: category
                    // storing
                })
                const res = await doc.save();
            } else if (region === "Chinese") {
                doc = new chinese({
                    name: name,
                    email: email,
                    dishName: dishName,
                    ingredients: ing,
                    recipe: recipe,
                    tags: tag,
                    category: category
                    // storing
                })
                const res = await doc.save();
            } else if (region === "Others") {
                doc = new others({
                    name: name,
                    email: email,
                    dishName: dishName,
                    ingredients: ing,
                    recipe: recipe,
                    tags: tag,
                    category: category
                    // storing
                })
                const res = await doc.save();
            }
            if (category === "Classic") {
                doc = new classic({
                    name: name,
                    email: email,
                    dishName: dishName,
                    ingredients: ing,
                    recipe: recipe,
                    tags: tag,
                    category: category
                    // storing
                })
            } else if (category === "Fast Food") {
                doc = new fastfood({
                    name: name,
                    email: email,
                    dishName: dishName,
                    ingredients: ing,
                    recipe: recipe,
                    tags: tag,
                    category: category
                    // storing
                })
            } else if (category === "Dessert") {
                doc = new desserts({
                    name: name,
                    email: email,
                    dishName: dishName,
                    ingredients: ing,
                    recipe: recipe,
                    tags: tag,
                    category: category
                    // storing
                })
            }
            const result = await doc.save();
            res.redirect('/')
        } catch (error) {
            console.log(error);
        }


    }
    static showRegionFoods = async (req, res) => {
        const cname = req.params.name
        if (cname == "american") {
            const result = await american.find({})
            res.render('showRegionFoods', { data: req.cookies.name, title: "foodies | world", result: result, cname: cname })

        } else if (cname == "chinese") {
            const result = await chinese.find({})
            res.render('showRegionFoods', { data: req.cookies.name, title: "foodies | world", result: result, cname: cname })

        } else if (cname == "indian") {
            const result = await indian.find({})

            res.render('showRegionFoods', { data: req.cookies.name, title: "foodies | world", result: result, cname: cname })

        } else if (cname == "pakistani") {
            const result = await pakistani.find({})
            res.render('showRegionFoods', { data: req.cookies.name, title: "foodies | world", result: result, cname: cname })

        } else if (cname == "others" || cname == "viewAll") {
            let resultO = await others.find({})
            let resultT = await thai.find({})
            let resultM = await mexican.find({})
            // Array.prototype.push.apply(resultO, resultM, resultT)
            let temp = [].concat(resultO, resultT)
            const result = [].concat(temp, resultM)
            res.render('showRegionFoods', { data: req.cookies.name, title: "foodies | world", result: result, cname: cname })
        }
        

    }
    static ShowRecipe = async (req, res) => {
        try {
            const id = req.params.id;
            const resultA = await american.find({ _id: id }).count()
            const resultM = await mexican.find({ _id: id }).count()
            const resultI = await indian.find({ _id: id }).count()
            const resultP = await pakistani.find({ _id: id }).count()
            const resultC = await chinese.find({ _id: id }).count()
            const resultT = await thai.find({ _id: id }).count()
            const resultO = await others.find({ _id: id }).count()
            const resultCl = await classic.find({ _id: id }).count()
            const resultD = await desserts.find({ _id: id }).count()
            const resultF = await fastfood.find({ _id: id }).count()
            if (resultA != 0) {
                res.render('showRecipe', { data: req.cookies.name, title: "foodies | Recipe", result: await american.findById(id) })
            } else if ((await resultM) != 0) {
                res.render('showRecipe', { data: req.cookies.name, title: "foodies | Recipe", result: await mexican.findById(id) })
            } else if ((await resultI) != 0) {
                res.render('showRecipe', { data: req.cookies.name, title: "foodies | Recipe", result: await indian.findById(id) })
            } else if ((await resultP) != 0) {
                res.render('showRecipe', { data: req.cookies.name, title: "foodies | Recipe", result: await pakistani.findById(id) })
            } else if ((await resultC) != 0) {
                res.render('showRecipe', { data: req.cookies.name, title: "foodies | Recipe", result: await chinese.findById(id) })
            } else if ((await resultT) != 0) {
                res.render('showRecipe', { data: req.cookies.name, title: "foodies | Recipe", result: await thai.findById(id) })
            } else if ((await resultO) != 0) {
                res.render('showRecipe', { data: req.cookies.name, title: "foodies | Recipe", result: await others.findById(id) })
            } else if ((await resultCl) != 0) {
                res.render('showRecipe', { data: req.cookies.name, title: "foodies | Recipe", result: await classic.findById(id) })
            } else if ((await resultF) != 0) {
                res.render('showRecipe', { data: req.cookies.name, title: "foodies | Recipe", result: await fastfood.findById(id) })
            } else if ((await resultD) != 0) {
                res.render('showRecipe', { data: req.cookies.name, title: "foodies | Recipe", result: await desserts.findById(id) })
            }

        } catch (error) {
            console.log(error);
        }
    }
    static ShowSearchRecipe = async (req, res) => {
        try {
            const search= req.query.search;
            const classicRes=await classic.find();
            const dessertres=await desserts.find();
            const fastfoodRes = await fastfood.find();
            let resultdishName=[];
            classicRes.forEach(item => {
                if (item.dishName.includes(search)) {
                    resultdishName=resultdishName.concat(item)
                }
            });
            dessertres.forEach(item=>{
                if(item.dishName.includes(search)){
                    resultdishName=resultdishName.concat(item)
                }
            })
            fastfoodRes.forEach(item=>{
                if(item.dishName.includes(search)){
                    resultdishName=resultdishName.concat(item)
                }
            })
            let resultAuthorName=[];
            classicRes.forEach(item => {
                if (item.name.includes(search)) {
                    resultAuthorName=resultAuthorName.concat(item)
                }
            });
            dessertres.forEach(item=>{
                if(item.name.includes(search)){
                    resultAuthorName=resultAuthorName.concat(item)
                }
            })
            fastfoodRes.forEach(item=>{
                if(item.name.includes(search)){
                    resultAuthorName=resultAuthorName.concat(item)
                }
            })
            let tags=[];
            classicRes.forEach(item=>{
                item.tags.forEach(a=>{
                    if (a.includes(search)) {
                        tags=tags.concat(item)
                    }
                })
            })
            fastfoodRes.forEach(item=>{
                item.tags.forEach(a=>{
                    if (a.includes(search)) {
                        tags=tags.concat(item)
                    }
                })
            })
            dessertres.forEach(item=>{
                item.tags.forEach(a=>{
                    if (a.includes(search)) {
                        tags=tags.concat(item)
                    }
                })
            })
            res.render('searchshow',{data: req.cookies.name, title:"foodies| search" ,dishes:resultdishName , authors: resultAuthorName,tags:tags})

        } catch (error) {
            console.log(error);
        }
    }
    static sinupPage = async (req, res) => {
        try {
            res.render('sinup', { title: "foodies | Join Us" })
        } catch (error) {
            console.log(error);
        }
    }
    static sinup = async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const doc = new family({
                name: name,
                email: email,
                password: password
                // storing
            })
            const result = await doc.save();
            res.cookie("name", name)
            res.redirect('/')
        } catch (error) {
            console.log(error);
        }
    }
    static loginPage = (req, res) => {
        res.render('login', { title: "foodies | Login" })
    }
    static login = async (req, res) => {
        try {
            const { name, password } = req.body
            const count = await family.find({ name: name }).count()
            const result = await family.findOne({ name: name })
            if ((result) != null) {
                if (password !== result.password) {
                    res.render('login', { fail: "wrong password" })
                    return
                }
                res.cookie("name", result.name)
                res.redirect('/')
                return
            }
            res.send("<h1>invalid name</h1>")
        } catch (error) {
            console.log(error);
        }
    }
    static logout = (req, res) => {
        res.clearCookie("name")
        res.redirect('/')
    }
    static category=async (req,res)=>{
        try {
            const category=req.params.name;
            const classicRes=await classic.find();
            const dessertres=await desserts.find();
            const fastfoodRes = await fastfood.find();
            if (category==="classic") {
                res.render('category',{data: req.cookies.name, title:"foodies| category" , result:classicRes,category:category})
            }else if(category==="fastfood"){
                res.render('category',{data: req.cookies.name, title:"foodies| category" , result:fastfoodRes,category:category})
            }else if(category==="desserts"){
                res.render('category',{data: req.cookies.name, title:"foodies| category" , result:dessertres,category:category})
            }
        } catch (error) {
            console.log(error);
        }
       
    }
}
module.exports = foodies;