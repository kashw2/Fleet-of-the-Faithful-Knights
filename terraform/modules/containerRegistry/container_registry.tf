resource "azurerm_container_registry" "registry" {
  name                = "ffkcontainerregistry"
  resource_group_name = var.resource_group_name
  location            = var.location
  sku                 = "Basic"
  admin_enabled       = true

  network_rule_set = []
}