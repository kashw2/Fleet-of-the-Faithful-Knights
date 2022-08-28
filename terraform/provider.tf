/*
When creating this infrastructure for the first time you will have to remove the azurerm backend block
*/

terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.20.0"
    }
    azuread = {
      source  = "hashicorp/azuread"
      version = "~> 2.28.0"
    }
  }
  backend "azurerm" {
    storage_account_name = "ffktfstorageaccount"
    resource_group_name  = "terraform-resource-group"
    container_name       = "terraform-state-container"
    key                  = "terraform.tfstate"
  }
}

provider "azurerm" {
  features {
    resource_group {
      prevent_deletion_if_contains_resources = false
    }

    log_analytics_workspace {
      permanently_delete_on_destroy = true
    }
  }
  subscription_id = "e608fd59-f3db-4b75-9dfb-ba60889b45f3"
}