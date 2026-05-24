const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');
const { protect } = require('../middleware/auth');

// @desc    Get all menu items (with search, filter, pagination)
// @route   GET /api/menu
router.get('/', async (req, res) => {
  try {
    const { search, category, tags, page = 1, limit = 10 } = req.query;
    const query = {};

    // Search by name
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by tags (multiple tags can be provided comma-separated)
    if (tags) {
      const tagList = tags.split(',');
      query.tags = { $all: tagList };
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await FoodItem.countDocuments(query);
    
    const items = await FoodItem.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: items.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: items,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get items by category
// @route   GET /api/menu/:category
router.get('/:category', async (req, res) => {
  try {
    const items = await FoodItem.find({ category: req.params.category });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Add new food item (Admin only)
// @route   POST /api/menu
router.post('/', protect, async (req, res) => {
  try {
    const item = await FoodItem.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @desc    Update food item (Admin only)
// @route   PUT /api/menu/:id
router.put('/:id', protect, async (req, res) => {
  try {
    const item = await FoodItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    res.json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @desc    Delete food item (Admin only)
// @route   DELETE /api/menu/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const item = await FoodItem.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    res.json({ success: true, message: 'Item removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
