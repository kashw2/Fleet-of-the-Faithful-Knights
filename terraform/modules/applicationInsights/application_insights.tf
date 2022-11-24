resource "azurerm_application_insights" "panel" {
  application_type    = "web"
  location            = var.location
  name                = "appi-panel"
  resource_group_name = var.resource_group_name
}

resource "azurerm_application_insights" "onboarding" {
  application_type    = "web"
  location            = var.location
  name                = "appi-onboarding"
  resource_group_name = var.resource_group_name
}

resource "azurerm_application_insights" "api" {
  application_type    = "web"
  location            = var.location
  name                = "appi-api"
  resource_group_name = var.resource_group_name
}