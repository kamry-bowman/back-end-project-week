exports.up = (knex) =>
  knex.schema.alterTable('users', (users) => {
    users
      .string('password')
      .nullable()
      .alter();

    users
      .enu('account', ['local', 'google'])
      .notNullable()
      .defaultTo('local');
  });

exports.down = (knex) =>
  knex.schema.alterTable('users', (users) => {
    users
      .string('password')
      .notNullable()
      .alter();

    users.dropColumn('account');
  });
