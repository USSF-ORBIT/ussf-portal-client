/* eslint no-undef: "off" */

/*
This script will only run if there is no existing database. 
To trigger on subsequent Docker builds, make sure to run
`docker volume rm ussf-portal-client-mongodb_data_container`

The variable 'db' refers to the $MONGO_INITDB_DATABASE
variable declared in the MongoDB Docker container in docker-compose.yml

*/

print('✅ Connected to database: ', db)

db.createCollection('users')

const exampleCollection = {
  __typename: 'Collection',
  id: '96b1ff31-f668-4fc3-91e2-c9c981d7adc0',
  title: 'Example Collection',
  bookmarks: [
    {
      __typename: 'Bookmark',
      id: '7f2da5b2-869a-413b-959f-8e1a76a6c735',
      url: 'https://google.com',
      label: 'Webmail',
      description: 'Lorem ipsum',
    },
    {
      __typename: 'Bookmark',
      id: '31337edc-51c0-4128-9bd2-14f1373f2cd7',
      url: 'https://mypay.dfas.mil/#/',
      label: 'MyPay',
      description: 'Lorem ipsum',
    },
    {
      __typename: 'Bookmark',
      id: '2c27577b-a30f-43e9-9637-72573497074f',
      url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
      label: 'vMPF',
      description: 'Lorem ipsum',
    },
    {
      __typename: 'Bookmark',
      id: '60a4614f-0db6-4077-a1a8-d6a3b5c5ea2e',
      url: 'https://leave.af.mil/profile',
      label: 'LeaveWeb',
      description: 'Lorem ipsum',
    },
    {
      __typename: 'Bookmark',
      id: '6856241b-9c34-4a89-94aa-cbee47e93a10',
      url: 'https://www.e-publishing.af.mil/',
      label: 'e-Publications',
      description: 'Lorem ipsum',
    },
  ],
}

const exampleUser = {
  userId: '252c9a64-48bf-4b22-acd9-a211a9b0b272',
  collections: exampleCollection,
}

db.users.insertOne(exampleUser)
