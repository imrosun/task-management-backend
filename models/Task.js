const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    priority: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    deadline: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    email: {type: String}
}, { timestamps: true});

module.exports = mongoose.model('Task', taskSchema);
