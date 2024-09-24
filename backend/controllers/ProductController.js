import Product from "../models/ProductModel.js";
import Order from "../models/OrderModel.js";

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

// Delete a product inquiry
export const deleteInquiry = async (req, res) => {
    try {
        // Find the product that contains the review
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ error: "inquiry not found" });
        }

        // Find the review inside the product's reviews array
        const inquiryIndex = product.inquiries.findIndex((r) => r._id.toString() === req.params.inquiryId);
        if (inquiryIndex === -1) {
            return res.status(404).json({ error: "inquiry not found" });
        }

        // Remove the review from the reviews array
        product.inquiries.splice(inquiryIndex, 1);

        // Optionally, recalculate the overall product rating and number of reviews
        product.inquiry = product.inquiries.length 
            ? product.inquiries.reduce((acc, item) => item.inquiry + acc, 0) / product.inquiries.length 
            : 0;

        // Save the product with the review removed
        await product.save();

        res.json({ msg: "inquiry deleted successfully", product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "inquiry deletion failed", error: error.message });
    }
};

// Fetch inquiries by inquiry ID
export const getInquiriesByInquiryId = async (req, res) => {
    try {
        const {productId, inquiryId } = req.params;
        
        const products = await Product.findById(productId);

        if (!products) {
            return res.status(404).json({ message: "inquiry not found" });
        }

        // find the review maching the reviewId
        const inquiry = products.inquiries.find(
            (inquiry) => inquiry._id == inquiryId
        );

        if(!inquiry) {
            return res.status(404).json( { msg : "inquiry not found for this user" } )
        }

        const inquiryResponse = {
            ...review.toObject(),
            productName: products.name,
            productId: products._id
        };

        res.json(inquiryResponse);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// update review
export const updateReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        
        // Validation
        if (!rating) {
            return res.status(400).json({ error: "Rating is required" });
        }
        if (!comment) {
            return res.status(400).json({ error: "Comment is required" });
        }

        // Find the product that contains the review
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Find the review inside the product's reviews array
        const review = product.reviews.find((r) => r._id.toString() === req.params.reviewId);
        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        // Update the review fields
        review.rating = rating;
        review.comment = comment;

        // Optionally, recalculate the overall product rating and number of reviews
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

        // Save the product with updated review
        await product.save();

        res.json({ msg: "Review updated successfully", product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Review update failed", error: error.message });
    }
};

// Delete review
export const deleteReview = async (req, res) => {
    try {
        // Find the product that contains the review
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Find the review inside the product's reviews array
        const reviewIndex = product.reviews.findIndex((r) => r._id.toString() === req.params.reviewId);
        if (reviewIndex === -1) {
            return res.status(404).json({ error: "Review not found" });
        }

        // Remove the review from the reviews array
        product.reviews.splice(reviewIndex, 1);

        // Optionally, recalculate the overall product rating and number of reviews
        product.rating = product.reviews.length 
            ? product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length 
            : 0;

        // Save the product with the review removed
        await product.save();

        res.json({ msg: "Review deleted successfully", product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Review deletion failed", error: error.message });
    }
};



// Fetch Reviews by Review ID
export const getReviewsByReviewId = async (req, res) => {
    try {
        const {productId, reviewId } = req.params;
        
        const products = await Product.findById(productId);

        if (!products) {
            return res.status(404).json({ message: "Product not found" });
        }

        // find the review maching the reviewId
        const review = products.reviews.find(
            (review) => review._id == reviewId
        );

        if(!review) {
            return res.status(404).json( { msg : "Review not found for this user" } )
        }

        const reviewResponse = {
            ...review.toObject(),
            productName: products.name,
            productId: products._id
        };

        res.json(reviewResponse);
        
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



const getOrderSummaryByProductName = async (req, res) => {
    try {
        const { productName } = req.params;
        const orderSummary = await Order.findOne({ 'orderItems.name': productName });

        if (!orderSummary) {
            return res.status(404).json({ message: 'Cannot find this product' });
        }

        res.json(orderSummary);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};






