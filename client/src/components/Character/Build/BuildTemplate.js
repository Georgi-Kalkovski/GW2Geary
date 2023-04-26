class BuildTemplate {
    profession = 1;
    specializations = [
        {
            id: 0,
            traits: [0, 0, 0],
        },
        {
            id: 0,
            traits: [0, 0, 0],
        },
        {
            id: 0,
            traits: [0, 0, 0],
        },
    ];

    skills = {
        terrestrial: {
            heal: 0,
            utilities: [0, 0, 0],
            elite: 0,
        },
        aquatic: {
            heal: 0,
            utilities: [0, 0, 0],
            elite: 0,
        },
    };

    specific = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    toString() {

        // Header
        var retval = [0x0d];

        // Profession ID
        retval.push(this.profession);

        // Specializations
        for (let s = 0; s < 3; s++) {
            retval.push(this.specializations[s].id);
            retval.push(this.specializations[s].traits[2] << 4 | this.specializations[s].traits[1] << 2 | this.specializations[s].traits[0]);
        }

        // Heal
        retval.push(this.skills.terrestrial.heal & 0xff, this.skills.terrestrial.heal >> 8 & 0xff);
        retval.push(this.skills.aquatic.heal & 0xff, this.skills.aquatic.heal >> 8 & 0xff);

        // Utility
        for (let u = 0; u < 3; u++) {
            retval.push(this.skills.terrestrial.utilities[u] & 0xff, this.skills.terrestrial.utilities[u] >> 8 & 0xff);
            retval.push(this.skills.aquatic.utilities[u] & 0xff, this.skills.aquatic.utilities[u] >> 8 & 0xff);
        }

        // Elite
        retval.push(this.skills.terrestrial.elite & 0xff, this.skills.terrestrial.elite >> 8 & 0xff);
        retval.push(this.skills.aquatic.elite & 0xff, this.skills.aquatic.elite >> 8 & 0xff);

        // Profession specific
        for (let i = 0; i < this.specific.length; i++) {
            retval.push(this.specific[i]);
        }

        // Return Base64 chat code
        return "[&" + btoa(String.fromCharCode.apply(null, retval)) + "]";
    }
}

module.exports = BuildTemplate