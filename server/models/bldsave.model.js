const mongoose = require("mongoose");

const SpecializationSchema = new mongoose.Schema({
    id: Number,
    traits: [Number]
}, { _id: false });

const BldSaveSchema = new mongoose.Schema({
    owner: String,
    name: String,
    profession: String,
    spec: String,
    skills: {
        heal: Number,
        utilities: [Number],
        elite: Number
    },
    aquatic_skills: {
        heal: Number,
        utilities: [Number],
        elite: Number
    },
    specializations: [SpecializationSchema],
}, { versionKey: false });

const BldSave = mongoose.model("BldSave", BldSaveSchema);

module.exports = BldSave;
