const categoryModel = require('../models/categoryModel');
const subCateModel = require('../models/subCateModel');
const adminModel = require('../models/adminModel');
const userCommentModel = require('../models/userCommentModel');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt')
let moment = require('moment')

module.exports.home = async (req, res) => {
  try {
    const admin = await adminModel.findOne();
    const categoryData = await categoryModel.find({ status: true });

    // Pagination setup
    let page = parseInt(req.query.page) || 0;
    let perPage = 2;

    let search = '';
    if (req.query.search) {
      search = req.query.search;
    }

    const filter = {
      title: { $regex: search, $options: 'i' }
    };

    const subCateData = await subCateModel
      .find(filter)
      .populate('categoryId')
      .skip(perPage * page)
      .limit(perPage)
      .exec();

    const totalCount = await subCateModel.find(filter).countDocuments();
    const totalPage = Math.ceil(totalCount / perPage);

    return res.render('user/userPage', {
      categoryData,
      subCateData,
      admin,
      totalPage,
      currentPage: page,
      search
    });
  } catch (err) {
    console.log('Error loading homepage:', err.message);
    return res.redirect('/');
  }
};

module.exports.blogDetails = async (req, res) => {
  try {
    const blogId = req.params.id;

    const admin = await adminModel.findOne();
    const categoryData = await categoryModel.find({ status: true });
    const subCate = await subCateModel.findById(blogId).populate('categoryId');
    const subCateData = await subCateModel.find().sort({ created_date: -1 });
    const comment = await userCommentModel.find({ blogId }).sort({ created_date: -1 });

    if (!subCate) return res.redirect('/');

    return res.render('user/blogDetails', {
      categoryData,
      subCate,
      admin,
      subCateData,
      comment
    });
  } catch (err) {
    console.log('Error loading blog details:', err.message);
    return res.redirect('/');
  }
};

module.exports.userComment = async (req, res) => {
  try {
    const { blogId, name, comment, rating } = req.body;

    const commentCreate = await userCommentModel.create({
      blogId,
      name,
      comment,
      rating,
      created_date: new Date()
    });

    if (commentCreate) {
      console.log('Comment added');
    } else {
      console.log('Error adding comment');
    }

    return res.redirect(`/blogDetails/${blogId}`);
  } catch (err) {
    console.log('Error posting comment:', err.message);
    return res.redirect('/');
  }
};

module.exports.signUp = (req, res) => {
  return res.render('user/LogIn/signup');
};

module.exports.userRegister = async (req, res) => {
  try {
    // console.log(req.body);
    let checkUserExist = await userModel.findOne({ email: req.body.email });

    if (!checkUserExist) {
      if (req.body.password === req.body.cpassword) {

        req.body.password = await bcrypt.hash(req.body.password, 10)
        req.body.created_date = moment().format('DD/MM/YYYY,h:mm:ss a');
        req.body.updated_date = moment().format('DD/MM/YYYY,h:mm:ss a');
        let createUser = await userModel.create(req.body);
        if (createUser){
          console.log('okay doneee');
          return res.redirect('/signIn')
        }else{
          console.log('not done');
          
        }

      } else {
        console.log('password not match');

      }
    } else {
      console.log('Alredy Exist');

    }

  } catch (err) {
    console.log(err);
    return res.redirect('/signUp')
  }
}

module.exports.signIn = (req , res)=>{
  return res.render('user/LogIn/signIn')
}

module.exports.userSignin = (req,res)=>{
  try{
    return res.redirect('/')
  }catch{
    console.log('err');
    return res.redirect('/signUp')
  }
}