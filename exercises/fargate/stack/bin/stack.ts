#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { FargateStack } from '../lib/stack-stack';

const app = new cdk.App();

new FargateStack(app, 'FargateStack', {
	env: {
		region: 'eu-north-1',
	},
});
