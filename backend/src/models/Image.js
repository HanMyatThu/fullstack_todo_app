import mongoose from 'mongoose';

const ImageSchema = mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    task : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tasks',
        required: true
    }
}, {
    timestamps: true,
});

const Image = mongoose.model('images', ImageSchema);

export default Image;