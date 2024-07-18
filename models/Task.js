const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tasker: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Task', TaskSchema);
