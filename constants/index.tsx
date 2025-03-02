import { BsPeopleFill } from "react-icons/bs";
import { BsShare, BsHeartFill, BsChatDotsFill, BsGlobe } from "react-icons/bs";
export const limitedTasks = [
    {
        id: "IN2a1b3c4d6e7f8a9b0c1d01",
        title: "Invite 5 Friends",
        taskIcon: <BsPeopleFill />,
        points: 50
    },

    {
        id: "IN2a1b3c4d6e7f8a9b0c1d02",
        title: "Invite 10 Friends",
        taskIcon: <BsPeopleFill />,
        points: 100
    },

    {
        id: "IN2a1b3c4d6e7f8a9b0c1d03",
        title: "Invite 20 Friends",
        taskIcon: <BsPeopleFill />,
        points: 200
    },

    {
        id: "IN2a1b3c4d6e7f8a9b0c1d04",
        title: "Invite 50 Friends",
        taskIcon: <BsPeopleFill />,
        points: 500
    },
]

export const socialMediaTasks = [
    {
        id: "SM2a1b3c4d6e7f8a9b0c1d01",
        title: "Share on Social Media",
        taskIcon: <BsShare />,
        points: 30
    },

    {
        id: "SM2a1b3c4d6e7f8a9b0c1d02",
        title: "Like a Post",
        taskIcon: <BsHeartFill />,
        points: 10
    },

    {
        id: "SM2a1b3c4d6e7f8a9b0c1d03",
        title: "Comment on a Post",
        taskIcon: <BsChatDotsFill />,
        points: 20
    },

    {
        id: "SM2a1b3c4d6e7f8a9b0c1d04",
        title: "Visit Website",
        taskIcon: <BsGlobe />,
        points: 40
    },
];


const checkpoints = [
    { day: "Day 01", number: 10 },
    { day: "Day 02", number: 20 },
    { day: "Day 03", number: 30, isSpecial: true },
    { day: "Day 04", number: 40 },
    { day: "Day 05", number: 50 },
    { day: "Day 06", number: 60 },
    { day: "Day 07", number: 70 },
    { day: "Day 08", number: 80, isSpecial: true },
    { day: "Day 09", number: 90 },
    { day: "Day 10", number: 100 },
    { day: "Day 11", number: 110 },
    { day: "Day 12", number: 120 },
    { day: "Day 13", number: 130 },
    { day: "Day 14", number: 140, isSpecial: true },
    { day: "Day 15", number: 150 }
];

export {checkpoints};