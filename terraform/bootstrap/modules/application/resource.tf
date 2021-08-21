resource "azuread_application" "application" {
  name = "Terraform - ${random_string.string.result}"
  lifecycle {
    prevent_destroy = true
  }
}

resource "azuread_service_principal" "principal" {
  application_id = azuread_application.application.application_id
}

resource "random_string" "string" {
  length  = 32
  special = false
}

resource "azuread_service_principal_password" "password" {
  service_principal_id = azuread_service_principal.principal.id
  value                = random_string.string.result
  end_date             = "9999-01-01T00:00:00Z"
}

resource "azurerm_role_assignment" "principal_role" {
  scope                = data.azurerm_subscription.subscription.id
  role_definition_name = "Contributor"
  principal_id         = azuread_service_principal.principal.id
}

resource "azuread_application_app_role" "application_role" {
  application_object_id = azuread_application.application.id
  allowed_member_types  = ["User", "Application"]
  description           = "Admins can manage roles and perform all task actions"
  display_name          = "Admin"
  is_enabled            = true
  value                 = "administer"
}
