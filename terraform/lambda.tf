
//zip up all js files for the pipeline
data "archive_file" "lambda" {
  type        = "zip"
  source_dir  = "../lambda"
  output_path = "../lambda.zip"
}


# addtree
module "addTree" {
  source           = "./modules/apicall"
  filename         = data.archive_file.lambda.output_path
  function_name    = "addtree"
  role             = aws_iam_role.treesLambdaRole.arn
  source_code_hash = data.archive_file.lambda.output_base64sha256
  table = aws_dynamodb_table.treesDb.name
}


output "addTreeFunctionUrl" {
  value = module.addTree.url
}


# getbysponsor
module "getBySponsor" {
  source           = "./modules/apicall"
  filename         = data.archive_file.lambda.output_path
  function_name    = "getbysponsor"
  role             = aws_iam_role.treesLambdaRole.arn
  source_code_hash = data.archive_file.lambda.output_base64sha256
  table = aws_dynamodb_table.treesDb.name
}


output "getBySponsorFunctionUrl" {
  value = module.getBySponsor.url
}

module "addLog" {
  source           = "./modules/apicall"
  filename         = data.archive_file.lambda.output_path
  function_name    = "addlog"
  role             = aws_iam_role.treesLambdaRole.arn
  source_code_hash = data.archive_file.lambda.output_base64sha256
  table = aws_dynamodb_table.treesDb.name
}


output "addLogFunctionUrl" {
  value = module.addLog.url
}


module "getLogsByTree" {
  source           = "./modules/apicall"
  filename         = data.archive_file.lambda.output_path
  function_name    = "getlogsbytree"
  role             = aws_iam_role.treesLambdaRole.arn
  source_code_hash = data.archive_file.lambda.output_base64sha256
  table = aws_dynamodb_table.treesDb.name
}


output "getLogsByTreeFunctionUrl" {
  value = module.getLogsByTree.url
}


module "getTree" {
  source           = "./modules/apicall"
  filename         = data.archive_file.lambda.output_path
  function_name    = "getree"
  role             = aws_iam_role.treesLambdaRole.arn
  source_code_hash = data.archive_file.lambda.output_base64sha256
  table = aws_dynamodb_table.treesDb.name
}


output "getTreeFunctionUrl" {
  value = module.getTree.url
}