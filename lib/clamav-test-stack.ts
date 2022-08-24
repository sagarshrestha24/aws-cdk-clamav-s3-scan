import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Stack, StackProps, RemovalPolicy, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ServerlessClamscan } from 'cdk-serverless-clamscan';

export class ClamavTestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const sc = new ServerlessClamscan(this, 'rClamscan', {});
    const bucket = new Bucket(this, 'rBucket', {
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY
    });
    sc.addSourceBucket(bucket);
    new CfnOutput(this, 'oBucketName', {
      description: 'The name of the input S3 Bucket',
      value: bucket.bucketName
    })
  }
}