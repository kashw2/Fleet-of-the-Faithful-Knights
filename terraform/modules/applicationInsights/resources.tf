resource "azurerm_application_insights" "panel" {
  application_type    = "web"
  location            = var.resource_group_location
  name                = "panel-application-insights"
  resource_group_name = var.resource_group_name
}

resource "azurerm_application_insights" "api" {
  application_type    = "Node.JS"
  location            = var.resource_group_location
  name                = "api-application-insights"
  resource_group_name = var.resource_group_name
}

resource "azurerm_application_insights" "onboarding" {
  application_type    = "Node.JS"
  location            = var.resource_group_location
  name                = "onboarding-application-insights"
  resource_group_name = var.resource_group_name
}