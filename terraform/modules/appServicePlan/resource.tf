resource "azurerm_app_service_plan" "app_service_plan" {
  location            = var.resource_group_location
  name                = "ffk-basic-app-service-plan"
  resource_group_name = var.resource_group_name

  kind     = "Linux"
  reserved = true

  sku {
    size = "B1"
    tier = "Basic"
  }
}