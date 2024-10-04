
# addtree
module "addTree" {
  source        = "./modules/apicall"
  function_name = "addtree"
  role          = aws_iam_role.treesLambdaRole.arn
  table         = aws_dynamodb_table.treesDb.name
  layer         = aws_lambda_layer_version.treesLambdaLayer.arn
  api_key       = random_string.apiKey.result

}


output "addTreeFunctionUrl" {
  value = module.addTree.url
}


# getbysponsor
module "getBySponsor" {
  source        = "./modules/apicall"
  function_name = "getbysponsor"
  role          = aws_iam_role.treesLambdaRole.arn
  table         = aws_dynamodb_table.treesDb.name
  layer         = aws_lambda_layer_version.treesLambdaLayer.arn
  api_key       = random_string.apiKey.result

}


output "getBySponsorFunctionUrl" {
  value = module.getBySponsor.url
}

module "addLog" {
  source        = "./modules/apicall"
  function_name = "addlog"
  role          = aws_iam_role.treesLambdaRole.arn
  table         = aws_dynamodb_table.treesDb.name
  layer         = aws_lambda_layer_version.treesLambdaLayer.arn
  api_key       = random_string.apiKey.result

}


output "addLogFunctionUrl" {
  value = module.addLog.url
}


module "getLogsByTree" {
  source        = "./modules/apicall"
  function_name = "getlogsbytree"
  role          = aws_iam_role.treesLambdaRole.arn
  table         = aws_dynamodb_table.treesDb.name
  layer         = aws_lambda_layer_version.treesLambdaLayer.arn
  api_key       = random_string.apiKey.result

}


output "getLogsByTreeFunctionUrl" {
  value = module.getLogsByTree.url
}


module "getTree" {
  source        = "./modules/apicall"
  function_name = "gettree"
  role          = aws_iam_role.treesLambdaRole.arn
  table         = aws_dynamodb_table.treesDb.name
  layer         = aws_lambda_layer_version.treesLambdaLayer.arn
  api_key       = random_string.apiKey.result
}


output "getTreeFunctionUrl" {
  value = module.getTree.url
}



module "getBySpecies" {
  source        = "./modules/apicall"
  function_name = "getbyspecies"
  role          = aws_iam_role.treesLambdaRole.arn
  table         = aws_dynamodb_table.treesDb.name
  layer         = aws_lambda_layer_version.treesLambdaLayer.arn
  api_key       = random_string.apiKey.result
}


output "getBySpeciesFunctionUrl" {
  value = module.getBySpecies.url
}

module "getByGeo" {
  source        = "./modules/apicall"
  function_name = "getbygeo"
  role          = aws_iam_role.treesLambdaRole.arn
  table         = aws_dynamodb_table.treesDb.name
  layer         = aws_lambda_layer_version.treesLambdaLayer.arn
  api_key       = random_string.apiKey.result
}


output "getByGeoFunctionUrl" {
  value = module.getByGeo.url
}

module "addSpecies" {
  source        = "./modules/apicall"
  function_name = "addspecies"
  role          = aws_iam_role.treesLambdaRole.arn
  table         = aws_dynamodb_table.treesDb.name
  layer         = aws_lambda_layer_version.treesLambdaLayer.arn
  api_key       = random_string.apiKey.result
}


output "addSpeciesFunctionUrl" {
  value = module.addSpecies.url
}

module "getSingleSpecies" {
  source        = "./modules/apicall"
  function_name = "getsinglespecies"
  role          = aws_iam_role.treesLambdaRole.arn
  table         = aws_dynamodb_table.treesDb.name
  layer         = aws_lambda_layer_version.treesLambdaLayer.arn
  api_key       = random_string.apiKey.result
}


output "getSingleSpeciesFunctionUrl" {
  value = module.getSingleSpecies.url
}

module "getSpeciesList" {
  source        = "./modules/apicall"
  function_name = "getspecieslist"
  role          = aws_iam_role.treesLambdaRole.arn
  table         = aws_dynamodb_table.treesDb.name
  layer         = aws_lambda_layer_version.treesLambdaLayer.arn
  api_key       = random_string.apiKey.result
}


output "getSpeciesListFunctionUrl" {
  value = module.getSpeciesList.url
}