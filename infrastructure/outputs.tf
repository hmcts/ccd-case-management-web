output "case_management_web_deployment_endpoint" {
  value = "${module.case-management-web.gitendpoint}"
}

output "vaultUri" {
  value = "${module.ccd-case-management-web-vault.key_vault_uri}"
}

output "vaultName" {
  value = "${module.ccd-case-management-web-vault.key_vault_name}"
}
