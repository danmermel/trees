
//zip up all js files for the pipeline
data "archive_file" "lambda" {
  type        = "zip"
  source_dir  = "../lambda"
  output_path = "../lambda.zip"
}


resource "aws_lambda_function" "addTree" {
  filename         = "../lambda.zip"
  function_name    = "addtree-${terraform.workspace}"
  role             = aws_iam_role.treesLambdaRole.arn
  handler          = "addtree.handler"
  runtime          = "nodejs20.x"
  timeout          = 60
  source_code_hash = data.archive_file.lambda.output_base64sha256
  
  environment {
    variables = {
      TABLE = aws_dynamodb_table.treesDb.name
      #API_KEY = var.API_KEY
    }
  }
}

resource "aws_cloudwatch_log_group" "lambdaLGaddTree" {
  name              = "/aws/lambda/${aws_lambda_function.addTree.function_name}"
  retention_in_days = 7
}

resource "aws_lambda_function_url" "addTreeFunctionUrl" {
  function_name      = aws_lambda_function.addTree.function_name
  authorization_type = "NONE"
  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["*"]
    max_age           = 86400
  }
}

output "addTreeFunctionUrl" {
  value = aws_lambda_function_url.addTreeFunctionUrl.function_url
}


resource "aws_lambda_function" "getBySponsor" {
  filename         = "../lambda.zip"
  function_name    = "getbysponsor-${terraform.workspace}"
  role             = aws_iam_role.treesLambdaRole.arn
  handler          = "getbysponsor.handler"
  runtime          = "nodejs20.x"
  timeout          = 60
  source_code_hash = data.archive_file.lambda.output_base64sha256
  
  environment {
    variables = {
      TABLE = aws_dynamodb_table.treesDb.name
      #API_KEY = var.API_KEY
    }
  }
}

resource "aws_cloudwatch_log_group" "lambdaLGgetBySponsor" {
  name              = "/aws/lambda/${aws_lambda_function.getBySponsor.function_name}"
  retention_in_days = 7
}

resource "aws_lambda_function_url" "getBySponsorFunctionUrl" {
  function_name      = aws_lambda_function.getBySponsor.function_name
  authorization_type = "NONE"
  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["*"]
    max_age           = 86400
  }
}

output "getBySponsorFunctionUrl" {
  value = aws_lambda_function_url.getBySponsorFunctionUrl.function_url
}

resource "aws_lambda_function" "addLog" {
  filename         = "../lambda.zip"
  function_name    = "addlog-${terraform.workspace}"
  role             = aws_iam_role.treesLambdaRole.arn
  handler          = "addlog.handler"
  runtime          = "nodejs20.x"
  timeout          = 60
  source_code_hash = data.archive_file.lambda.output_base64sha256
  
  environment {
    variables = {
      TABLE = aws_dynamodb_table.treesDb.name
      #API_KEY = var.API_KEY
    }
  }
}

resource "aws_cloudwatch_log_group" "lambdaLGaddLog" {
  name              = "/aws/lambda/${aws_lambda_function.addLog.function_name}"
  retention_in_days = 7
}

resource "aws_lambda_function_url" "addLogFunctionUrl" {
  function_name      = aws_lambda_function.addLog.function_name
  authorization_type = "NONE"
  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["*"]
    max_age           = 86400
  }
}

output "addLogFunctionUrl" {
  value = aws_lambda_function_url.addLogFunctionUrl.function_url
}

resource "aws_lambda_function" "getLogsByTree" {
  filename         = "../lambda.zip"
  function_name    = "getlogsbytree-${terraform.workspace}"
  role             = aws_iam_role.treesLambdaRole.arn
  handler          = "getlogsbytree.handler"
  runtime          = "nodejs20.x"
  timeout          = 60
  source_code_hash = data.archive_file.lambda.output_base64sha256
  
  environment {
    variables = {
      TABLE = aws_dynamodb_table.treesDb.name
      #API_KEY = var.API_KEY
    }
  }
}

resource "aws_cloudwatch_log_group" "lambdaLGgetLogsByTree" {
  name              = "/aws/lambda/${aws_lambda_function.getLogsByTree.function_name}"
  retention_in_days = 7
}

resource "aws_lambda_function_url" "getLogsByTreeFunctionUrl" {
  function_name      = aws_lambda_function.getLogsByTree.function_name
  authorization_type = "NONE"
  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["*"]
    max_age           = 86400
  }
}

output "getLogsByTreeFunctionUrl" {
  value = aws_lambda_function_url.getLogsByTreeFunctionUrl.function_url
}
