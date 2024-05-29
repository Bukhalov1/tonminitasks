const express = require('express');
const router = express.Router();
const path = require('path');

const tasks = [
    { id: 1, title: 'Recommended Task 1', description: 'Description 1', link: 'http://example.com/1', image: '/static/images/task1.png', type: 'recommended', endDate: '2023-12-31', participants: 100 },
    { id: 2, title: 'Recommended Task 2', description: 'Description 2', link: 'http://example.com/2', image: '/static/images/task2.png', type: 'recommended', endDate: '2023-12-31', participants: 150 },
    { id: 3, title: 'Referral Task 1', description: 'Description 1', link: 'http://example.com/1', image: '/static/images/task1.png', type: 'referrals', endDate: '2023-12-31', participants: 50 },
    { id: 4, title: 'Referral Task 2', description: 'Description 2', link: 'http://example.com/2', image: '/static/images/task2.png', type: 'referrals', endDate: '2023-12-31', participants: 60 },
    { id: 5, title: 'Like Task 1', description: 'Description 1', link: 'http://example.com/1', image: '/static/images/task1.png', type: 'likes', endDate: '2023-12-31', participants: 75 },
    { id: 6, title: 'Like Task 2', description: 'Description 2', link: 'http://example.com/2', image: '/static/images/task2.png', type: 'likes', endDate: '2023-12-31', participants: 80 },
    { id: 7, title: 'Subscribe Task 1', description: 'Description 1', link: 'http://example.com/1', image: '/static/images/task1.png', type: 'subscribe', endDate: '2023-12-31', participants: 65 },
    { id: 8, title: 'Subscribe Task 2', description: 'Description 2', link: 'http://example.com/2', image: '/static/images/task2.png', type: 'subscribe', endDate: '2023-12-31', participants: 70 },
    { id: 9, title: 'Other Task 1', description: 'Description 1', link: 'http://example.com/1', image: '/static/images/task1.png', type: 'other', endDate: '2023-12-31', participants: 90 },
    { id: 10, title: 'Other Task 2', description: 'Description 2', link: 'http://example.com/2', image: '/static/images/task2.png', type: 'other', endDate: '2023-12-31', participants: 95 },
    // Добавьте больше задач при необходимости
];

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/api/tasks', (req, res) => {
    const category = req.query.category || 'all';
    const page = parseInt(req.query.page, 10) || 1;
    const perPage = 15;

    const filteredTasks = category === 'all' ? tasks : tasks.filter(task => task.type === category);
    const paginatedTasks = filteredTasks.slice((page - 1) * perPage, page * perPage);

    res.json({ tasks: paginatedTasks });
});

router.get('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = tasks.find(t => t.id === taskId);

    if (task) {
        res.sendFile(path.join(__dirname, '../../public/task.html'));
    } else {
        res.status(404).send('Task not found');
    }
});

router.get('/api/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = tasks.find(t => t.id === taskId);

    if (task) {
        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }
});

module.exports = router;

