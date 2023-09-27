const { Schema, Types} = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: this.ObjectId, //keep this but disable mongoose default _id creation
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
            default: Date.now()
        },
    },
    {
        toJSON: {
            getters: true,
            virtual: true,
        },
        id: false,
        _id: false,
    }
);


module.exports = reactionSchema;

