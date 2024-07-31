const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: {
        toDo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
        inProgress: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
        underReview: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
        finished: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
    }
});

module.exports = mongoose.model('User', userSchema);
