resource "azurerm_container_registry_webhook" "panel" {
  actions             = ["push"]
  location            = var.location
  name                = "panelwebhook"
  registry_name       = var.registry_name
  resource_group_name = var.resource_group_name
  status              = "enabled"
  service_uri         = "https://${var.panel_username}:${var.panel_password}@${var.panel_name}.scm.azurewebsites.net/docker/hook"
  scope               = "panel.faithfulknights.com:latest"
}

resource "azurerm_container_registry_webhook" "api" {
  actions             = ["push"]
  location            = var.location
  name                = "apiwebhook"
  registry_name       = var.registry_name
  resource_group_name = var.resource_group_name
  status              = "enabled"
  service_uri         = "https://${var.api_username}:${var.api_password}@${var.api_name}.scm.azurewebsites.net/docker/hook"
  scope               = "api.faithfulknights.com:latest"
}

#resource "azurerm_container_registry_webhook" "onboarding" {
#  actions             = ["push"]
#  location            = var.location
#  name                = "onboardingwebhook"
#  registry_name       = var.registry_name
#  resource_group_name = var.resource_group_name
#  status              = "enabled"
#  service_uri         = "https://${var.onboarding_username}:${var.onboarding_password}@${var.onboarding_name}.scm.azurewebsites.net/docker/hook"
#  scope               = "onboarding.faithfulknights.com:latest"
#}