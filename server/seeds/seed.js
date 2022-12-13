const db = require('../config/connection'); 
const {User, Book} = require('../models');

const userData = require('./userData');
const bookData = require('./bookData');

db.once('open', async () =>{
    await User.deleteMany({});
    await Book.deleteMany({});
    
    const user = await User.insertMany(userData);
    const book = await Group.insertMany(bookData);

    for (newGroup of group){
        newGroup.members = user
        await newGroup.save(); 
    }

    for(newUser of user){
        newUser.memberships = group;
        await newUser.save();
    }

    console.log("all done")
    process.exit(0);
})