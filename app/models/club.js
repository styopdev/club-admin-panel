var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var ClubSchema = new Schema({
    title : String,
    video : String,
    cover : String
});
module.exports = mongoose.model('Club', ClubSchema);