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
        query: `query GetUser($getUserId: String!) {
        getUser(id: $getUserId) {
            First_name
            Last_Name
            DOD_ID
            Grade
            MAJCOM
            DUTYTITLE
            Country
            BASE_LOC
            Org_type
            Rank {
              Title
              Abbreviation
              Grade
              GradeId
            }
            EOPDate
            userType
            lastModifiedAt
        }
      }`,
        variables: {
          getUserId: dodId,
        },
      },
    })
  }
}

export default PersonnelAPI
