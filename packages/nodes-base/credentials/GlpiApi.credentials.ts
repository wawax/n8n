import { ICredentialType, INodeProperties, NodePropertyTypes } from 'n8n-workflow';

export class GlpiApi implements ICredentialType {
	name = 'GlpiApi';
	displayName = 'Glpi API';
	documentationUrl = 'glpi';
	properties: INodeProperties[] = [
		{
			displayName: 'Site URL',
			name: 'url',
			type: 'string' as NodePropertyTypes,
			default: '',
			placeholder: 'https://glpi.my-organization.com',
			required: true,
		},
		{
			displayName: 'App Token',
			name: 'appToken',
			type: 'string' as NodePropertyTypes,
			default: '',
			placeholder: 'HAXeWCLWk3AyCtXjS3Y0Lwve1GVriKZLffEEHhSc',
			required: true,
		},
		{
			displayName: 'User Token',
			name: 'userToken',
			type: 'string' as NodePropertyTypes,
			default: '',
			placeholder: 'HAXeWCLWk3AyCtXjS3Y0Lwve1GVriKZLffEEHhSc',
			required: true,
		},
	];
}
