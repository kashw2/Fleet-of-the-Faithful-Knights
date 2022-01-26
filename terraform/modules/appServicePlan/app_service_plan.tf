resource "azurerm_app_service_plan" "plan" {
  location            = var.location
  name                = "ffk-app-service-plan"
  resource_group_name = var.resource_group_name

  reserved = true
  kind     = "Linux"

  sku {
    size = "B1"
    tier = "Basic"
  }
}