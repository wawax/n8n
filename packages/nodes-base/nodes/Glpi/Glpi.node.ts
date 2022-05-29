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
} from './descriptions';
import { computerOperations } from './descriptions/ComputerDescription';

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
			...sessionOperations,
			...profileOperations,
			...computerOperations,

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
				const options: OptionsWithUri = {
					headers: {
						'Accept': 'application/json',
						'App-Token': `${credentials.appToken}`,
						'Authorization': `user_token ${credentials.userToken}`,
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

		// Map data to n8n data
		return [this.helpers.returnJsonArray(responseData)];
	}
}

