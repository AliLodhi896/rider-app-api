/**
 * Datastores
 * (sails.config.datastores)
 *
 * A set of datastore configurations which tell Sails where to fetch or save
 * data when you execute built-in model methods like `.find()` and `.create()`.
 *
 *  > This file is mainly useful for configuring your development database,
 *  > as well as any additional one-off databases used by individual models.
 *  > Ready to go live?  Head towards `config/env/production.js`.
 *
 * For more information on configuring datastores, check out:
 * https://sailsjs.com/config/datastores
 */

module.exports.datastores = {
  default: {
    adapter: "sails-mysql",
    user: "admin",
    port: "3306",
    host: "uctest.cnfrheeyiqrl.ap-south-1.rds.amazonaws.com",
    database: "UCLEAN",
    password: "ucTest123",
  },
};

// default: {
//   adapter: "sails-mysql",
//   host: "uctest.cnfrheeyiqrl.ap-south-1.rds.amazonaws.com",
//   port: 3306,
//   user: "admin",
//   password: "ucTest123",
//   database: "UCLEAN",
//   timezone: "ist",
// },
