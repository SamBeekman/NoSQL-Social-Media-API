const { Schema, Types} = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(), //keep this but disable mongoose default _id creation
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            // Use a getter method to format the timestamp on query
        },
    },
    {
        toJSON: {
            getters: true,
            virtual: true,
        },
        id: false,
    
    }
);


module.exports = reactionSchema;

