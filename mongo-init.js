/* eslint no-undef: "off" */
db = db.getSiblingDB('dev')

db.createCollection('users')

db.users.insertMany([
  {
    name: 'Grace Griffin',
    email: 'gracegriffin@example.com',
  },
  {
    name: 'Sophia Smith',
    email: 'sophiasmith@example.com',
  },
  {
    name: 'Lily White',
    email: 'lilywhite@example.com',
  },
])
