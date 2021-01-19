provider "azurerm" {
  features {}
}

data "azurerm_key_vault" "ccd_shared_key_vault" {
  name                = "${var.raw_product}-${var.env}"
  resource_group_name = "${var.raw_product}-shared-${var.env}"
}

data "azurerm_key_vault_secret" "appinsights_instrumentationkey" {
  name         = "AppInsightsInstrumentationKey"
  key_vault_id = "${data.azurerm_key_vault.ccd_shared_key_vault.id}"
}

resource azurerm_key_vault_secret "appinsights_instrumentationkey_secret" {
  name         = "AppInsightsInstrumentationKey"
  value        = data.azurerm_key_vault_secret.appinsights_instrumentationkey.value
  key_vault_id = data.azurerm_key_vault.ccd_shared_key_vault.id
}
