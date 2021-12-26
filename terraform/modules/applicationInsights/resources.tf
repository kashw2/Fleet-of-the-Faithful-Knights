resource "azurerm_application_insights" "panel" {
  name                = "panel-application-insights"
  application_type    = "web"
  location            = var.resource_group_location
  resource_group_name = var.resource_group_name
}

resource "azurerm_application_insights" "api" {
  name                = "api-application-insights"
  application_type    = "Node.JS"
  location            = var.resource_group_location
  resource_group_name = var.resource_group_name
}

resource "azurerm_application_insights" "onboarding" {
  name                = "onboarding-application-insights"
  application_type    = "Node.JS"
  location            = var.resource_group_location
  resource_group_name = var.resource_group_name
}