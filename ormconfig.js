module.exports = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "synchronize": true,
    "logging": true,
    "ssl": true,
    "extra": {
        "ssl": {
            "rejectUnauthorized": false
        }
    },
    "entities": [
        "./dist/modules/**/infra/typeorm/entities/*.js"
    ],
    "migrations": [
        "./dist/shared/infra/typeorm/migrations/*.js"
    ],
    "cli": {
        "migrationsDir": "./dist/shared/infra/typeorm/migrations"
    }
}
