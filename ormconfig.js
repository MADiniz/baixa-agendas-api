module.exports = {
    "type": "postgres",
    "host": process.env.DATABASE_HOST,
    "port": 5432,
    "username": process.env.DATABASE_USERNAME,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_DB,
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
        "migrationsDir": "./src/shared/infra/typeorm/migrations"
    }
}
