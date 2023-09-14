import { RESTDataSource } from 'apollo-datasource-rest'

class PersonnelAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.PERSONNEL_API_URL
  }

  async getUserData(dodId: string) {
    // This sends a GraphQL query to the external Personnel API
    if (!this.baseURL) throw new Error('No Personnel API URL found')

    return this.post(this.baseURL + `/api/graphql`, {
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
    })
  }
}

export default PersonnelAPI
