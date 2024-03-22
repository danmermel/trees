
//zip up  js files for the pipeline
data "archive_file" "lambda" {
  type        = "zip"
  source_file =  "../lambda/${var.function_name}.js"
  output_path = "../lambda/${var.function_name}.zip"
}

resource "aws_lambda_function" "treesLambda" {
  filename         = data.archive_file.lambda.output_path
  function_name    = "${var.function_name}-${terraform.workspace}"
  role             = var.role
  handler          = "${var.function_name}.handler"
  runtime          = var.runtime
  timeout          = var.timeout
  source_code_hash = data.archive_file.lambda.output_base64sha256
  layers           = [var.layer]
  
  environment {
    variables = {
      TABLE = var.table // aws_dynamodb_table.treesDb.name
      #API_KEY = var.API_KEY
    }
  }
}

resource "aws_cloudwatch_log_group" "treesLG" {
  name              = "/aws/lambda/${var.function_name}-${terraform.workspace}"
  retention_in_days = 7
}

resource "aws_lambda_function_url" "treesFunctionUrl" {
  function_name      = aws_lambda_function.treesLambda.function_name
  authorization_type = "NONE"
  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["*"]
    max_age           = 86400
  }
}

output "url" {
  value = aws_lambda_function_url.treesFunctionUrl.function_url
}