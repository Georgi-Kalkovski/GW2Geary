const mongoose = require("mongoose");

const EquipmentSchema = new mongoose.Schema({
    id: Number,
    skin: Number,
    slot: String,
    dyes: [Number],
    infusions: [Number],
    upgrades: [Number],
    stats: Object,
}, { _id: false });

const EqSaveSchema = new mongoose.Schema({
    owner: String,
    name: String,
    gender: String,
    race: String,
    profession: String,
    relic: Number,
    powerCore: Number,
    eqname: {
        type: String,
        required: false
    },
    equipment: [EquipmentSchema]
}, { versionKey: false });

const EqSave = mongoose.model("EqSave", EqSaveSchema);

module.exports = EqSave;
