const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const auth = require('../middleware/auth');

// create a new service
router.post('/', auth, async (req, res) => {
    const { name, description } = req.body;
    try {
        const service = new Service({
            name,
            description
        });
        const savedService = await service.save();
        res.json(savedService);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a service by ID
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ msg: 'Service not found' });
        res.json(service);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a service
router.put('/:id', auth, async (req, res) => {
    const { name, description } = req.body;
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ msg: 'Service not found' });

        service.name = name || service.name;
        service.description = description || service.description;

        const updatedService = await service.save();
        res.json(updatedService);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete services
router.delete('/:id', auth, async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ msg: 'Service not found' });

        await service.remove();
        res.json({ msg: 'Service removed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
