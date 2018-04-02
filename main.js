// import modules
let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');

module.exports.loop = function () {
    // Clear Memory
    // check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] === undefined) {
            // if not, delete the memory entry
            delete  Memory.creeps[name];
        }
    }
    // for every creep name in Game.creeps
    for (let name in Game.creeps) {
        // get the creep object
        let creep = Game.creeps[name];

        // if creep is harvester, call harvester script
        if (creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
        }
        // if creep is upgrader, call upgrader script
        else if (creep.memory.role === 'upgrader'){
            roleUpgrader.run(creep);
        }
        // if creep is builder, call builder script
        else if (creep.memory.role === 'builder') {
            roleBuilder.run(creep);
        }
    }

    // setup some minimum numbers for different roles
    let minimumNumberOfHarvesters = 10;
    let minimumNumberOfUpgraders = 5;
    let minimumNumberOfBuilders = 1;

    // count the number of creeps alive for each role
    // _.sum will count the number of properties in Game.creeps filtered by the
    //  arrow function, which checks for the creep being a harvester
    let numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role === 'harvester');
    let numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role === 'upgrader');
    let numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role === 'builder');

    let name = undefined;

    console.log(numberOfHarvesters);

    // if not enough harvesters
    if (numberOfHarvesters < minimumNumberOfHarvesters){
        // try to spawn one
        name = Game.spawns.mainSpawn.createCreep([WORK,WORK,CARRY,MOVE], undefined,
            { role: 'harvester', working: false});
    }
    // if not enough upgraders
    else if (numberOfUpgraders < minimumNumberOfUpgraders) {
        // try to spawn one
        name = Game.spawns.mainSpawn.createCreep([WORK,CARRY,MOVE,MOVE], undefined,
            { role: 'upgrader', working: false});
    }
    // if not enough builders
    else if ( numberOfBuilders < minimumNumberOfBuilders) {
        // try to spawn one
        name = Game.spawns.mainSpawn.createCreep([WORK,WORK,CARRY,MOVE], undefined,
            { role: 'upgrader', working: false});
            // { role: 'builder', working: false});
    }
    else {
        // else try to spawn a builder
        name = Game.spawns.mainSpawn.createCreep([WORK,WORK,CARRY,MOVE], undefined,
            { role: '', working: false});
            // { role: 'builder', working: false});
    }

    // print name to console if spawning was a success
    // name > 0 would not work since string > 0 returns false
    if (!(name < 0)){
        console.log("Spawning new creep: " + name + " -- ");
    }
};
