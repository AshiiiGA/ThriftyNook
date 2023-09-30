const router = require("express").Router();
const Furniture = require("../models/furnitureModel");
const items = require("../config/furniture.json");

router.get("/search", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const keyword = req.query.keyword || "";
    let sort = req.query.sort || "posted";
    let category = req.query.category || "All"; 

    const categoryOptions = [
      "Chairs",
      "Tables",
      "Sofas",
      "Bedroom Furniture",
      "Storage",
      "Outdoor Furniture",
      "Kitchen Furniture",
      "Home Office Furniture",
      "Antiques and Collectibles",
      "Kids' Furniture",
      "Bathroom Furniture",
      "Other",
    ];

    category === "All"
      ? (category = [...categoryOptions])
      : (category = req.query.category.split(","));

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort["posted"]] = "asc";
    }

    const furnitures = await Furniture.find({
      summary: { $regex: keyword, $options: "i" }, 
    })
      .where("category")
      .in([...category])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await Furniture.countDocuments({
      category: { $in: [...category] },
      summary: { $regex: keyword, $options: "i" }, 
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      category: categoryOptions,
      furnitures,
    };
    res.status(200).json(response);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
/*
const insertFurnitures = async () => {
  try {
    const docs = await Furniture.insertMany(items);
    return Promise.resolve(docs);
  } catch (err) {
    return Promise.reject(err);
  }
};

insertFurnitures()
  .then((docs) => console.log(docs))
  .catch((err) => console.error(err)); // Log the error for debugging
*/
module.exports = router;
