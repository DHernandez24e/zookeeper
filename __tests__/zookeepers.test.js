const fs = require('fs');
jest.mock('fs');

const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../lib/zookeepers');
const { zookeepers } = require('../data/zookeepers.json');

test('creates a zookeeper object', () => {
    const zookeeper = createNewZookeeper(
        { name: "Jimothy", id: "98hefaiu"},
        zookeepers
    );

    expect(zookeeper.name).toBe("Jimothy");
    expect(zookeeper.id).toBe("98hefaiu");
});

test('filters by query', () => {
    const startingZookeepers = [
        {
            id: "3",
            name: "Linda",
            age: 48,
            favoriteAnimal: "otter"
        },
        {
            id: "4",
            name: "Ryan",
            age: 20,
            favoriteAnimal: "dog"
        },
    ];

    const updatedZookeepers = filterByQuery({ favoriteAnimal: "otter" }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test('finds by id', () => {
    const startingZookeepers = [
        {
            id: "3",
            name: "Linda",
            age: 48,
            favoriteAnimal: "otter"
        },
        {
            id: "4",
            name: "Ryan",
            age: 20,
            favoriteAnimal: "dog"
        },
    ];

    const result = findById("3", startingZookeepers);

    expect(result.name).toBe("Linda");
});

test('validates age', () => {
    const zookeeper = {
        id: "3",
        name: "Linda",
        age: 48,
        favoriteAnimal: "otter",
    };

    const invalidZookeeper = {
        id: "3",
        name: "Linda",
        age: "48",
        favoriteAnimal: "otter"
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});