import { InstanceName, PartyType } from '../constants/instances.constant.js';
import { JobName } from '../constants/job.constant.js';


const SmallParty = [
    {
        job: JobName.CHAMP,
        playerIGN: null,
        player: null,
    },
    {
        job: JobName.PALADIN,
        playerIGN: null,
        player: null,
    },
    {
        job: JobName.PROFESSOR,
        playerIGN: null,
        player: null,
    },
    {
        job: JobName.HP,
        playerIGN: null,
        player: null,
    },
    {
        job: JobName.BIOCHEMIST,
        playerIGN: null,
        player: null,
    },
    {
        job: JobName.SNIPER,
        playerIGN: null,
        player: null,
    },
    {
        job: JobName.SNIPER,
        playerIGN: null,
        player: null,
    },
];

const FullParty = [
    {
        job: JobName.CHAMP,
        playerIGN: null,
        player: null,
    },
    {
        job: JobName.PALADIN,
        playerIGN: null,
        player: null,
    },
    {
        job: JobName.PROFESSOR,
        playerIGN: null,
        player: null,
    },
    {
        job: JobName.HP,
        playerIGN: null,
        player: null,
    },
    {
        job: JobName.HP,
        playerIGN: null,
        player: null,
    },
    {
        job: JobName.BIOCHEMIST,
        playerIGN: null,
        player: null,
    },
    {
        job: JobName.HIGHWIZARD,
        playerIGN: null,
        player: null,
    },
    {
        job: JobName.SNIPER,
        playerIGN: null,
        player: null,
    },
    {
        job: JobName.SNIPER,
        playerIGN: null,
        player: null,
    },
    {
        job: JobName.SNIPER,
        playerIGN: null,
        player: null,
    },
    {
        job: JobName.CLOWN,
        playerIGN: null,
        player: null,
    },
    {
        job: JobName.GYPSY,
        playerIGN: null,
        player: null,
    },
];

export function getPartyListTemplate(partyType, limit) {
    switch (partyType) {
        case PartyType.FULL: return FullParty;
        case PartyType.SMALL: {
            const flexPartyQuota = limit - SmallParty.length < 0 ? 0 : limit - SmallParty.length;
            const flexTemplate = [];
            for (let i=0; i<flexPartyQuota; i++) {
                flexTemplate.push({
                    job: JobName.FLEX,
                    playerIGN: null,
                    player: null,
                })
            }
            return [...SmallParty, ...flexTemplate];
        }
        case PartyType.FLEX: {
            const flexTemplate = [];
            for (let i=0; i<limit; i++) {
                flexTemplate.push({
                    job: JobName.FLEX,
                    playerIGN: null,
                    player: null,
                })
            }
            return flexTemplate;
        }
        default: return [];
    }
}

export function getReserveListTemplate(limit) {
    const template = [];
    for (let i=0; i<limit; i++) {
        template.push({ player: null });
    }
    return template;
}
