"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (db) => {
    const projects = [
        // Mittwoch Vormittag
        {
            time: "Mi-Vormittag",
            option_name: "Fußball",
            free_slots: 20
        },
        {
            time: "Mi-Vormittag",
            option_name: "Volleyballl",
            free_slots: 20
        },
        {
            time: "Mi-Vormittag",
            option_name: "Basketball",
            free_slots: 20
        },
        {
            time: "Mi-Vormittag",
            option_name: "Krafttraining",
            free_slots: 20
        },
        {
            time: "Mi-Vormittag",
            option_name: "Entspannung und Meditation",
            free_slots: 20
        },
        {
            time: "Mi-Vormittag",
            option_name: "Yoga",
            free_slots: 20
        },
        {
            time: "Mi-Vormittag",
            option_name: "Tanzen",
            free_slots: 20
        },
        {
            time: "Mi-Vormittag",
            option_name: "Klettern",
            free_slots: 20
        },
        {
            time: "Mi-Vormittag",
            option_name: "Turnen",
            free_slots: 20
        },
        {
            time: "Mi-Vormittag",
            option_name: "Tischtennis",
            free_slots: 20
        },
        // Mittwoch Nachmittag
        {
            time: "Mi-Nachmittag",
            option_name: "Fußball",
            free_slots: 20
        },
        {
            time: "Mi-Nachmittag",
            option_name: "Volleyballl",
            free_slots: 40
        },
        {
            time: "Mi-Nachmittag",
            option_name: "Basketball",
            free_slots: 20
        },
        {
            time: "Mi-Nachmittag",
            option_name: "Krafttraining",
            free_slots: 20
        },
        {
            time: "Mi-Nachmittag",
            option_name: "Wandern",
            free_slots: 20
        },
        {
            time: "Mi-Nachmittag",
            option_name: "Entspannung und Meditation",
            free_slots: 20
        },
        {
            time: "Mi-Nachmittag",
            option_name: "Yoga",
            free_slots: 20
        },
        {
            time: "Mi-Nachmittag",
            option_name: "Tanzen",
            free_slots: 20
        },
        {
            time: "Mi-Nachmittag",
            option_name: "Klettern",
            free_slots: 20
        },
        // Donnerstag Vormittag
        {
            time: "Do-Vormittag",
            option_name: "Fußball",
            free_slots: 20
        },
        {
            time: "Do-Vormittag",
            option_name: "Volleyballl",
            free_slots: 40
        },
        {
            time: "Do-Vormittag",
            option_name: "Basketball",
            free_slots: 20
        },
        {
            time: "Do-Vormittag",
            option_name: "Krafttraining",
            free_slots: 20
        },
        {
            time: "Do-Vormittag",
            option_name: "Wandern",
            free_slots: 20
        },
        {
            time: "Do-Vormittag",
            option_name: "Entspannung und Meditation",
            free_slots: 20
        },
        {
            time: "Do-Vormittag",
            option_name: "Yoga",
            free_slots: 20
        },
        {
            time: "Do-Vormittag",
            option_name: "Tanzen",
            free_slots: 20
        },
        {
            time: "Do-Vormittag",
            option_name: "Klettern",
            free_slots: 20
        },
        // Donnerstag Nachmittag
        {
            time: "Do-Nachmittag",
            option_name: "Fußball",
            free_slots: 20
        },
        {
            time: "Do-Nachmittag",
            option_name: "Volleyballl",
            free_slots: 40
        },
        {
            time: "Do-Nachmittag",
            option_name: "Basketball",
            free_slots: 20
        },
        {
            time: "Do-Nachmittag",
            option_name: "Krafttraining",
            free_slots: 20
        },
        {
            time: "Do-Nachmittag",
            option_name: "Wandern",
            free_slots: 20
        },
        {
            time: "Do-Nachmittag",
            option_name: "Entspannung und Meditation",
            free_slots: 20
        },
        {
            time: "Do-Nachmittag",
            option_name: "Yoga",
            free_slots: 20
        },
        {
            time: "Do-Nachmittag",
            option_name: "Tanzen",
            free_slots: 20
        },
        {
            time: "Do-Nachmittag",
            option_name: "Klettern",
            free_slots: 20
        },
    ];
    // check if projects collection exists and if there are no projects
    const projectscount = await db.collection("projects").countDocuments({});
    if (projectscount === 0) {
        // init projects collection
        await db.collection("projects").insertMany(projects);
    }
};
