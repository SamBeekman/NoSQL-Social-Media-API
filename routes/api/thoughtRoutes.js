const router = require('express').Router();
const { Thought, User, Reaction } = require('../../models');
const { ObjectId } = require('mongoose').Types;


// /api/thoughts

// GET to get all thoughts

router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find().select('-__v');
        res.json(thoughts);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

// GET to get a single thought by its _id

router.get('/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that Id' })
        }
        res.json(thought);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});


// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

router.post('/', async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        res.json(newThought);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

// PUT to update a thought by its _id

router.put('/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
        )

        if (!thought) {
            res.status(404).json({ message: 'No thought with this Id!' });
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE to remove a thought by its _id

router.delete('/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
            res.status(404).json({ message: 'No thought with this Id!' });
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});





// // /api/thoughts/:thoughtId/reactions

// // POST to create a reaction stored in a single thought's reactions array field

router.post('/:thoughtId/reactions', async (req, res) => {

    try {
        const thoughtId = req.params.thoughtId;
        const thought = await Thought.findOneAndUpdate(
            {
                _id: thoughtId, 
            },
            {
                $push: {reactions: req.body}
            },
            {
                new: true
            }
                );
  
        res.status(200).json(thought);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

// // DELETE to pull and remove a reaction by the reaction's reactionId value

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {

    try {
        const thoughtId = req.params.thoughtId;
        const reactionId = req.params.reactionId;
        
        const thought = await Thought.findOneAndUpdate({
            _id: thoughtId
        },
        {
            $pull: {reactions: {reactionId: reactionId}}
        },
        {
            new: true
        }
        );
  
        res.status(200).json(thought);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

module.exports = router;