import * as core from '@actions/core'
import axios from 'axios'
/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const username = core.getInput('username')
    const password = core.getInput('password')
    const url = core.getInput('url')
    const clientId = core.getInput('client_id')
    const clientSecret = core.getInput('client_secret')
    const grantType = core.getInput('grant_type')
    const scope = core.getInput('scope')
    const audiance = core.getInput('audiance')

    // Construct the payload based on inputs
    const payload: any = {
      client_id: clientId,
      username,
      password
    }

    if (clientSecret) {
      payload.client_secret = clientSecret
    }
    if (scope) {
      payload.scope = scope
    }
    if (grantType) {
      payload.grant_type = grantType
    }
    if (audiance) {
      payload.audience = audiance
    }

    // Make a request to the OIDC provider
    const response = await axios.post(url, payload)

    // Extract relevant data from the response
    const { access_token, refresh_token, expires_in, refresh_expires_in } =
      response.data

    // Set the outputs
    core.setOutput('access_token', access_token)
    core.setOutput('refresh_token', refresh_token)
    core.setOutput('expires_in', expires_in)
    core.setOutput('refresh_expires_in', refresh_expires_in)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
