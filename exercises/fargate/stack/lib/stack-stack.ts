import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecra from 'aws-cdk-lib/aws-ecr-assets';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class FargateStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);
		// Build and push image
		const image = new ecra.DockerImageAsset(this, 'FargateDemoServiceImage', {
			directory: '..',
		});

		// Setup cluster & related vpc
		// In a larger project we'd create this cluster in a separate stack and import
		// the attributes that we need to deploy our service
		const vpc = new ec2.Vpc(this, 'FargateVPC');
		const cluster = new ecs.Cluster(this, 'FargateCluster', {
			vpc,
			clusterName: 'fargate-demo',
		});

		// Next, define our Fargate application and deploy it in the cluster
		const service = new ecs_patterns.ApplicationLoadBalancedFargateService(
			this,
			'MyFargateService',
			{
				cluster,
				desiredCount: 2,
				taskImageOptions: {
					image: ecs.ContainerImage.fromRegistry(image.imageUri),
					containerPort: 3000,
					environment: {
						NODE_HELLO: 'Hello',
					},
				},
				publicLoadBalancer: true,
			}
		);

		// Since we use an already existing repo we need to allow the
		// execution role to fetch from the repo.
		service.taskDefinition.addToExecutionRolePolicy(
			new PolicyStatement({
				effect: Effect.ALLOW,
				resources: ['*'],
				actions: [
					'ecr:GetAuthorizationToken',
					'ecr:BatchCheckLayerAvailability',
					'ecr:GetDownloadUrlForLayer',
					'ecr:BatchGetImage',
					'logs:CreateLogStream',
					'logs:PutLogEvents',
				],
			})
		);
	}
}
