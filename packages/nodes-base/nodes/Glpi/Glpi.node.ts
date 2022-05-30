import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	OptionsWithUri,
} from 'request';

import {
	sessionOperations,
	profileOperations,
	resourceDescription,
	computerOperations,
} from './descriptions';

export class Glpi implements INodeType {
	// eslint-disable-next-line n8n-nodes-base/node-class-description-missing-subtitle
	description: INodeTypeDescription = {
		displayName: 'Glpi',
		name: 'Glpi',
		icon: 'file:glpi.svg',
		group: ['input'],
		version: 1,
		description: 'Consume Glpi API',
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		defaults: {
			name: 'Glpi',
			color: '#1A82e2',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'GlpiApi',
				required: true,
				//testedBy: 'GlpiApiTest',
			},

		],
		properties: [
			...resourceDescription,
			...computerOperations,
			...sessionOperations,
			...profileOperations,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		let responseData;
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		//Get credentials the user provided for this node
		const credentials = await this.getCredentials('GlpiApi') as IDataObject;

		if (resource === 'session') {
			if (operation === 'login') {
				const userToken = this.getNodeParameter('userToken', 0) as string;

				const options: OptionsWithUri = {
					headers: {
						'Accept': 'application/json',
						'App-Token': `${credentials.appToken}`,
						'Authorization': `user_token ${userToken}`,
					},
					method: 'GET',
					uri: `${credentials.url}initSession`,
					json: true,
				};
				responseData = await this.helpers.request(options);
			}

			if (operation === 'logout') {
				const sessionToken = this.getNodeParameter('sessionToken', 0) as string;

				const options: OptionsWithUri = {
					headers: {
						'Accept': 'application/json',
						'App-Token': `${credentials.appToken}`,
						'Session-Token': `${sessionToken}`,
					},
					method: 'GET',
					uri: `${credentials.url}killSession`,
					json: true,
				};
				responseData = await this.helpers.request(options);

			}

		}

		if (resource === 'profile') {
			const sessionToken = this.getNodeParameter('sessionToken', 0) as string;

			if (operation === 'getActiveProfile' || operation === 'getMyProfiles') {

				let url = (operation === 'getMyProfiles')?'getMyProfiles':'getActiveProfile'
				const options: OptionsWithUri = {
					headers: {
						'Accept': 'application/json',
						'App-Token': `${credentials.appToken}`,
						'Session-Token': `${sessionToken}`,
					},
					method: 'GET',
					uri: `${credentials.url}${url}`,
					json: true,
				};
				responseData = await this.helpers.request(options);

			}

			if (operation === 'changeActiveProfile') {
				const sessionToken = this.getNodeParameter('sessionToken', 0) as string;
				const profileID = this.getNodeParameter('profiles_id', 0) as string;

				const options: OptionsWithUri = {
					headers: {
						'Accept': 'application/json',
						'App-Token': `${credentials.appToken}`,
						'Session-Token': `${sessionToken}`,
					},
					body: {
						'profiles_id': `${profileID}`,
					},
					method: 'POST',
					uri: `${credentials.url}changeActiveProfile`,
					json: true,
				};
				responseData = await this.helpers.request(options);

			}

		}

		// Map data to n8n data
		return [this.helpers.returnJsonArray(responseData)];
	}
}

