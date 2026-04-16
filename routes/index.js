const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
  res.render('index', { title: 'TidyHands - Professional Cleaning Services' });
});

// Get Quotation page
router.get('/get-quotation', (req, res) => {
  res.render('quotation', { title: 'Get a Quotation - TidyHands' });
});

// Blog page
router.get('/blog', (req, res) => {
  res.render('blog', { title: 'Cleaning Tips & News - TidyHands Blog' });
});

// Services page
router.get('/services', (req, res) => {
  res.render('services', { title: 'Our Services - TidyHands' });
});

// Contact Us page
router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us - TidyHands' });
});

module.exports = router;
