import TelegramAnalytics from "@telegram-apps/analytics";

TelegramAnalytics.init({
    token: process.env.NEXT_PUBLIC_TON_AUTH_TOKEN || "",
    appName: "Checkpointfam",
});
