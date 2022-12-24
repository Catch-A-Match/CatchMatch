## Steps
1. Create an `S3` bucket to upload the code
2. Use command to upload the folder
```
aws s3 cp code s3://my-bucket/code --recursive
```