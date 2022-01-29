resource "azurerm_role_assignment" "bship" {
  principal_id         = var.bship_id
  scope                = data.azurerm_subscription.subscription.id
  role_definition_name = "Reader"
}

resource "azurerm_role_assignment" "spindizzy" {
  principal_id         = var.spindizzy_id
  scope                = data.azurerm_subscription.subscription.id
  role_definition_name = "Reader"
}

resource "azurerm_role_assignment" "grandmaster_flash" {
  principal_id         = var.grandmaster_flash_id
  scope                = data.azurerm_subscription.subscription.id
  role_definition_name = "Reader"
}