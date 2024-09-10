import Product from "../models/ProductModel.js";

// Add new product
export const addProduct = async (req, res) => {
    try {
        const { name, brand, category, description, sku, barcode } = req.fields;
        
        switch(true) {
            case !name:
                return res.json( { error: "Name is required" } );
            case !brand:
                return res.json( { error: "Brand is required" } );
            case !description:
                return res.json( { error: "Description is required" } );
            case !category:
                return res.json( { error: "Category is required" } );
            case !sku:
                return res.json( { error: "SKU is required" } );
            case !barcode:
                return res.json( { error: "Barcode is required" } );
        }
         
        const product = new Product({...req.fields});
        await product.save();
        res.status(201).json( { msg : "Product Added Successfully" } );
    } catch (error) {
        res.status(400).json( { msg : "Product Adding Failed ", error } );
    }
}

// fetch all products
export const fetchProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(400).json( { msg : "No Product Found", error } );
    }
}

// fetch a product by id
export const fetchProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).json( { msg : "Product Not Found" } );
        }
        res.json(product);
    } catch (error) {
        res.status(404).json( { msg : "Cannot find this product", error } );
    }
}

// update product
export const updateProduct = async (req, res) => {
    try {
        const { name, brand, category, description, sku, barcode } = req.fields;
        
        switch(true) {
            case !name:
                return res.json( { error: "Name is required" } );
            case !brand:
                return res.json( { error: "Brand is required" } );
            case !description:
                return res.json( { error: "Description is required" } );
            case !category:
                return res.json( { error: "Category is required" } );
            case !sku:
                return res.json( { error: "SKU is required" } );
            case !barcode:
                return res.json( { error: "Barcode is required" } );
        }
        
        const product = await Product.findByIdAndUpdate(req.params.id, {...req.fields}, { new : true });
        if(!product) {
            return res.status(400).json( { msg : "Product not found" } )
        }
        await product.save();
        res.json( { msg : "Update Successful ", product } );
    } catch (error) {
        res.status(400).json( { msg : "Update Failed ", error } );
    }
}

// update product stock
export const updateProductStock = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { _id : req.params.id }, 
            {
                countInStock : req.body.countInStock,
                buyingPrice : req.body.buyingPrice, 
                reOrderQty: req.body.reOrderQty 
            }, { new : true }
        );
        if(!product) {
            return res.status(400).json( { msg : "Product not found" } )
        }
        await product.save();
        res.json( { msg : "Stock Updated Successfully", product } );
    } catch (error) {
        res.status(400).json( { msg : "Stock Update Failed ", error } );
    }
}

// delete product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product) {
            return res.status(400).json( { msg : "Product not found" } )
        }
        res.json( { msg : "Product Deleted Successfully" } )
    } catch (error) {
        res.status(400).json( { msg : "Product Cannot Delete ", error } );
    }
}

// add product review
export const addProductReview = async (req, res) => {
    try {
      const { rating, comment } = req.body;

      const product = await Product.findById(req.params.id);

    //   const user = localStorage.getItem("userInfo");
  
      if (product) {
        const alreadyReviewed = product.reviews.find(
          (r) => r.user.toString() === req.user._id.toString()
        );
  
        if (alreadyReviewed) {
          res.status(400);
          throw new Error("Product already reviewed");
        }
  
        const review = {
          name: req.user.username,
          rating: Number(rating),
          comment,
          user: req.user._id,
        };
  
        product.reviews.push(review);
  
        product.numReviews = product.reviews.length;
  
        product.rating =
          product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length;
  
        await product.save();
        res.status(201).json({ message: "Review added" });
      } else {
        res.status(404);
        throw new Error("Product not found");
      }
    } catch (error) {
      console.error(error);
      res.status(400).json(error.message);
    }
}

// add product Inquiry
export const addProductInquiry = async (req, res) => {
    try {
      const { messagee } = req.body;

      const product = await Product.findById(req.params.id);
  
      if (product) {
  
        const inquiry = {
          name: req.user.username,
          messagee,
          user: req.user._id,
        };
  
        product.inquiries.push(inquiry);
  
        product.numInquiries = product.inquiries.length; // Update the number of inquiries
  
        await product.save();
        res.status(201).json({ message: "Inquiry added" });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
}

// Update product review
export const updateReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;

        // Validate required fields
        // Added validation to ensure rating is between 1 and 5
        if (rating === undefined || comment === undefined || rating < 1 || rating > 5) {
            return res.status(400).json({ error: "Rating must be between 1 and 5, and comment are required" });
        }

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product Not Found" });
        }

        const review = product.reviews.id(req.params.reviewId);
        if (!review) {
            return res.status(404).json({ error: "Review Not Found" });
        }

        review.rating = Number(rating);
        review.comment = comment;

        // Recalculate the product rating
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

        await product.save();
        res.json({ msg: "Review Updated Successfully", review });
    } catch (error) {
        res.status(400).json({ msg: "Update Failed", error: error.message });
    }
};

// Fetch Reviews by User ID
export const getReviewsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const products = await Product.find({ "reviews.user": userId });

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No reviews found for this user." });
        }

        // Flatten the reviews into a single array
        const userReviews = products.flatMap((product) => 
            product.reviews
                .filter(review => review.user.toString() === userId)
                .map(review => ({
                    ...review.toObject(),
                    productName: product.name,
                    productId: product._id
                }))
        );

        res.json(userReviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Reply to product inquiry
export const replyToInquiry = async (req, res) => {
    try {
        const { productId, inquiryId } = req.params;
        const { replyMessage } = req.body;

        // Validate replyMessage
        if (!replyMessage.trim()) {
            return res.status(400).json({ message: "Reply message cannot be empty" });
        }

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const inquiry = product.inquiries.id(inquiryId);
        if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });

        // Add the reply
        inquiry.replies.push({ message: replyMessage, createdAt: new Date() });

        await product.save();
        res.status(200).json({ message: "Reply added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
