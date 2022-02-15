/* eslint no-undef: "off" */

/*
This script will only run when using docker-compose.dev and 
if there is no existing database.
To trigger on subsequent Docker builds, make sure to run
`docker volume rm ussf-portal-client-mongodb_data_container`

The variable 'db' refers to the $MONGO_INITDB_DATABASE
variable declared in the MongoDB Docker container in docker-compose.yml

*/

print('✅ Connected to database: ', db)

db.createCollection('users')

const exampleCollection1 = {
  title: 'Example Collection',
  _id: new ObjectId(),
  bookmarks: [
    {
      _id: new ObjectId(),
      url: 'https://google.com',
      label: 'Webmail',
    },
    {
      _id: new ObjectId(),
      url: 'https://mypay.dfas.mil/#/',
      label: 'MyPay',
      cmsId: 'cktd7hjz30636w5977vu4la4c',
    },
    {
      _id: new ObjectId(),
      url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
      label: 'vMPF',
      cmsId: 'cktd7c0d30190w597qoftevq1',
    },
    {
      _id: new ObjectId(),
      url: 'https://leave.af.mil/profile',
      label: 'LeaveWeb',
      cmsId: 'cktd7ettn0457w597p7ja4uye',
    },
    {
      _id: new ObjectId(),
      url: 'https://mypers.af.mil',
      label: 'EPRs/OPRs',
      cmsId: 'cktd7anq40068w597xloypsez',
    },
  ],
}

const exampleCollection2 = {
  title: 'Second Collection',
  _id: new ObjectId(),
  bookmarks: [
    {
      _id: new ObjectId(),
      url: 'https://google.com',
      label: 'Search Engine',
    },
  ],
}

const exampleUser = {
  userId: 'HALL.MICHAEL.0123456789',
  mySpace: [exampleCollection1, exampleCollection2],
}

db.users.insertOne(exampleUser)
