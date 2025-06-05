
module.exports.dashboard = (req,res)=>{
    // console.log('rich')
    return res.render('dashboard')
}

module.exports.viewAdmin = (req,res)=>{
    return res.render('viewAdmin');
}

module.exports.addAdmin = (req,res)=>{
    return res.render('addAdmin');
}