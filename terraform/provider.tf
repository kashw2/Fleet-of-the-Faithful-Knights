/*
When creating this infrastructure for the first time you will have to remove the azurerm backend block
*/

terraform {
  required_version = ">= 1.0.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.22.0"
    }
    azuread = {
      source  = "hashicorp/azuread"
      version = "~> 2.28.0"
    }
  }
#  backend "azurerm" {
#    storage_account_name = "stffktf"
#    resource_group_name  = "rg-terraform"
#    container_name       = "terraform"
#    key                  = "terraform.tfstate"
#  }
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
}