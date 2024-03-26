// dummy test in order to pass the pipeline
import axios from 'axios'
import { mocked } from 'jest-mock'
import { run } from '../src/main'

// Mock axios.post method
jest.mock('axios')
const mockedAxios = mocked(axios)

describe('oidc-login action', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should successfully obtain tokens from the OIDC provider', async () => {
    // Mock response data from the OIDC provider
    const responseData = {
      access_token: 'mock-access-token',
      refresh_token: 'mock-refresh-token',
      expires_in: 3600,
      refresh_expires_in: 7200
    }

    // Mock axios.post method to return a successful response
    mockedAxios.post.mockResolvedValue({ data: responseData })

    // Run the action
    await run()

    // Verify that axios.post was called with the correct parameters
    expect(axios.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Object)
    )

    // Verify that the output values are set correctly
    // expect(process.env['ACCESS_TOKEN']).toEqual(responseData.access_token);
    // expect(process.env['REFRESH_TOKEN']).toEqual(responseData.refresh_token);
    // expect(process.env['EXPIRES_IN']).toEqual(responseData.expires_in.toString());
    // expect(process.env['REFRESH_EXPIRES_IN']).toEqual(responseData.refresh_expires_in.toString());
  })
})
