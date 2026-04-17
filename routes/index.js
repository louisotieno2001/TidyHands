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

// Blog page (List all blogs)
router.get('/blog', async (req, res) => {
    const query = req.app.get('query');
    try {
        const response = await query('/items/blogs?fields=*,media.*', {
            method: 'GET'
        });
        const data = await response.json();
        res.render('blog', { 
            title: 'Cleaning Tips & News - TidyHands Blog',
            blogs: data.data || []
        });
    } catch (error) {
        console.error('Blog Fetch Error:', error);
        res.render('blog', { 
            title: 'Cleaning Tips & News - TidyHands Blog',
            blogs: [] 
        });
    }
});

// Single Blog page
router.get('/blog/:id', async (req, res) => {
    const query = req.app.get('query');
    try {
        const response = await query(`/items/blogs/${req.params.id}?fields=*,media.*`, {
            method: 'GET'
        });
        const data = await response.json();
        
        if (!data.data) {
            return res.status(404).render('error', { 
                title: 'Blog Not Found', 
                message: 'The article you are looking for does not exist.' 
            });
        }

        res.render('single-blog', { 
            title: `${data.data.title} - TidyHands Blog`,
            blog: data.data
        });
    } catch (error) {
        console.error('Single Blog Fetch Error:', error);
        res.status(500).render('error', { 
            title: 'Error Fetching Blog', 
            message: 'We could not load the article at this time.' 
        });
    }
});

// Services page
router.get('/services', (req, res) => {
  res.render('services', { title: 'Our Services - TidyHands' });
});

// Contact Us page
router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us - TidyHands' });
});

// Get Supplies page
router.get('/get-supplies', (req, res) => {
  res.render('get-supplies', { title: 'Order Supplies - TidyHands' });
});

/**
 * Handle Contact Form Submission
 */
router.post('/contact', async (req, res) => {
    const query = req.app.get('query');
    const { name, email, phone, preferred_contact, message } = req.body;

    const details = {
        preferred_contact_method: preferred_contact
    };

    try {
        const response = await query('/items/contact_us', {
            method: 'POST',
            body: JSON.stringify({
                name,
                email,
                phone,
                message,
                details: JSON.stringify(details),
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
    const { 
        name, email, phone, location, 
        service_category, 
        res_rooms, res_bedrooms, res_bathrooms, res_kitchens, res_living_rooms, res_other_rooms,
        res_cleaning_scope, res_area_scope, res_property_size,
        com_business_type, com_business_name, com_floors, com_rooms, com_bathrooms, com_total_area,
        com_employees, com_daily_visitors, com_cleaning_scope, com_special_requirements,
        move_type, move_rooms, move_bedrooms, move_bathrooms, move_kitchens,
        move_property_size, move_furnished, move_cleaning_scope, move_area_scope, move_special_requests,
        cleaning_level, frequency, preferred_date, preferred_time, message 
    } = req.body;

    const cleaningScope = Array.isArray(res_cleaning_scope) ? res_cleaning_scope : 
                          Array.isArray(com_cleaning_scope) ? com_cleaning_scope :
                          Array.isArray(move_cleaning_scope) ? move_cleaning_scope : [];

    const details = {
        residential: service_category === 'residential' ? {
            rooms: res_rooms,
            bedrooms: res_bedrooms,
            bathrooms: res_bathrooms,
            kitchens: res_kitchens,
            living_rooms: res_living_rooms,
            other_rooms: res_other_rooms,
            cleaning_scope: cleaningScope,
            area_scope: res_area_scope,
            property_size: res_property_size
        } : null,
        commercial: service_category === 'commercial' ? {
            business_type: com_business_type,
            business_name: com_business_name,
            floors: com_floors,
            rooms: com_rooms,
            bathrooms: com_bathrooms,
            total_area: com_total_area,
            employees: com_employees,
            daily_visitors: com_daily_visitors,
            cleaning_scope: cleaningScope,
            special_requirements: com_special_requirements
        } : null,
        move_in_out: service_category === 'move-in-out' ? {
            move_type,
            rooms: move_rooms,
            bedrooms: move_bedrooms,
            bathrooms: move_bathrooms,
            kitchens: move_kitchens,
            property_size: move_property_size,
            furnished: move_furnished,
            cleaning_scope: cleaningScope,
            area_scope: move_area_scope,
            special_requests: move_special_requests
        } : null
    };

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
                preferred_date,
                preferred_time,
                details: JSON.stringify(details),
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

/**
 * Handle Supply Request Submission
 */
router.post('/submit-supplies', async (req, res) => {
    const query = req.app.get('query');
    const { name, email, phone, location, supply_category, products, order_type, subscription_duration, delivery, message } = req.body;

    const details = {
        supply_category,
        products: Array.isArray(products) ? products : products ? [products] : [],
        order_type,
        subscription_duration: order_type === 'subscription' ? subscription_duration : null,
        delivery,
        additional_info: message
    };

    try {
        const response = await query('/items/supply_requests', {
            method: 'POST',
            body: JSON.stringify({
                name,
                email,
                phone,
                location,
                details: JSON.stringify(details),
                status: 'published'
            })
        });

        if (response.ok) {
            res.render('success', { 
                title: 'Order Received!', 
                message: 'Your supply order has been received. Our team will contact you shortly to confirm your order and arrange delivery.' 
            });
        } else {
            throw new Error('Failed to send supply request to Directus');
        }
    } catch (error) {
        console.error('Supply Request Form Error:', error);
        res.render('error', { 
            title: 'Submission Error', 
            message: 'We could not process your order at this time. Please try again later.' 
        });
    }
});

module.exports = router;
