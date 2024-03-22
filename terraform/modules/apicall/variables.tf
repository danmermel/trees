variable "filename" {}
variable "function_name" {}
variable "role" {}
variable "runtime" {
  default = "nodejs20.x"
}
variable "timeout" {
  default = 60
}
variable "source_code_hash" {}
variable "table" {}