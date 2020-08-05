import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('classes', table =>{
        table.increments('id').primary(),
        table.string('subject').notNullable(),
        table.decimal('cost').notNullable(),

        table.integer('user_id').notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
}

// O CASCADE deleta tudo que tem haver com o registro que ele
//se relaciona
/*
O onUpdate é oque irá acontecer com o id do usuário salvo
dentro da tabela classes se esse id for alterado lá na tabela
de usuários.
*/

export async function down (knex: Knex) {
    return knex.schema.dropTable('classes')
}