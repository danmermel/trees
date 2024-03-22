//zip up the directory that has all the node modules
data "archive_file" "apiLayerZip" {
  type        = "zip"
  source_dir  = "../lambda/nodejs"
  output_path = "../lambda/nodejs-${terraform.workspace}.zip"
}

//upload the zips to s3
resource "aws_s3_object" "apiLayerZipObject" {
  bucket = aws_s3_bucket.treesLambdaCode.id
  key    = "nodejs-${terraform.workspace}.zip"
  source = data.archive_file.apiLayerZip.output_path
  etag   = filemd5(data.archive_file.apiLayerZip.output_path)
}

# create the nodejs layer for the API
resource "aws_lambda_layer_version" "treesLambdaLayer" {
  layer_name          = "treesLambdaLayer-${terraform.workspace}"
  s3_bucket           = aws_s3_bucket.treesLambdaCode.id
  s3_key              = aws_s3_object.apiLayerZipObject.id
  source_code_hash    = data.archive_file.apiLayerZip.output_base64sha256
  compatible_runtimes = ["nodejs20.x"]
}
