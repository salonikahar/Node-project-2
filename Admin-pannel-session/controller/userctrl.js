const { use } = require('passport')
const categoryModel = require('../models/categoryModel')
const subCateModel = require('../models/subCateModel')
const adminModel = require('../models/adminModel')

module.exports.home = async (req, res) => {
  try {
    const admin = await adminModel.findOne();
    const categoryData = await categoryModel.find({ status: true });

    // Pagination setup
    let page = parseInt(req.query.page) || 0;
    let perPage = 2;

    // Optional search logic (e.g., blog title)
    let search = req.query.searchBlog || "";

    const filter = {
      title: { $regex: search, $options: 'i' }
    };

    // Fetch paginated data
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
    console.log(err);
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

        if (!subCate) return res.redirect('/');

        return res.render('user/blogDetails', {
            categoryData,
            subCate,
            admin,
            subCateData
        });
    } catch (err) {
        console.log(err);
        return res.redirect('/');
    }
};
