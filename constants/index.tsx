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


import { BsCoin, BsGift, BsTelegram, BsPersonCheck } from "react-icons/bs";

export const partnerAirdropTasks = [
    {
        id: "PA2a1b3c4d6e7f8a9b0c1d01",
        title: "Join Partner Telegram",
        taskIcon: <BsTelegram />,
        points: 50,
        partnerBg : "https://blog.obiex.finance/content/images/size/w720/2024/02/blog-cover45.jpg"
    },

    {
        id: "PA2a1b3c4d6e7f8a9b0c1d02",
        title: "Follow Partner on Twitter",
        taskIcon: <BsPersonCheck />,
        points: 30,
        partnerBg : "https://blog.obiex.finance/content/images/size/w720/2024/02/blog-cover45.jpg"
    },

    {
        id: "PA2a1b3c4d6e7f8a9b0c1d03",
        title: "Claim Partner Airdrop",
        taskIcon: <BsGift />,
        points: 100,
        partnerBg : "https://miro.medium.com/v2/resize:fit:720/format:webp/0*BpBk3olJUw5TiqCF.png"
    },

    {
        id: "PA2a1b3c4d6e7f8a9b0c1d04",
        title: "Stake Partner Tokens",
        taskIcon: <BsCoin />,
        points: 200,
        partnerBg : "https://miro.medium.com/v2/resize:fit:720/format:webp/0*BpBk3olJUw5TiqCF.png"
    },
];
