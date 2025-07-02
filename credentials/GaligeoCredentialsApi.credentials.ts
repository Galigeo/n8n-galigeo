import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class GaligeoCredentialsApi implements ICredentialType {
	name = 'galigeoCredentialsApi';
	displayName = 'Galigeo Credentials API';

	documentationUrl = 'https://your-docs-url';

	properties: INodeProperties[] = [
		// The credentials to get from user and save encrypted.
		// Properties can be defined exactly in the same way
		// as node properties.
		{
			displayName: 'User Name',
			name: 'username',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
		{
			displayName: 'Organization',
			name: 'organization',
			type: 'string',
			default: '',
			description: 'The organization you want to access',
		},
	];

	// This credential is currently not used by any node directly
	// but the HTTP Request node can use it to make requests.
	// The credential is also testable due to the `test` property below
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			// These aren't used if you do custom requests in the node
		},
	};

	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
			method: 'POST',
			url: 'https://cloud2.galigeo.com/Galigeo/feature/portal/login',
			body: {
				userName: '={{ $credentials.username }}',
				password: '={{ $credentials.password }}',
				orgId: '={{ $credentials.organization }}',
			},
			headers: {
				'Content-Type': 'application/json',
			},
		},
	};

}
