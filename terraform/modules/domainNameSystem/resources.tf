resource "azurerm_app_service_custom_hostname_binding" "panel" {
  hostname            = "panel.faithfulknights.com"
  app_service_name    = var.panel_name
  resource_group_name = var.resource_group_name
}

resource "azurerm_app_service_custom_hostname_binding" "api" {
  hostname            = "api.faithfulknights.com"
  app_service_name    = var.api_name
  resource_group_name = var.resource_group_name
}

resource "azurerm_app_service_custom_hostname_binding" "onboarding" {
  hostname            = "onboarding.faithfulknights.com"
  app_service_name    = var.onboarding_name
  resource_group_name = var.resource_group_name
}