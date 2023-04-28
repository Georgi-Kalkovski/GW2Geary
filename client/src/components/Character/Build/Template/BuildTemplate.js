/**
 * @author that_shaman
 * PS: Thank you That_Shaman <3
 */

class BuildTemplate {
    profession = 1;
    specializations = [
        { id: 0, traits: [0, 0, 0] },
        { id: 0, traits: [0, 0, 0] },
        { id: 0, traits: [0, 0, 0] },
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

    specific = new Array(16).fill(0);

    toString = () => {
        // Header
        const retval = [0x0d];

        // Profession ID
        retval.push(this.profession);

        // Specializations
        this.specializations.forEach((specialization) => {
            retval.push(specialization.id);
            retval.push(
                (specialization.traits[2] << 4) |
                ((specialization.traits[1] << 2) & 0x0c) |
                (specialization.traits[0] & 0x03)
            );
        });

        // Heal
        retval.push(this.skills.terrestrial.heal & 0xff, (this.skills.terrestrial.heal >> 8) & 0xff);
        retval.push(this.skills.aquatic.heal & 0xff, (this.skills.aquatic.heal >> 8) & 0xff);

        // Utility
        this.skills.terrestrial.utilities.forEach((utility, index) => {
            retval.push(utility & 0xff, (utility >> 8) & 0xff);
            retval.push(this.skills.aquatic.utilities[index] & 0xff, (this.skills.aquatic.utilities[index] >> 8) & 0xff);
        });

        // Elite
        retval.push(this.skills.terrestrial.elite & 0xff, (this.skills.terrestrial.elite >> 8) & 0xff);
        retval.push(this.skills.aquatic.elite & 0xff, (this.skills.aquatic.elite >> 8) & 0xff);


        // Profession specific
        this.specific.forEach((spec) => retval.push(spec));
        // Return Base64 chat code
        return "[&" + btoa(String.fromCharCode.apply(null, retval)) + "]";
    }
}

module.exports = BuildTemplate