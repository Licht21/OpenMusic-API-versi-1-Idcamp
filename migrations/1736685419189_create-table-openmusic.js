/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('albums',{
        id:{
            type: 'VARCHAR(30)',
            primaryKey: true
        },
        name:{
            type: 'TEXT',
            notNull: true
        },
        year:{
            type: 'INTEGER',
            notNull: true
        }
    })
    pgm.createTable('musics',{
        id:{
            type: 'VARCHAR(30)',
            primaryKey: true
        },
        title:{
            type: 'TEXT',
            notNull: true
        },
        year:{
            type: 'INTEGER',
            notNull: true
        },
        performer:{
            type: 'TEXT',
            notNull:true
        },
        genre:{
            type: 'TEXT',
            notNull:true
        },
        duration:{
            type: 'INTEGER',
            allowNull:true
        },
        album_id:{
            type:'VARCHAR(30)',
            allowNull:true
        }
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('albums')
    pgm.dropTable('musics')
};
