import { RESTDataSource } from '@apollo/datasource-rest'
import type { KeyValueCache } from '@apollo/utils.keyvaluecache'

class PersonnelAPI extends RESTDataSource {
  override baseURL = process.env.PERSONNEL_API_URL

  constructor(options: { cache: KeyValueCache }) {
    super(options)
  }

  async getUserData(dodId: string) {
    // This sends a GraphQL query to the external Personnel API
    if (!this.baseURL) throw new Error('No Personnel API URL found')

    return this.post(this.baseURL + `/api/graphql`, {
      body: {
        query: getUserQuery,
        variables: {
          getUserId: dodId,
        },
      },
    })
  }

  async getGuardianDirectory() {
    if (!this.baseURL) throw new Error('No Personnel API URL found')

    return this.post(this.baseURL + `/api/graphql`, {
      body: {
        query: getGuardianDirectoryQuery,
      },
    })
  }
}

/* Queries for reference */
const getUserQuery = `
  query GetUser($getUserId: String!) {
    getUser(id: $getUserId) {
      FirstName
      LastName
      DOD_ID
      Grade
      MajCom
      DutyTitle
      Country
      BaseLoc
      OrgType
      Rank {
        Title
        Abbreviation
        Grade
        GradeId
      }
      EOPDate
      UserType
      lastModifiedAt
    }
  }
`

const getGuardianDirectoryQuery = `
query GetGuardianDirectory {
  getGuardianDirectory {
    DOD_ID
    FirstName
    LastName
    DutyTitle
    Rank {
      Abbreviation
      Grade
      GradeId
      Title
    }
    Email
    BaseLoc
    MajCom
  }
}
`

export default PersonnelAPI
