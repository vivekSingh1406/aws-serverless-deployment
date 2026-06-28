import json
import boto3
import base64
import uuid
import datetime

s3 = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')

BUCKET_NAME = "your-company-documents-bucket"
TABLE_NAME = "CompanyDetails"

table = dynamodb.Table(TABLE_NAME)


def lambda_handler(event, context):

    try:
        body = json.loads(event['body'])

        company_id = str(uuid.uuid4())

        company_name = body['companyName']
        address = body['address']
        work = body['work']
        revenue = body['revenue']

        file_name = body['fileName']
        file_type = body['fileType']
        file_data = body['fileData']

        # Decode file
        file_bytes = base64.b64decode(file_data)

        s3_key = f"company/{company_id}_{file_name}"

        # Upload to S3
        s3.put_object(
            Bucket=BUCKET_NAME,
            Key=s3_key,
            Body=file_bytes,
            ContentType=file_type
        )

        file_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{s3_key}"

        # Save to DynamoDB
        table.put_item(
            Item={
                "companyId": company_id,
                "companyName": company_name,
                "address": address,
                "work": work,
                "revenue": revenue,
                "fileUrl": file_url,
                "createdAt": str(datetime.datetime.now())
            }
        )

        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "message": "Company saved successfully",
                "companyId": company_id
            })
        }

    except Exception as e:

        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps(str(e))
        }