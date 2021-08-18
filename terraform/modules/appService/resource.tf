resource "azurerm_app_service" "panel" {
  app_service_plan_id = var.app_service_plan_id
  location = var.resource_group_location
  name = "voting-panel"
  resource_group_name = var.resource_group_name
}

resource "azurerm_app_service" "api" {
  app_service_plan_id = var.app_service_plan_id
  location = var.resource_group_location
  name = "api"
  resource_group_name = var.resource_group_name
}

resource "azurerm_app_service" "onboarding" {
  app_service_plan_id = var.app_service_plan_id
  location = var.resource_group_location
  name = "onboarding"
  resource_group_name = var.resource_group_name
}