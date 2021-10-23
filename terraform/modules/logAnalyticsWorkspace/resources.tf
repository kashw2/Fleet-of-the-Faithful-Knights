resource "azurerm_log_analytics_workspace" "panel" {
  name                = "panel-workspace"
  location            = var.resource_group_location
  resource_group_name = var.resource_group_name
}

resource "azurerm_log_analytics_workspace" "api" {
  name                = "api-workspace"
  location            = var.resource_group_location
  resource_group_name = var.resource_group_name
}

resource "azurerm_log_analytics_workspace" "onboarding" {
  name                = "onboarding-workspace"
  location            = var.resource_group_location
  resource_group_name = var.resource_group_name
}