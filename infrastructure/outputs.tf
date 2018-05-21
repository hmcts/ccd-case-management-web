output "case_management_web_deployment_endpoint" {
  value = "${module.case-management-web.gitendpoint}"
}

output "vaultUri" {
  value = "${local.vaultUri}"
}

output "vaultName" {
  value = "${local.vaultName}"
}
