resource "aws_s3_bucket" "treesLambdaCode" {
  bucket = "trees-lambda-code-${terraform.workspace}"
}
