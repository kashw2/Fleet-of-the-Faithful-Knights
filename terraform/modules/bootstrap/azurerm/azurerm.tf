resource "azurerm_resource_group" "terraform" {
  location = "East US"
  name     = "terraform-resource-group"
}

resource "azurerm_storage_account" "terraform" {
  account_replication_type = "GRS"
  account_tier             = "Standard"
  location                 = azurerm_resource_group.terraform.location
  name                     = "ffktfstorageaccount"
  resource_group_name      = azurerm_resource_group.terraform.name

  queue_properties {
    logging {
      delete  = true
      read    = true
      version = "1.0"
      write   = true
    }
  }
}

resource "azurerm_storage_container" "terraform" {
  name                 = "terraform-state-container"
  storage_account_name = azurerm_storage_account.terraform.name
}

resource "azurerm_role_assignment" "terraform" {
  principal_id         = var.service_principal_id
  scope                = data.azurerm_subscription.subscription.id
  role_definition_name = "Contributor"
}