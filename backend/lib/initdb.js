"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (db) => {
    const projects = [
        // Mittwoch Vormittag (Regen)
        {
            time: "Mi-Vormittag",
            name: "Fußball",
            free_slots: 20
        },
        {
            time: "Mi-Vormittag",
            name: "Volleyballl",
            free_slots: 30
        },
        {
            time: "Mi-Vormittag",
            name: "Basketball",
            free_slots: 15
        },
        {
            time: "Mi-Vormittag",
            name: "Krafttraining",
            free_slots: 15
        },
        {
            time: "Mi-Vormittag",
            name: "Entspannung und Meditation",
            free_slots: 15
        },
        {
            time: "Mi-Vormittag",
            name: "Yoga",
            free_slots: 20
        },
        {
            time: "Mi-Vormittag",
            name: "Tanzen",
            free_slots: 15
        },
        {
            time: "Mi-Vormittag",
            name: "Klettern",
            free_slots: 15
        },
        {
            time: "Mi-Vormittag",
            name: "Tischtennis",
            free_slots: 20
        },
        // Mittwoch Nachmittag
        {
            time: "Mi-Nachmittag",
            name: "Fußball",
            free_slots: 20
        },
        {
            time: "Mi-Nachmittag",
            name: "Volleyballl",
            free_slots: 30
        },
        {
            time: "Mi-Nachmittag",
            name: "Basketball",
            free_slots: 15
        },
        {
            time: "Mi-Nachmittag",
            name: "Krafttraining",
            free_slots: 15
        },
        {
            time: "Mi-Nachmittag",
            name: "Wandern",
            free_slots: 20
        },
        {
            time: "Mi-Nachmittag",
            name: "Entspannung und Meditation",
            free_slots: 15
        },
        {
            time: "Mi-Nachmittag",
            name: "Yoga",
            free_slots: 20
        },
        {
            time: "Mi-Nachmittag",
            name: "Tanzen",
            free_slots: 15
        },
        {
            time: "Mi-Nachmittag",
            name: "Klettern",
            free_slots: 15
        },
        // Donnerstag Vormittag
        {
            time: "Do-Vormittag",
            name: "Fußball",
            free_slots: 20
        },
        {
            time: "Do-Vormittag",
            name: "Volleyballl",
            free_slots: 30
        },
        {
            time: "Do-Vormittag",
            name: "Basketball",
            free_slots: 15
        },
        {
            time: "Do-Vormittag",
            name: "Krafttraining",
            free_slots: 15
        },
        {
            time: "Do-Vormittag",
            name: "Wandern",
            free_slots: 20
        },
        {
            time: "Do-Vormittag",
            name: "Entspannung und Meditation",
            free_slots: 15
        },
        {
            time: "Do-Vormittag",
            name: "Yoga",
            free_slots: 20
        },
        {
            time: "Do-Vormittag",
            name: "Tanzen",
            free_slots: 15
        },
        {
            time: "Do-Vormittag",
            name: "Klettern",
            free_slots: 15
        },
        // Donnerstag Nachmittag
        {
            time: "Do-Nachmittag",
            name: "Fußball",
            free_slots: 20
        },
        {
            time: "Do-Nachmittag",
            name: "Volleyballl",
            free_slots: 30
        },
        {
            time: "Do-Nachmittag",
            name: "Basketball",
            free_slots: 15
        },
        {
            time: "Do-Nachmittag",
            name: "Krafttraining",
            free_slots: 15
        },
        {
            time: "Do-Nachmittag",
            name: "Wandern",
            free_slots: 20
        },
        {
            time: "Do-Nachmittag",
            name: "Entspannung und Meditation",
            free_slots: 15
        },
        {
            time: "Do-Nachmittag",
            name: "Yoga",
            free_slots: 20
        },
        {
            time: "Do-Nachmittag",
            name: "Tanzen",
            free_slots: 15
        },
        {
            time: "Do-Nachmittag",
            name: "Klettern",
            free_slots: 15
        },
    ];
    // check if projects collection exists and if there are no projects
    const projectscount = await db.collection("projects").countDocuments({});
    if (projectscount === 0) {
        // init projects collection
        await db.collection("projects").insertMany(projects);
    }
};
