output "panel_name" {
  value = azurerm_app_service.panel.name
}

output "panel_username" {
  value = azurerm_app_service.panel.site_credential.0.username
}

output "panel_password" {
  value = azurerm_app_service.panel.site_credential.0.password
}

output "api_name" {
  value = azurerm_app_service.api.name
}

output "api_username" {
  value = azurerm_app_service.api.site_credential.0.username
}

output "api_password" {
  value = azurerm_app_service.api.site_credential.0.password
}

output "onboarding_name" {
  value = azurerm_app_service.onboarding.name
}

output "onboarding_username" {
  value = azurerm_app_service.onboarding.site_credential.0.username
}

output "onboarding_password" {
  value = azurerm_app_service.onboarding.site_credential.0.password
}