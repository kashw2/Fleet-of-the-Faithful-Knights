resource "azurerm_application_insights" "panel" {
  application_type    = "web"
  location            = var.location
  name                = "ffk-panel-application-insights"
  resource_group_name = var.resource_group_name
}

resource "azurerm_application_insights" "onboarding" {
  application_type    = "web"
  location            = var.location
  name                = "ffk-onboarding-application-insights"
  resource_group_name = var.resource_group_name
}

resource "azurerm_application_insights" "api" {
  application_type    = "web"
  location            = var.location
  name                = "ffk-api-application-insights"
  resource_group_name = var.resource_group_name
}