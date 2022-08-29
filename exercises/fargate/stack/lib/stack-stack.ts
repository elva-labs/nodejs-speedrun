import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class FargateStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		// Ideally create the cluster in another stack and import it
		// or make use of `ecs.Cluster.fromClusterArn` on an already existing cluster.
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
				desiredCount: 3,
				taskImageOptions: {
					image: ecs.ContainerImage.fromRegistry(
						// replace with your ECR repo.
						'995932554241.dkr.ecr.eu-north-1.amazonaws.com/fargate-demo:3'
					),
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
