const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    sport:String,
    image: [String],
    team:String,
    since:Number,
    games:Number,
    player:String,
});

const Team = mongoose.model('Team', teamSchema);


module.exports = Team;