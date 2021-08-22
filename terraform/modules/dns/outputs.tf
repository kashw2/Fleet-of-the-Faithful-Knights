output "panel_id" {
  value = azurerm_app_service_custom_hostname_binding.panel.id
}

output "api_id" {
  value = azurerm_app_service_custom_hostname_binding.api.id
}

output "onboarding_id" {
  value = azurerm_app_service_custom_hostname_binding.onboarding.id
}