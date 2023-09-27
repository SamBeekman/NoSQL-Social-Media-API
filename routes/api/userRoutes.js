const router = require('express').Router();
const { Thought, User, Reaction } = require('../../models');
const { ObjectId } = require('mongoose').Types;


// /api/users

// GET all users

router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-__v');
        res.json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

// GET a single user by its _id and populated thought and friend data -------------- need to populate

router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
        .populate('thoughts')
        .populate('friends')
        .exec();

        if (!user) {
            return res.status(404).json({ message: 'No user with that Id' })
        }
        
        res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});


// POST a new user:

router.post('/', async (req, res) => {
    try {
        const newUser = (await User.create(req.body));
        res.json(newUser);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});


// PUT to update a user by its _id

router.put('/:userId', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true }
        )

        if (!user) {
            res.status(404).json({ message: 'No user with this Id!' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE to remove user by its _id ------ BONUS: Remove a user's associated thoughts when deleted.

router.delete('/:userId', async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            res.status(404).json({ message: 'No user with this Id!' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});


// // /api/users/:userId/friends/:friendId

// // POST to add a new friend to a user's friend list

router.post('/:userId/friends/:friendId', async (req, res) => {

    try {
        const userId = req.params.userId;
        const friendId = req.params.friendId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }      
          
        const friend = await User.findById(friendId);      
          if (!friend) {
            return res.status(404).json({ message: 'Friend not found' });
          }

        user.friends.push(friend);

        await user.save();
  
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

// // DELETE to remove a friend from a user's friend list

router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const friendId = req.params.friendId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }      
          
        const friend = await User.findById(friendId);      
          if (!friend) {
            return res.status(404).json({ message: 'Friend not found' });
          }

          const index = user.friends.indexOf(friend);
          user.friends.splice(index, 1);

          await user.save();
  
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

module.exports = router;