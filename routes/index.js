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

/**
 * Handle Contact Form Submission
 */
router.post('/contact', async (req, res) => {
    const query = req.app.get('query');
    const { name, email, phone, message } = req.body;

    try {
        const response = await query('/items/contacts_us', {
            method: 'POST',
            body: JSON.stringify({
                name,
                email,
                phone,
                message,
                status: 'published'
            })
        });

        if (response.ok) {
            res.render('success', { 
                title: 'Message Sent!', 
                message: 'Thank you for contacting TidyHands. We will get back to you shortly.' 
            });
        } else {
            throw new Error('Failed to send message to Directus');
        }
    } catch (error) {
        console.error('Contact Form Error:', error);
        res.render('error', { 
            title: 'Submission Error', 
            message: 'We could not send your message at this time. Please try again later.' 
        });
    }
});

/**
 * Handle Quotation Request Submission
 */
router.post('/submit-quotation', async (req, res) => {
    const query = req.app.get('query');
    const { name, email, phone, location, service_category, cleaning_level, frequency, message } = req.body;

    try {
        const response = await query('/items/quotation_requests', {
            method: 'POST',
            body: JSON.stringify({
                name,
                email,
                phone,
                location,
                service_category,
                cleaning_level,
                frequency,
                message,
                status: 'published'
            })
        });

        if (response.ok) {
            res.render('success', { 
                title: 'Request Received!', 
                message: 'Your quotation request has been received. Our team will review it and contact you with a plan.' 
            });
        } else {
            throw new Error('Failed to send quotation request to Directus');
        }
    } catch (error) {
        console.error('Quotation Form Error:', error);
        res.render('error', { 
            title: 'Submission Error', 
            message: 'We could not process your request at this time. Please try again later.' 
        });
    }
});

module.exports = router;
