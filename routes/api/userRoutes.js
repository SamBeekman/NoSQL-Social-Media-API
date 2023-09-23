const { Thought, User, Reaction } = require('../models');
const { ObjectId } = require('mongoose').Types;



// /api/users

// GET all users

// GET a single user by its _id and populated thought and friend data

// POST a new user:

// {
//     "username": "lernantino",
//     "email": "lernantino@gmail.com"
//   }

// PUT to update a user by its _id

// DELETE to remove user by its _id







// BONUS

// /api/users/:userId/friends/:friendId

// POST to add a new friend to a user's friend list

// DELETE to remove a friend from a user's friend list