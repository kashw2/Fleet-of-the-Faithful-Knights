resource "azurerm_app_service_plan" "basic" {
  location            = var.location
  name                = "ffk-basic-app-service-plan"
  resource_group_name = var.resource_group_name

  reserved = true
  kind     = "Linux"

  sku {
    size     = "B1"
    tier     = "Basic"
    capacity = 1
  }
}

resource "azurerm_app_service_plan" "free" {
  location            = var.location
  name                = "ffk-free-app-service-plan"
  resource_group_name = var.resource_group_name

  reserved = true
  kind     = "Linux"

  sku {
    size     = "F1"
    tier     = "Free"
    capacity = 1
  }
}