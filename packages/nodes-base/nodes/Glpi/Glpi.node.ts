import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
} from 'n8n-workflow';

import {
	OptionsWithUri,
} from 'request';

import {
	sessionOperations,
	profileOperations,
	resourceDescription,
	computerOperations,
	customOperations,
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
			...customOperations,
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
			let url;
			let body = {};
			switch (operation) {
				case 'getActiveProfile':
					url = 'getActiveProfile';
					break;
				case 'getMyProfiles':
					url = 'getMyProfiles';
					break;
				case 'changeActiveProfile':
					url = 'changeActiveProfile';
					const profileID = this.getNodeParameter('profiles_id', 0) as string;
					body = {
						'profiles_id': `${profileID}`,
					};
					break;
			}
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
			if (operation === 'changeActiveProfile') {
				options.body = body;
				options.method = 'POST';
			}
			responseData = await this.helpers.request(options);
	}

	if (resource === 'computer') {
		const sessionToken = this.getNodeParameter('sessionToken', 0) as string;
		let computerFields;
		if (operation === 'create' || operation === 'update' || operation === 'get')
			computerFields = this.getNodeParameter('additionalFields', 1, []) as IDataObject[];

		const options: OptionsWithUri = {
			headers: {
				'Accept': 'application/json',
				'App-Token': `${credentials.appToken}`,
				'Session-Token': `${sessionToken}`,
			},
			method: 'GET',
			uri: `${credentials.url}/Computer`,
			json: true,
		};
		if (operation === 'create') {
			options.method='POST';
			const input = {"input": computerFields};
			options.body=input;
		}
		if (operation === 'update') {
			options.method='PUT';
			const input = {"input": computerFields};
			options.body=input;
		}
		if (operation === 'delete') {
			options.method='DELETE';
			const id = this.getNodeParameter('id', 0) as string;
			const input = {"input": {"id": `${id}`}};
			options.body=input;
		}
		if (operation === 'get') {
			options.method='GET';
			const id = this.getNodeParameter('id', 0) as string;
			options.uri+= `/${id}`;
		}
		responseData = await this.helpers.request(options);
	}
	if (resource === 'custom') {
	  let customFields;
		const sessionToken = this.getNodeParameter('sessionToken', 0) as string;
		const itemtype = this.getNodeParameter('itemtype', 0) as string;
		let computerFields;
		if (operation === 'create' || operation === 'update' || operation === 'get')
			customFields = this.getNodeParameter('additionalFields', 1, []) as IDataObject[];

		const options: OptionsWithUri = {
			headers: {
				'Accept': 'application/json',
				'App-Token': `${credentials.appToken}`,
				'Session-Token': `${sessionToken}`,
			},
			method: 'GET',
			uri: `${credentials.url}/${itemtype}`,
			json: true,
		};
		if (operation === 'create') {
			options.method='POST';
			const input = {"input": customFields};
			options.body=input;
		}
		if (operation === 'update') {
			options.method='PUT';
			const input = {"input": customFields};
			options.body=input;
		}
		if (operation === 'delete') {
			options.method='DELETE';
			const id = this.getNodeParameter('id', 0) as string;
			const input = {"input": {"id": `${id}`}};
			options.body=input;
		}
		if (operation === 'get') {
			options.method='GET';
			const id = this.getNodeParameter('id', 0) as string;
			options.uri+= `/${id}`;
		}
		responseData = await this.helpers.request(options);
	}


		// Map data to n8n data
		return [this.helpers.returnJsonArray(responseData)];
	}
}

export function getAllFields(object: string) {
	return getFields(object).filter((field: IDataObject) => field.value !== '*').map((field: IDataObject) => field.value);
}

export function getFields(object: string) {
	const data = {
		'options': [
		  {
				value: 'expand_dropdowns',
			},
			{
				value: 'with_devices',
			},
	]
	} as { [key: string]: any };

	return [{ name: '*', value: '*' }].concat(data[object as string] || [])
		.map((fieldObject: IDataObject) =>
			({ ...fieldObject, name: (fieldObject.value !== '*') ? fieldObject.value as string : fieldObject.value }));
}
