resource "azuread_application" "application" {
  name = "Terraform"
}

resource "random_string" "string" {
  length = 32
  special = true
}

resource "azuread_application_password" "password" {
  application_object_id = azuread_application.application.object_id
  value = random_string.string.result
  description = "Terraform CI"
  end_date              = "9999-01-01T01:02:03Z"
  depends_on = [azuread_application.application]
}