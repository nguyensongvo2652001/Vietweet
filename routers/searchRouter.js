const express = require('express');

const authController = require('../controllers/authController');
const searchController = require('../controllers/searchController');

const router = express.Router();

router.get('/', authController.protect, searchController.search);

module.exports = router;
