module.exports = {
    "apps": [
        // 1
        {
            name: "metafanpagesupport.pro",
            cwd: "../exins/build",
            script: "npx",
            args: "serve -s metafanpagesupport.pro -p " + 3001
        },

        {
            name: "api.metafanpagesupport.pro",
            cwd: "./be-telegram-bots",
            script: "npm",
            args: "start",
            env: {
                PORT: 3002,
                MONGO_NAME: "metafanpagesupportpro",
                TELEGRAM_ROOM: "-4041758075", 
                TELEGRAM_BOT: "6438110441:AAFCZPL9w5jWGJBdKwqMpDsPZvHf4vT8jqQ"
            }
        },

    ]
}