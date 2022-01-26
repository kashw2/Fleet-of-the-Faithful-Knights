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
}

resource "azurerm_storage_container" "terraform" {
  name                 = "terraform-state-container"
  storage_account_name = azurerm_storage_account.terraform.name
}