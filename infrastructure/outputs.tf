output "case_management_web_deployment_endpoint" {
  value = "${module.case-management-web.gitendpoint}"
}

output "vaultUri" {
  value = "${data.azurerm_key_vault.ccd_shared_key_vault.vault_uri}"
}

output "vaultName" {
  value = "${local.vaultName}"
}
