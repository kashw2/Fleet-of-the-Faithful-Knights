resource "azurerm_app_service" "panel" {
  app_service_plan_id = var.app_service_plan_id
  location            = var.resource_group_location
  name                = "ffk-panel"
  resource_group_name = var.resource_group_name

  site_config {
    linux_fx_version = "DOCKER|${var.container_registry_login_server}/panel.faithfulknights.com:latest"
  }

}

resource "azurerm_app_service" "api" {
  app_service_plan_id = var.app_service_plan_id
  location            = var.resource_group_location
  name                = "ffk-api"
  resource_group_name = var.resource_group_name

  site_config {
    linux_fx_version = "DOCKER|${var.container_registry_login_server}/api.faithfulknights.com:latest"
  }

}

resource "azurerm_app_service" "onboarding" {
  app_service_plan_id = var.app_service_plan_id
  location            = var.resource_group_location
  name                = "ffk-onboarding"
  resource_group_name = var.resource_group_name

  site_config {
    linux_fx_version = "DOCKER|${var.container_registry_login_server}/onboarding.faithfulknights.com:latest"
  }

}