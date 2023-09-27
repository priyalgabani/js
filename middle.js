const check=(req,res,next)=>{
    let{name,description,preparationTime,cookingTime,imageurl,country,veg}=req.body;
    console.log(req.body);
    next();
    if(name && description && preparationTime && cookingTime && imageurl && country && veg){
        next();
    }
    else{
        return res.status(400).json({error:'all fields are required',reference:'initialRecipe.'});
    }
}

module.exports=check;
