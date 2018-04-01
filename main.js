let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');


module.exports.loop = function () {
    // Clear Memory
    for (let name in Memory.creeps) {
        if (Game.creeps[name] === undefined) {
            delete  Memory.creeps[name];
        }
    }

    for (let name in Game.creeps) {
        let creep = Game.creeps[name];

        if (creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role === 'upgrader'){
            roleUpgrader.run(creep);
        }
    }

    let minimumNumberOfHarvesters = 10;
    let numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role === 'harvester');
    let name = undefined;

    console.log(numberOfHarvesters);

    if (numberOfHarvesters < minimumNumberOfHarvesters){
        name = Game.spawns.startPoint.createCreep([WORK,WORK,CARRY,MOVE], undefined,
            { role: 'harvester', working: false});
    }
    else {
        name = Game.spawns.startPoint.createCreep([WORK,CARRY,MOVE,MOVE], undefined,
            { role: 'upgrader', working: false});
    }

    if (!(name < 0)){
        console.log("Spawning new creep: " + name + " -- ");
    }
};
