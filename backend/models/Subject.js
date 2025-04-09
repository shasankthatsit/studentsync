const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    dueDate: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const SubjectSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    currentGrade: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    targetGrade: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    assignments: [AssignmentSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Calculate current grade based on assignments
SubjectSchema.methods.calculateGrade = function() {
    if (this.assignments.length === 0) return this.currentGrade;
    
    const totalWeight = this.assignments.reduce((sum, assignment) => sum + assignment.weight, 0);
    if (totalWeight === 0) return this.currentGrade;
    
    const weightedSum = this.assignments.reduce((sum, assignment) => {
        return sum + (assignment.grade * assignment.weight);
    }, 0);
    
    return Math.round(weightedSum / totalWeight);
};

module.exports = mongoose.model('Subject', SubjectSchema); 