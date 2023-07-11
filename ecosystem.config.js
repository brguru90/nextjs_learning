module.exports = {
    apps: [
        {
            name: "next_js_demo",
            script: "./frontend/server.js",
            watch: false,
            "ignore_watch": ["production.database.sqlite", "production.database.sqlite-journal"],
            "max_memory_restart": "2000M",
            "node_args": [
                "--max_old_space_size=3000"
            ],
            instances: "8",
            exec_mode: "cluster",
            env_qa: {
                "SERVER_PORT": 8888,
                "NODE_ENV": "testing",
                "JWT_SECRET_KEY": "qa_jwt_key_1234",
                "DEPLOY":"node",
                "NEXT_SERVER":"true"
            },
            env_production: {
                "SERVER_PORT": 8080,
                "NODE_ENV": "production",
                "JWT_SECRET_KEY": "prod_jwt_key_1234",
                "DEPLOY":"node",
                "NEXT_SERVER":"true"
            }
        }
    ]
}