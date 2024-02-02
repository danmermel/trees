data "aws_region" "current" {}
data "aws_caller_identity" "current" {}

data "aws_iam_policy" "AmazonDynamoDBFullAccess" {
  arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
}

data "aws_iam_policy" "AmazonDynamoDBReadOnlyAccess" {
  arn = "arn:aws:iam::aws:policy/AmazonDynamoDBReadOnlyAccess"
}


provider "aws" {
  region = "eu-west-1"
}

terraform {
  backend "s3" {
    bucket = "trees-terraform"
    key = "state"
    region = "eu-west-1"
  }
}

output "awsRegion"  {
  value = data.aws_region.current.name
}
