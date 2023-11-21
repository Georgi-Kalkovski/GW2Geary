const mongoose = require("mongoose");

const EquipmentSchema = new mongoose.Schema({
    id: Number,
    skin: Number,
    slot: String,
    dyes: [Number],
    infusions: [Number],
}, { _id: false });

const FSaveSchema = new mongoose.Schema({
    owner: String,
    name: String,
    gender: String,
    race: String,
    profession: String,
    equipment: [EquipmentSchema]
}, { versionKey: false });

const FSave = mongoose.model("FSave", FSaveSchema);

module.exports = FSave;
