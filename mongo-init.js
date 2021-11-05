/* eslint no-undef: "off" */

// const { ObjectId } = require('bson')

/*
This script will only run if there is no existing database.
To trigger on subsequent Docker builds, make sure to run
`docker volume rm ussf-portal-client-mongodb_data_container`

The variable 'db' refers to the $MONGO_INITDB_DATABASE
variable declared in the MongoDB Docker container in docker-compose.yml

*/

print('✅ Connected to database: ', db)

db.createCollection('users')

const exampleCollection1 = {
  __typename: 'Collection',
  title: 'Example Collection',
  _id: new ObjectId(),
  bookmarks: [
    {
      __typename: 'Bookmark',
      _id: new ObjectId(),
      url: 'https://google.com',
      label: 'Webmail',
      description: 'Lorem ipsum',
    },
    {
      __typename: 'Bookmark',
      _id: new ObjectId(),
      url: 'https://mypay.dfas.mil/#/',
      label: 'MyPay',
      description: 'Lorem ipsum',
    },
    {
      __typename: 'Bookmark',
      _id: new ObjectId(),
      url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
      label: 'vMPF',
      description: 'Lorem ipsum',
    },
    {
      __typename: 'Bookmark',
      _id: new ObjectId(),
      url: 'https://leave.af.mil/profile',
      label: 'LeaveWeb',
      description: 'Lorem ipsum',
    },
    {
      __typename: 'Bookmark',
      _id: new ObjectId(),
      url: 'https://www.e-publishing.af.mil/',
      label: 'e-Publications',
      description: 'Lorem ipsum',
    },
  ],
}

// db.mySpace.insertOne(exampleCollection1)

// const createdCollection1 = db.mySpace.find({}).toArray()
// const collectionId1 = createdCollection1[0]._id

const exampleCollection2 = {
  __typename: 'Collection',
  title: 'Second Collection',
  _id: new ObjectId(),
  bookmarks: [
    {
      __typename: 'Bookmark',
      _id: new ObjectId(),
      url: 'https://google.com',
      label: 'Search Engine',
      description: 'Lorem ipsum',
    },
  ],
}

// db.mySpace.insertOne(exampleCollection2)

// const createdCollection2 = db.mySpace.find({}).toArray()
// const collectionId2 = createdCollection2[1]._id

// db.users.updateOne(
//   {
//     _id: userId,
//   },
//   {
//     $push: {
//       mySpace: {
//         $each: [collectionId1, collectionId2],
//       },
//     },
//   }
// )

const exampleUser = {
  commonName: 'HALL.MICHAEL.0123456789',
  isBeta: true,
  mySpace: [exampleCollection1, exampleCollection2],
}

db.users.insertOne(exampleUser)

// const createdUser = db.users.find({}).toArray()
// const userId = createdUser[0]._id
